import { useState } from 'react'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import api from 'instance'
import { Box, Button, Divider, Flex, FormControl, FormErrorMessage, FormLabel, IconButton, Input, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Text, useDisclosure } from '@chakra-ui/react'
import { BiPencil } from 'react-icons/bi'
import { useForm } from 'react-hook-form'

const MonthlyRent = ({ id, unit }) => {
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
			data: data
		})
	}

	return (
		<>
			<Divider />

			<Flex direction="column" gap={6}>
				<Flex justify="space-between" align="center" gap={6}>
					<Text fontWeight="semibold" color="accent-1">
						Monthly Rent
					</Text>

					<IconButton variant="tinted" size="xs" colorScheme="brand" icon={<BiPencil size={16} />} onClick={onOpen} />
				</Flex>

				<Flex justify="end" gap={6}>
					<Box w={200}>
						<Input value={`₱ ${Number(unit.monthly_rent).toLocaleString(undefined, { maximumFractionDigits: 2 })}`} readOnly />
					</Box>
				</Flex>
			</Flex>

			<Modal isOpen={isOpen} onClose={onClose}>
				<ModalOverlay />

				<ModalContent>
					<form onSubmit={handleSubmit(onSubmit)}>
						<ModalHeader>Monthly Rent</ModalHeader>

						<ModalBody>
							<Flex direction="column" gap={6}>
								<FormControl isInvalid={errors.monthly_rent}>
									<FormLabel>Monthly Rent</FormLabel>
									<Input type="number" defaultValue={unit.monthly_rent} {...register('monthly_rent', { required: true })} />
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

export default MonthlyRent
