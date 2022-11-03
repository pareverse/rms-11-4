import { Flex, Text } from '@chakra-ui/react'
import Card from 'components/_card'

const Details = ({ unit }) => {
	return (
		<Card>
			<Flex direction="column" gap={6}>
				<Flex direction="column">
					<Text fontSize="sm" fontWeight="semibold" color="accent-1">
						Unit Number
					</Text>

					<Text fontSize="sm" fontWeight="medium">
						{unit.number}
					</Text>
				</Flex>

				<Flex direction="column">
					<Text fontSize="sm" fontWeight="semibold" color="accent-1">
						Unit Type
					</Text>

					<Text fontSize="sm" fontWeight="medium" textTransform="capitalize">
						{unit.type}
					</Text>
				</Flex>

				<Flex direction="column">
					<Text fontSize="sm" fontWeight="semibold" color="accent-1">
						Monthly Rent
					</Text>

					<Text fontSize="sm" fontWeight="medium">
						₱{Number(unit.monthly_rent).toLocaleString(undefined, { maximumFractionDigits: 2 })}
					</Text>
				</Flex>

				<Flex direction="column">
					<Text fontSize="sm" fontWeight="semibold" color="accent-1">
						Created
					</Text>

					<Text fontSize="sm" fontWeight="medium">
						{unit.created.split(',')[0]}
					</Text>
				</Flex>
			</Flex>
		</Card>
	)
}

export default Details
