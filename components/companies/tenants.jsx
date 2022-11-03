import { useState } from 'react'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import api from 'instance'
import { Avatar, Button, Flex, IconButton, Td, Text, Tr, useDisclosure, useToast } from '@chakra-ui/react'
import { FiEdit2, FiMoreHorizontal, FiPlus } from 'react-icons/fi'
import Card from 'components/_card'
import Table from 'components/_table'
import Modal from 'components/_modal'
import Toast from 'components/_toast'

const Tenants = ({ id, company }) => {
	const queryClient = useQueryClient()
	const { data: tenants, isFetched: isTenantsFetched } = useQuery(['tenants'], () => api.all('/users'))
	const { isOpen: isAddOpen, onOpen: onAddOpen, onClose: onAddClose } = useDisclosure()
	const { isOpen: isAddMessageOpen, onOpen: onAddMessageOpen, onClose: onAddMessageClose } = useDisclosure()
	const [tenantSelected, setTenantSelected] = useState(null)
	const [isLoading, setIsLoading] = useState(false)
	const toast = useToast()

	const editMutation = useMutation((data) => api.update('/companies', id, data), {
		onSuccess: () => {
			queryClient.invalidateQueries('company_tenants')
			setIsLoading(false)
			onAddMessageClose()

			toast({
				position: 'bottom-left',
				render: () => <Toast title="Tenant Added." message="Tenant successfully added." status={true} />
			})
		}
	})

	const onSubmit = (id) => {
		editMutation.mutate({
			data: {
				tenants: {
					id: id
				}
			}
		})
	}

	return (
		<>
			<Card>
				<Flex direction="column" gap={6}>
					<Flex justify="space-between" align="center" gap={6}>
						<Text fontSize="lg" fontWeight="semibold" color="accent-1">
							Tenants
						</Text>

						<IconButton variant="tinted" size="xs" colorScheme="brand" icon={<FiEdit2 size={12} />} onClick={onAddOpen} />
					</Flex>

					{company.tenants.map((tenant) =>
						tenants
							.filter((data) => data._id === tenant.id)
							.map((tenant) => (
								<Flex justify="space-between" align="center" gap={6} key={tenant._id}>
									<Flex align="center" gap={3}>
										<Avatar name={tenant.name} src={tenant.image} />

										<Text fontSize="sm" fontWeight="medium" color="accent-1" noOfLines={1}>
											{tenant.name}
										</Text>
									</Flex>

									<IconButton size="xs" icon={<FiMoreHorizontal size={12} />} />
								</Flex>
							))
					)}
				</Flex>
			</Card>

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
								<IconButton variant="tinted" colorScheme="brand" icon={<FiPlus size={16} />} onClick={() => setTenantSelected({ id: tenant._id, email: tenant.email, name: tenant.name, image: tenant.image }) || onAddMessageOpen() || onAddClose()} />
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
							.filter((data) => !data.company.id && data.role === 'Tenant')
					}}
					settings={{
						placeholder: 'Search Tenant',
						searchFull: true,
						show: [5]
					}}
				/>
			</Modal>

			<Modal header="off" isOpen={isAddMessageOpen} onClose={onAddMessageClose}>
				<Flex align="center" direction="column" gap={6} p={6}>
					<Avatar size="xl" name={tenantSelected?.name} src={tenantSelected?.image} />

					<Flex align="center" direction="column" textAlign="center">
						<Text fontWeight="semibold" color="accent-1" noOfLines={1}>
							{tenantSelected?.name}
						</Text>

						<Text fontSize="sm" noOfLines={1}>
							{tenantSelected?.email}
						</Text>
					</Flex>

					<Text>Are you sure you want to add this Tenant?</Text>

					<Flex align="center" gap={3}>
						<Button size="lg" colorScheme="brand" isLoading={isLoading} onClick={() => onSubmit(tenantSelected?.id)}>
							Yes, sure
						</Button>

						<Button size="lg" onClick={() => onAddMessageClose() || onAddOpen()}>
							No, cancel
						</Button>
					</Flex>
				</Flex>
			</Modal>
		</>
	)
}

export default Tenants
