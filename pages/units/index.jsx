import { useState } from 'react'
import NextHead from 'next/head'
import NextLink from 'next/link'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import api from 'instance'
import { Avatar, Badge, Button, Container, Flex, FormControl, FormErrorMessage, FormLabel, IconButton, Input, InputGroup, InputLeftElement, Select, Skeleton, SkeletonCircle, Td, Text, Tr, useDisclosure, useToast } from '@chakra-ui/react'
import { FiMoreHorizontal } from 'react-icons/fi'
import Card from 'components/_card'
import Table from 'components/_table'
import Modal from 'components/_modal'
import { useForm } from 'react-hook-form'
import Toast from 'components/_toast'

const Units = () => {
	const queryClient = useQueryClient()
	const { data: units, isFetched: isUnitsFetched } = useQuery(['units'], () => api.all('/units'))

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

	const addMutation = useMutation((data) => api.create('/units', data), {
		onSuccess: () => {
			queryClient.invalidateQueries('units')
			setIsLoading(false)
			onAddClose()

			toast({
				position: 'bottom-left',
				render: () => <Toast title="Unit Added." message="Unit successfully added." status={true} />
			})
		},
		onError: (error) => {
			setError('number', { type: 'server', message: error.response.data })
			setIsLoading(false)
		}
	})

	const onSubmit = (data) => {
		setIsLoading(true)

		addMutation.mutate({
			data: {
				...data
			}
		})
	}

	return (
		<>
			<NextHead>
				<title>Units</title>
			</NextHead>

			<Container>
				<Flex justify="space-between" align="center" gap={6} mb={6}>
					<Text fontSize="xl" fontWeight="semibold" color="accent-1">
						Units
					</Text>

					<Button colorScheme="brand" onClick={() => reset() || clearErrors() || onAddOpen()}>
						Add New
					</Button>
				</Flex>

				<Card>
					<Table
						data={isUnitsFetched && units}
						th={['Company', 'Unit', 'Type', 'Rent', 'Start Date', 'Due Date', 'Status', '']}
						td={(unit) => (
							<Tr key={unit._id}>
								<Td maxW={200}>
									{unit.company.id ? (
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
									<Badge>{unit.number}</Badge>
								</Td>

								<Td>
									<Badge textTransform="capitalize">{unit.type}</Badge>
								</Td>

								<Td>
									<Text>₱ {Number(unit.monthly_rent).toLocaleString(undefined, { maximumFractionDigits: 2 })}</Text>
								</Td>

								<Td>
									<Text>{unit.schedule.start_date ? unit.schedule.start_date : '-'}</Text>
								</Td>

								<Td>
									<Text>{unit.schedule.due_date ? unit.schedule.due_date : '-'}</Text>
								</Td>

								<Td>
									<Badge variant="tinted" colorScheme={unit.status ? 'blue' : 'red'}>
										{unit.status ? 'Occupied' : 'Vacant'}
									</Badge>
								</Td>

								<Td textAlign="right">
									<NextLink href={`/units/${unit._id}`} passHref>
										<IconButton size="xs" icon={<FiMoreHorizontal size={12} />} />
									</NextLink>
								</Td>
							</Tr>
						)}
						select={(register) => (
							<Flex flex={1} justify="end" align="center" gap={3}>
								<Select placeholder="Type" size="lg" w="auto" {...register('filter_type')}>
									<option value="single">Single</option>
									<option value="attached">Attached</option>
								</Select>

								<Select placeholder="Status" size="lg" w="auto" {...register('status')}>
									<option value={true}>Occupied</option>
									<option value={false}>Vacant</option>
								</Select>
							</Flex>
						)}
						filters={(data, watch) => {
							return data
								.filter((data) =>
									['number'].some((key) =>
										data[key]
											.toString()
											.toLowerCase()
											.includes(watch('search') && watch('search').toLowerCase())
									)
								)
								.filter((data) => (watch('filter_type') ? data.type === watch('filter_type') : data))
								.filter((data) => (watch('status') ? data.status.toString() === watch('status') : data))
						}}
						settings={{
							placeholder: 'Search Unit'
						}}
					/>
				</Card>
			</Container>

			<Modal title="Add Unit" isOpen={isAddOpen} onOpen={onAddOpen} onClose={onAddClose}>
				<form onSubmit={handleSubmit(onSubmit)}>
					<Flex direction="column" gap={6}>
						<FormControl isInvalid={errors.number}>
							<FormLabel>Unit Number</FormLabel>
							<Input type="number" size="lg" {...register('number', { required: 'This field is required.' })} />
							<FormErrorMessage>{errors.number?.message}</FormErrorMessage>
						</FormControl>

						<FormControl isInvalid={errors.type}>
							<FormLabel>Unit Type</FormLabel>

							<Select size="lg" {...register('type', { required: true })}>
								<option value="single">Single</option>
								<option value="attached">Attached</option>
							</Select>
						</FormControl>

						<FormControl isInvalid={errors.monthly_rent}>
							<FormLabel>Monthly Rent</FormLabel>

							<InputGroup>
								<InputLeftElement pointerEvents="none" pt={1} pl={1}>
									₱
								</InputLeftElement>

								<Input type="number" placeholder="0.00" size="lg" {...register('monthly_rent', { required: true })} />
							</InputGroup>

							<FormErrorMessage>This field is required.</FormErrorMessage>
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

Units.authentication = {
	authorized: 'Admin'
}

export default Units
