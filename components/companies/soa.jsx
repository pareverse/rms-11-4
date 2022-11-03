import { Badge, Flex, IconButton, Select, Td, Text, Tr } from '@chakra-ui/react'
import { FiMoreHorizontal } from 'react-icons/fi'
import Card from 'components/_card'
import Table from 'components/_table'

const SOA = () => {
	return (
		<Card>
			<Flex justify="space-between" align="center" gap={6} mb={6}>
				<Text fontSize="xl" fontWeight="semibold" color="accent-1">
					Statement of Account
				</Text>
			</Flex>

			<Table
				data={[]}
				th={['ID', 'Start Date', 'Due Date', 'Total Amount', 'Status', '']}
				td={(data, index) => (
					<Tr key={index}>
						<Td>
							<Text>54358349544</Text>
						</Td>

						<Td>
							<Text>09/30/2022</Text>
						</Td>

						<Td>
							<Text>10/30/2022</Text>
						</Td>

						<Td>
							<Text>₱ {Number(50000).toLocaleString(undefined, { maximumFractionDigits: 2 })}</Text>
						</Td>

						<Td>
							<Badge variant="tinted" colorScheme="red">
								Unpaid
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
							<option value={false}>Unpaid</option>
							<option value={true}>Paid</option>
						</Select>
					</Flex>
				)}
				settings={{
					placeholder: 'Search ID',
					show: [5]
				}}
			/>
		</Card>
	)
}

export default SOA
