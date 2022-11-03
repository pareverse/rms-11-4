import { useState } from 'react'
import NextHead from 'next/head'
import NextLink from 'next/link'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import api from 'instance'
import { Avatar, AvatarGroup, Badge, Button, Container, Flex, FormControl, FormErrorMessage, FormLabel, IconButton, Input, Select, Td, Text, Tr, useDisclosure, useToast } from '@chakra-ui/react'
import { FiMoreHorizontal } from 'react-icons/fi'
import Card from 'components/_card'
import Table from 'components/_table'
import Modal from 'components/_modal'
import { useForm } from 'react-hook-form'
import Toast from 'components/_toast'

const Companies = () => {
	const queryClient = useQueryClient()
	const { data: companies, isFetched: isCompaniesFetched } = useQuery(['companies'], () => api.all('/companies'))

	const { isOpen: isAddOpen, onOpen: onAddOpen, onClose: onAddClose } = useDisclosure()
	const [isLoading, setIsLoading] = useState(false)

	const toast = useToast()

	const {
		register,
		formState: { errors },
		setError,
		reset,
		clearErrors,
		handleSubmit
	} = useForm()

	const addMutation = useMutation((data) => api.create('/companies', data), {
		onSuccess: () => {
			queryClient.invalidateQueries('companies')
			setIsLoading(false)
			reset()
			onAddClose()

			toast({
				position: 'bottom-left',
				render: () => <Toast title="Company Added." message="Company successfully added." status={true} />
			})
		}
	})

	const onSubmit = (data) => {
		setIsLoading(true)

		if (!data.email.includes('@gmail.com')) {
			setError('email', { type: 'custom', message: 'Invalid email address.' })
			return
		}

		addMutation.mutate({
			data: {
				...data
			}
		})
	}

	return (
		<>
			<NextHead>
				<title>Companies</title>
			</NextHead>

			<Container>
				<Flex justify="space-between" align="center" gap={6} mb={6}>
					<Text fontSize="xl" fontWeight="semibold" color="accent-1">
						Companies
					</Text>

					<Button colorScheme="brand" onClick={() => reset() || clearErrors() || onAddOpen()}>
						Add New
					</Button>
				</Flex>

				<Card>
					<Table
						data={isCompaniesFetched && companies}
						th={['Company', 'Tenants', 'Unit', 'Pending SOA', 'Created', '']}
						td={(company) => (
							<Tr key={company._id}>
								<Td maxW={200}>
									<Flex align="center" gap={3}>
										<Avatar name={company.name} src="" />

										<Text overflow="hidden" textTransform="capitalize" textOverflow="ellipsis" color="accent-1">
											{company.name}
										</Text>
									</Flex>
								</Td>

								<Td>
									<AvatarGroup>
										<Avatar />
										<Avatar />
										<Avatar />
									</AvatarGroup>
								</Td>

								<Td>{company.unit.id ? <Badge>000</Badge> : '-'}</Td>

								<Td>
									<Text>0</Text>
								</Td>

								<Td>
									<Text>{company.created.split(',')[0]}</Text>
								</Td>

								<Td textAlign="right">
									<NextLink href={`/companies/${company._id}`} passHref>
										<IconButton size="xs" icon={<FiMoreHorizontal size={12} />} />
									</NextLink>
								</Td>
							</Tr>
						)}
						select={(register, state, dispatch) => (
							<Flex flex={1} justify="end" align="center">
								<Select size="lg" w="auto">
									<option></option>
								</Select>
							</Flex>
						)}
						filters={(data, watch) => {
							return data.filter((data) =>
								['name'].some((key) =>
									data[key]
										.toString()
										.toLowerCase()
										.includes(watch('search') && watch('search').toLowerCase())
								)
							)
						}}
					/>
				</Card>
			</Container>

			<Modal title="Add Company" isOpen={isAddOpen} onOpen={onAddOpen} onClose={onAddClose}>
				<form onSubmit={handleSubmit(onSubmit)}>
					<Flex direction="column" gap={6}>
						<FormControl isInvalid={errors.name}>
							<FormLabel>Company Name</FormLabel>
							<Input size="lg" {...register('name', { required: true })} />
							<FormErrorMessage>This field is required.</FormErrorMessage>
						</FormControl>

						<FormControl isInvalid={errors.email}>
							<FormLabel>Company Email</FormLabel>
							<Input size="lg" {...register('email', { required: 'This field is required.' })} />
							<FormErrorMessage>{errors.email?.message}</FormErrorMessage>
						</FormControl>

						<Flex justify="end" align="center" gap={3}>
							<Button size="lg" onClick={onAddClose}>
								Close
							</Button>

							<Button type="submit" size="lg" colorScheme="brand" isLoading={isLoading}>
								Submit
							</Button>
						</Flex>
					</Flex>
				</form>
			</Modal>
		</>
	)
}

Companies.authentication = {
	authorized: 'Admin'
}

export default Companies
