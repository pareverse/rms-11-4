import { Avatar, Badge, Flex, IconButton, Select, Td, Text, Tr } from '@chakra-ui/react'
import { FiMoreHorizontal } from 'react-icons/fi'
import Card from 'components/_card'
import Table from 'components/_table'

const Payments = () => {
	return (
		<Card>
			<Flex justify="space-between" align="center" gap={6} mb={6}>
				<Text fontSize="xl" fontWeight="semibold" color="accent-1">
					Payment History
				</Text>
			</Flex>

			<Table
				data={[]}
				th={['Tenant', 'Amount', 'Date', 'Pay', 'Status', '']}
				td={(data, index) => (
					<Tr key={index}>
						<Td maxW={200}>
							<Flex align="center" gap={3}>
								<Avatar name="" src="" />

								<Text overflow="hidden" textOverflow="ellipsis" color="accent-1">
									Tenant Name
								</Text>
							</Flex>
						</Td>

						<Td>
							<Text>₱ {Number(50000).toLocaleString(undefined, { maximumFractionDigits: 2 })}</Text>
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
							<Badge variant="tinted" colorScheme="yellow">
								Processing
							</Badge>
						</Td>

						<Td textAlign="right">
							<IconButton size="xs" icon={<FiMoreHorizontal size={12} />} />
						</Td>
					</Tr>
				)}
				select={(register) => (
					<Flex flex={1} justify="end" align="center" gap={3}>
						<Select size="lg" w="auto" {...register('status')}>
							<option value="processing">Processing</option>
							<option value="accepted">Accepted</option>
							<option value="rejected">Rejeted</option>
						</Select>
					</Flex>
				)}
				settings={{
					placeholder: 'Search Tenant',
					show: [5]
				}}
			/>
		</Card>
	)
}

export default Payments
