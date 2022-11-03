import { useState } from 'react'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import api from 'instance'
import { Box, Button, Divider, Flex, FormControl, FormErrorMessage, FormLabel, IconButton, Input, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Table, TableContainer, Tbody, Td, Text, Th, Thead, Tr, useDisclosure } from '@chakra-ui/react'
import { BiListUl, BiPencil, BiX } from 'react-icons/bi'
import { useForm } from 'react-hook-form'

const Maintenance = ({ unit }) => {
	const queryClient = useQueryClient()
	const { isOpen: isEditOpen, onOpen: onEditOpen, onClose: onEditClose } = useDisclosure()
	const { isOpen: isViewOpen, onOpen: onViewOpen, onClose: onViewClose } = useDisclosure()
	const [isLoading, setIsLoading] = useState(false)

	let sum = 0

	unit.maintenance.forEach((data) => {
		sum += Number(data.amount)
	})

	const {
		register,
		formState: { errors },
		reset,
		handleSubmit
	} = useForm()

	const EditUnitMutation = useMutation((data) => api.update('/units/overview', unit._id, data), {
		onSuccess: () => {
			queryClient.invalidateQueries('unit')
			reset()
			setIsLoading(false)
			onEditClose()
		}
	})

	const onSubmit = (data) => {
		setIsLoading(true)

		EditUnitMutation.mutate({
			id: unit._id,
			data: {
				maintenance: data
			}
		})
	}

	const removeItem = (index) => {
		EditUnitMutation.mutate({
			unit: unit._id,
			data: {
				maintenance: {
					remove: {
						index: index
					}
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
						Maintenance
					</Text>

					<Flex gap={3}>
						<IconButton variant="tinted" size="xs" colorScheme="brand" icon={<BiPencil size={16} />} onClick={onEditOpen} />
						<IconButton variant="tinted" size="xs" colorScheme="brand" icon={<BiListUl size={16} />} onClick={onViewOpen} />
					</Flex>
				</Flex>

				<Flex justify="end" gap={6}>
					<Box w={200}>
						<Input value={`₱ ${sum.toLocaleString(undefined, { maximumFractionDigits: 2 })}`} readOnly />
					</Box>
				</Flex>
			</Flex>

			<Modal isOpen={isEditOpen} onClose={onEditClose}>
				<ModalOverlay />

				<ModalContent>
					<form onSubmit={handleSubmit(onSubmit)}>
						<ModalHeader>Maintenance</ModalHeader>

						<ModalBody>
							<Flex direction="column" gap={6}>
								<FormControl isInvalid={errors.title}>
									<FormLabel>Title</FormLabel>
									<Input {...register('title', { required: true })} />
									<FormErrorMessage>This field is required.</FormErrorMessage>
								</FormControl>

								<FormControl isInvalid={errors.amount}>
									<FormLabel>Amount</FormLabel>
									<Input type="number" {...register('amount', { required: true })} />
									<FormErrorMessage>This field is required.</FormErrorMessage>
								</FormControl>
							</Flex>
						</ModalBody>

						<ModalFooter gap={3}>
							<Button type="submit" colorScheme="brand" isLoading={isLoading}>
								Submit
							</Button>

							<Button onClick={onEditClose}>Cancel</Button>
						</ModalFooter>
					</form>
				</ModalContent>
			</Modal>

			<Modal isOpen={isViewOpen} onClose={onViewClose}>
				<ModalOverlay />

				<ModalContent>
					<ModalHeader>Maintenance</ModalHeader>

					<ModalBody>
						<TableContainer>
							<Table>
								<Tbody>
									{unit.maintenance.map((maintenance, index) => (
										<Tr key={index}>
											<Td textAlign="left">
												<Text>{maintenance.title}</Text>
											</Td>

											<Td textAlign="left">
												<Text>₱ {Number(maintenance.amount).toLocaleString(undefined, { maximumFractionDigits: 2 })}</Text>
											</Td>

											<Td textAlign="right">
												<IconButton variant="tinted" size="xs" colorScheme="red" icon={<BiX size={16} />} onClick={() => removeItem(index)} />
											</Td>
										</Tr>
									))}
								</Tbody>
							</Table>
						</TableContainer>
					</ModalBody>

					<ModalFooter gap={3}>
						<Button onClick={onViewClose}>Close</Button>
					</ModalFooter>
				</ModalContent>
			</Modal>
		</>
	)
}

export default Maintenance
