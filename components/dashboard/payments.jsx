import { Avatar, Badge, Flex, IconButton, Td, Text, Tr } from '@chakra-ui/react'
import { FiLink, FiMoreHorizontal } from 'react-icons/fi'
import Card from 'components/_card'
import Table from 'components/_table'

const Payments = () => {
	return (
		<Card>
			<Flex justify="space-between" align="center" gap={6} mb={6}>
				<Text fontSize="xl" fontWeight="semibold" color="accent-1">
					Latest Payments
				</Text>

				<IconButton icon={<FiLink size={16} />} />
			</Flex>

			<Table
				data={[]}
				th={['Company', 'Tenant', 'Unit', 'Amount', 'Date', 'Pay', 'Status', '']}
				td={(data, index) => (
					<Tr key={index}>
						<Td maxW={200}>
							<Flex align="center" gap={3}>
								<Avatar name="" src="" />

								<Text overflow="hidden" textOverflow="ellipsis" color="accent-1">
									Company Name
								</Text>
							</Flex>
						</Td>

						<Td>
							<Avatar name="" src="" />
						</Td>

						<Td>
							<Badge>000</Badge>
						</Td>

						<Td>
							<Text>₱25,000</Text>
						</Td>

						<Td>
							<Text>10/30/2022</Text>
						</Td>

						<Td>
							<Badge variant="tinted" colorScheme="blue">
								GCash
							</Badge>
						</Td>

						<Td>
							<Badge variant="tinted" colorScheme="blue">
								Processing
							</Badge>
						</Td>

						<Td textAlign="right">
							<IconButton size="xs" icon={<FiMoreHorizontal size={12} />} />
						</Td>
					</Tr>
				)}
				settings={{
					search: 'off',
					show: [5]
				}}
			/>
		</Card>
	)
}

export default Payments
