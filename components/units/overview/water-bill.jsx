import { useState } from 'react'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import api from 'instance'
import { Box, Button, Divider, Flex, FormControl, FormErrorMessage, FormLabel, IconButton, Input, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Text, useDisclosure } from '@chakra-ui/react'
import { BiPencil } from 'react-icons/bi'
import { useForm } from 'react-hook-form'

const WaterBill = ({ unit }) => {
	const queryClient = useQueryClient()
	const { isOpen, onOpen, onClose } = useDisclosure()
	const [isLoading, setIsLoading] = useState(false)

	const {
		register,
		formState: { errors },
		handleSubmit
	} = useForm()

	const EditUnitMutation = useMutation((data) => api.update('/units/overview', unit._id, data), {
		onSuccess: () => {
			queryClient.invalidateQueries('unit')
			setIsLoading(false)
			onClose()
		}
	})

	const onSubmit = (data) => {
		setIsLoading(true)

		EditUnitMutation.mutate({
			id: unit._id,

			data: {
				water_bill: {
					current_reading: {
						value: data.current_reading_value,
						date: data.current_reading_date
					},
					previous_reading: {
						value: data.previous_reading_value,
						date: data.previous_reading_date
					},
					amount: data.amount
				}
			}
		})
	}

	return (
		<>
			<Divider />

			<Flex direction="column" gap={6}>
				<Flex justify="space-between" align="center" gap={6}>
					<Text fontWeight="semibold" color="accent-1">
						Water Bill
					</Text>

					<IconButton variant="tinted" size="xs" colorScheme="brand" icon={<BiPencil size={16} />} onClick={onOpen} />
				</Flex>

				<Flex justify="end" gap={6}>
					<Box w={200}>
						<Input value={`₱ ${Number(unit.water_bill.amount).toLocaleString(undefined, { maximumFractionDigits: 2 })}`} readOnly />
					</Box>
				</Flex>
			</Flex>

			<Modal isOpen={isOpen} onClose={onClose}>
				<ModalOverlay />

				<ModalContent>
					<form onSubmit={handleSubmit(onSubmit)}>
						<ModalHeader>Water Bill</ModalHeader>

						<ModalBody>
							<Flex direction="column" gap={6}>
								<Flex gap={6}>
									<FormControl isInvalid={errors.current_reading_value}>
										<FormLabel>Current Reading</FormLabel>
										<Input type="number" defaultValue={unit.water_bill.current_reading.value} {...register('current_reading_value', { required: true })} />
										<FormErrorMessage>This field is required.</FormErrorMessage>
									</FormControl>

									<FormControl isInvalid={errors.current_reading_date}>
										<FormLabel>Date</FormLabel>
										<Input type="date" defaultValue={unit.water_bill.current_reading.date} {...register('current_reading_date', { required: true })} />
										<FormErrorMessage>This field is required.</FormErrorMessage>
									</FormControl>
								</Flex>

								<Flex gap={6}>
									<FormControl isInvalid={errors.previous_reading_value}>
										<FormLabel>Previous Reading</FormLabel>
										<Input type="number" defaultValue={unit.water_bill.previous_reading.value} {...register('previous_reading_value', { required: true })} />
										<FormErrorMessage>This field is required.</FormErrorMessage>
									</FormControl>

									<FormControl isInvalid={errors.previous_reading_date}>
										<FormLabel>Date</FormLabel>
										<Input type="date" defaultValue={unit.water_bill.previous_reading.date} {...register('previous_reading_date', { required: true })} />
										<FormErrorMessage>This field is required.</FormErrorMessage>
									</FormControl>
								</Flex>

								<FormControl isInvalid={errors.amount}>
									<FormLabel>Amount</FormLabel>
									<Input type="number" defaultValue={unit.water_bill.amount} {...register('amount', { required: true })} />
									<FormErrorMessage>This field is required.</FormErrorMessage>
								</FormControl>
							</Flex>
						</ModalBody>

						<ModalFooter gap={3}>
							<Button type="submit" colorScheme="brand" isLoading={isLoading}>
								Submit
							</Button>

							<Button onClick={onClose}>Cancel</Button>
						</ModalFooter>
					</form>
				</ModalContent>
			</Modal>
		</>
	)
}

export default WaterBill
