import { useState } from 'react'
import { Avatar, Button, Flex, IconButton, Skeleton, SkeletonCircle, Td, Text, Tr, useDisclosure } from '@chakra-ui/react'
import { FiPlus } from 'react-icons/fi'
import Card from 'components/_card'
import Modal from 'components/_modal'
import Table from 'components/_table'

const Profile = ({ unit }) => {
	const { isOpen: isAddOpen, onOpen: onAddOpen, onClose: onAddClose } = useDisclosure()
	const { isOpen: isAddMessageOpen, onOpen: onAddMessageOpen, onClose: onAddMessageClose } = useDisclosure()
	const [unitSelected, setUnitSelected] = useState(null)

	return (
		<>
			<Card>
				{unit.company.id ? (
					<Flex align="center" direction="column" gap={6} p={6}>
						<Avatar size="xl" />

						<Flex align="center" direction="column" textAlign="center">
							<Text fontWeight="semibold" color="accent-1" noOfLines={1}>
								Company Name
							</Text>

							<Text fontSize="sm" noOfLines={1}>
								companyemail@gmail.com
							</Text>
						</Flex>
					</Flex>
				) : (
					<Flex align="center" direction="column" gap={6} p={6}>
						<SkeletonCircle size={24} />

						<Flex align="center" direction="column" gap={2}>
							<Skeleton h={2} w={148} />
							<Skeleton h={2} w={24} />
						</Flex>

						<Button size="lg" colorScheme="brand" onClick={onAddOpen}>
							Add Company
						</Button>
					</Flex>
				)}
			</Card>

			<Modal title="Add Company" isOpen={isAddOpen} onClose={onAddClose}>
				<Table
					data={['']}
					th={[]}
					td={(data, index) => (
						<Tr key={index}>
							<Td maxW={256}>
								<Flex align="center" gap={3}>
									<Avatar name="" src="" />

									<Text overflow="hidden" textOverflow="ellipsis" color="accent-1">
										Company Name
									</Text>
								</Flex>
							</Td>

							<Td textAlign="right">
								<IconButton variant="tinted" colorScheme="brand" icon={<FiPlus size={16} />} onClick={() => onAddMessageOpen() || onAddClose()} />
							</Td>
						</Tr>
					)}
					settings={{
						placeholder: 'Search Company',
						searchFull: true,
						show: [5]
					}}
				/>
			</Modal>

			<Modal header="off" isOpen={isAddMessageOpen} onClose={onAddMessageClose}>
				<Flex align="center" direction="column" gap={6} p={6}>
					<Avatar size="xl" />

					<Flex align="center" direction="column" textAlign="center">
						<Text fontWeight="semibold" color="accent-1" noOfLines={1}>
							Company Name
						</Text>

						<Text fontSize="sm" noOfLines={1}>
							companyemail@gmail.com
						</Text>
					</Flex>

					<Text>Are you sure you want to add this company?</Text>

					<Flex align="center" gap={3}>
						<Button size="lg" colorScheme="brand">
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

export default Profile
