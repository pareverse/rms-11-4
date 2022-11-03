import { Td, Tr } from '@chakra-ui/react'
import Card from 'components/_card'
import Table from 'components/_table'

const History = () => {
	return (
		<Card>
			<Table
				data={[]}
				th={['Company', 'Start Date', 'Due Date', 'Total Amount', '']}
				td={(data, index) => (
					<Tr key={index}>
						<Td></Td>
					</Tr>
				)}
				settings={{
					show: [5]
				}}
			/>
		</Card>
	)
}

export default History
