import { useState } from 'react'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import api from 'instance'
import { Box, Button, Divider, Flex, FormControl, FormErrorMessage, FormLabel, IconButton, Input, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Text, useDisclosure } from '@chakra-ui/react'
import { BiPencil } from 'react-icons/bi'
import { useForm } from 'react-hook-form'

const Schedule = ({ id, unit }) => {
	const queryClient = useQueryClient()
	const { isOpen, onOpen, onClose } = useDisclosure()
	const [isLoading, setIsLoading] = useState(false)

	const {
		register,
		formState: { errors },
		handleSubmit
	} = useForm()

	const EditUnitMutation = useMutation((data) => api.update('/units/overview', id, data), {
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
				schedule: data
			}
		})
	}

	return (
		<>
			<Divider />

			<Flex direction="column" gap={6}>
				<Flex justify="space-between" align="center" gap={6}>
					<Text fontWeight="semibold" color="accent-1">
						Schedule
					</Text>

					<IconButton variant="tinted" size="xs" colorScheme="brand" icon={<BiPencil size={16} />} disabled={unit.company.id ? false : true} onClick={onOpen} />
				</Flex>

				<Flex justify="end" gap={6}>
					<Box w={200}>
						<FormControl>
							<FormLabel>Start Date</FormLabel>
							<Input type="date" value={unit.schedule.start_date} readOnly />
						</FormControl>
					</Box>

					<Box w={200}>
						<FormControl>
							<FormLabel>Due Date</FormLabel>
							<Input type="date" value={unit.schedule.due_date} readOnly />
						</FormControl>
					</Box>
				</Flex>
			</Flex>

			<Modal isOpen={isOpen} onClose={onClose}>
				<ModalOverlay />

				<ModalContent>
					<form onSubmit={handleSubmit(onSubmit)}>
						<ModalHeader>Schedule</ModalHeader>

						<ModalBody>
							<Flex direction="column" gap={6}>
								<FormControl isInvalid={errors.start_date}>
									<FormLabel>Start Date</FormLabel>
									<Input type="date" defaultValue={unit.schedule.start_date} {...register('start_date', { required: true })} />
									<FormErrorMessage>This field is required.</FormErrorMessage>
								</FormControl>

								<FormControl isInvalid={errors.due_date}>
									<FormLabel>Due Date</FormLabel>
									<Input type="date" defaultValue={unit.schedule.due_date} {...register('due_date', { required: true })} />
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

export default Schedule
