import { useState } from 'react'
import NextHead from 'next/head'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import api from 'instance'
import { Avatar, Button, chakra, Container, Flex, Icon, IconButton, Select, Skeleton, SkeletonCircle, Td, Text, Tr, useDisclosure, useToast } from '@chakra-ui/react'
import { FiAlertTriangle, FiPlus, FiTrash } from 'react-icons/fi'
import Card from 'components/_card'
import Table from 'components/_table'
import Modal from 'components/_modal'
import Toast from 'components/_toast'

const Tenants = () => {
	const queryClient = useQueryClient()
	const { data: tenants, isFetched: isTenantsFetched } = useQuery(['tenants'], () => api.all('/users'))

	const { isOpen: isAddOpen, onOpen: onAddOpen, onClose: onAddClose } = useDisclosure()
	const { isOpen: isAddMessageOpen, onOpen: onAddMessageOpen, onClose: onAddMessageClose } = useDisclosure()
	const { isOpen: isDeleteMessageOpen, onOpen: onDeleteMessageOpen, onClose: onDeleteMessageClose } = useDisclosure()
	const [userSelected, setUserSelected] = useState(null)
	const [isLoading, setIsLoading] = useState(false)

	const toast = useToast()

	const updateMutation = useMutation((data) => api.create('/users', data), {
		onSuccess: () => {
			queryClient.invalidateQueries('tenants')
			setIsLoading(false)
			onAddMessageClose()

			toast({
				position: 'bottom-left',
				render: () => <Toast title="Tenant Added." message="Tenant successfully added." status={true} />
			})
		}
	})

	const deleteMutation = useMutation((data) => api.create('/users', data), {
		onSuccess: () => {
			queryClient.invalidateQueries('tenants')
			setIsLoading(false)
			onDeleteMessageClose()

			toast({
				position: 'bottom-left',
				render: () => <Toast title="Tenant Removed." message="Tenant successfully remove." status={true} />
			})
		}
	})

	const onUpdate = (id) => {
		setIsLoading(true)

		updateMutation.mutate({
			id: id,
			data: {
				role: 'Tenant'
			}
		})
	}

	const onDelete = (id) => {
		setIsLoading(true)

		deleteMutation.mutate({
			id: id,
			data: {
				role: 'User'
			}
		})
	}

	return (
		<>
			<NextHead>
				<title>Tenants</title>
			</NextHead>

			<Container>
				<Flex justify="space-between" align="center" gap={6} mb={6}>
					<Text fontSize="xl" fontWeight="semibold" color="accent-1">
						Tenants
					</Text>

					<Button colorScheme="brand" onClick={onAddOpen}>
						Add New
					</Button>
				</Flex>

				<Card>
					<Table
						data={isTenantsFetched && tenants}
						th={['Full Name', 'Email', 'Company', 'Joined', '']}
						td={(tenant) => (
							<Tr key={tenant._id}>
								<Td maxW={200}>
									<Flex align="center" gap={3}>
										<Avatar name={tenant.name} src={tenant.image} />

										<Text overflow="hidden" textOverflow="ellipsis" color="accent-1">
											{tenant.name}
										</Text>
									</Flex>
								</Td>

								<Td>
									<Text>{tenant.email}</Text>
								</Td>

								<Td maxW={200}>
									{tenant.company.id ? (
										<Flex align="center" gap={3}>
											<Avatar name="" src="" />

											<Text overflow="hidden" textOverflow="ellipsis" color="accent-1">
												Company Name
											</Text>
										</Flex>
									) : (
										<Flex align="center" gap={3}>
											<SkeletonCircle size={8} />
											<Skeleton h={2} w={148} />
										</Flex>
									)}
								</Td>

								<Td>
									<Text>{tenant.created.split(',')[0]}</Text>
								</Td>

								<Td textAlign="right">
									<IconButton variant="tinted" size="xs" colorScheme="red" icon={<FiTrash size={12} />} onClick={() => setUserSelected({ id: tenant._id, email: tenant.email, name: tenant.name, image: tenant.image }) || onDeleteMessageOpen()} />
								</Td>
							</Tr>
						)}
						select={(register) => (
							<Flex flex={1} justify="end" align="center">
								<Select size="lg" w="auto">
									<option></option>
								</Select>
							</Flex>
						)}
						filters={(data) => {
							return data.filter((data) => data.role === 'Tenant')
						}}
					/>
				</Card>
			</Container>

			<Modal title="Add Tenant" isOpen={isAddOpen} onClose={onAddClose}>
				<Table
					data={isTenantsFetched && tenants}
					th={[]}
					td={(tenant) => (
						<Tr key={tenant._id}>
							<Td maxW={256}>
								<Flex align="center" gap={3}>
									<Avatar name={tenant.name} src={tenant.image} />

									<Text overflow="hidden" textOverflow="ellipsis" color="accent-1">
										{tenant.name}
									</Text>
								</Flex>
							</Td>

							<Td textAlign="right">
								<IconButton variant="tinted" colorScheme="brand" icon={<FiPlus size={16} />} onClick={() => setUserSelected({ id: tenant._id, email: tenant.email, name: tenant.name, image: tenant.image }) || onAddMessageOpen() || onAddClose()} />
							</Td>
						</Tr>
					)}
					filters={(data, watch) => {
						return data
							.filter((data) =>
								['name'].some((key) =>
									data[key]
										.toString()
										.toLowerCase()
										.includes(watch('search') && watch('search').toLowerCase())
								)
							)
							.filter((data) => data.role === 'User')
					}}
					settings={{
						placeholder: 'Search User',
						searchFull: true,
						show: [5]
					}}
				/>
			</Modal>

			<Modal header="off" isOpen={isAddMessageOpen} onClose={onAddMessageClose}>
				<Flex align="center" direction="column" gap={6} p={6}>
					<Avatar size="xl" name={userSelected?.name} src={userSelected?.image} />

					<Flex align="center" direction="column" textAlign="center">
						<Text fontWeight="semibold" color="accent-1" noOfLines={1}>
							{userSelected?.name}
						</Text>

						<Text fontSize="sm" noOfLines={1}>
							{userSelected?.email}
						</Text>
					</Flex>

					<Text>Are you sure you want to add this User?</Text>

					<Flex align="center" gap={3}>
						<Button size="lg" colorScheme="brand" isLoading={isLoading} onClick={() => onUpdate(userSelected?.id)}>
							Yes, sure
						</Button>

						<Button size="lg" onClick={() => onAddMessageClose() || onAddOpen()}>
							No, cancel
						</Button>
					</Flex>
				</Flex>
			</Modal>

			<Modal header="off" isOpen={isDeleteMessageOpen} onClose={onDeleteMessageClose}>
				<Flex align="center" direction="column" gap={6} p={6}>
					<Flex bg="red.alpha" justify="center" align="center" borderRadius="full" h={24} w={24}>
						<Icon as={FiAlertTriangle} boxSize={8} color="red.default" />
					</Flex>

					<Flex align="center" direction="column" gap={3} textAlign="center">
						<Text fontSize="xl" fontWeight="semibold" color="red.default">
							Remove this tenant?
						</Text>

						<Text fontSize="sm">
							Are you sure you want to remove{' '}
							<chakra.span fontWeight="medium" color="accent-1">
								{userSelected?.name}?
							</chakra.span>
							You can restore it back anytime to make changes.
						</Text>
					</Flex>

					<Flex align="center" gap={3}>
						<Button size="lg" colorScheme="red" isLoading={isLoading} onClick={() => onDelete(userSelected?.id)}>
							Yes, sure
						</Button>

						<Button size="lg" onClick={() => onDeleteMessageClose()}>
							No, cancel
						</Button>
					</Flex>
				</Flex>
			</Modal>
		</>
	)
}

Tenants.authentication = {
	authorized: 'Admin'
}

export default Tenants
