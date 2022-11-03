import { useQuery } from '@tanstack/react-query'
import api from 'instance'
import { Flex, GridItem, Icon, Text } from '@chakra-ui/react'
import { FiCheckSquare, FiDollarSign, FiGrid, FiUsers } from 'react-icons/fi'
import Card from 'components/_card'

const Statistics = () => {
	const { data: units } = useQuery(['units'], () => api.all('/units'))

	return (
		<>
			<GridItem colSpan={{ base: 12, md: 6, xl: 3 }}>
				<Card>
					<Flex justify="space-between" align="center">
						<Flex direction="column" gap={1} w="calc(100% - 76px)">
							<Text fontSize="2xl" fontWeight="semibold" color="accent-1" noOfLines={1}>
								{units ? units.filter((unit) => unit.status === false).length : 0}
							</Text>

							<Text fontSize="sm" fontWeight="medium">
								Vacant Units
							</Text>
						</Flex>

						<Flex bg="brand.alpha" justify="center" align="center" borderRadius="full" h={16} w={16}>
							<Icon as={FiCheckSquare} boxSize={6} color="brand.default" />
						</Flex>
					</Flex>
				</Card>
			</GridItem>

			<GridItem colSpan={{ base: 12, md: 6, xl: 3 }}>
				<Card>
					<Flex justify="space-between" align="center">
						<Flex direction="column" gap={1} w="calc(100% - 76px)">
							<Text fontSize="2xl" fontWeight="semibold" color="accent-1" noOfLines={1}>
								{units ? units.length : 0}
							</Text>

							<Text fontSize="sm" fontWeight="medium">
								Total Units
							</Text>
						</Flex>

						<Flex bg="brand.alpha" justify="center" align="center" borderRadius="full" h={16} w={16}>
							<Icon as={FiGrid} boxSize={6} color="brand.default" />
						</Flex>
					</Flex>
				</Card>
			</GridItem>

			<GridItem colSpan={{ base: 12, md: 6, xl: 3 }}>
				<Card>
					<Flex justify="space-between" align="center">
						<Flex direction="column" gap={1} w="calc(100% - 76px)">
							<Text fontSize="2xl" fontWeight="semibold" color="accent-1" noOfLines={1}>
								0
							</Text>

							<Text fontSize="sm" fontWeight="medium">
								Total Tenants
							</Text>
						</Flex>

						<Flex bg="brand.alpha" justify="center" align="center" borderRadius="full" h={16} w={16}>
							<Icon as={FiUsers} boxSize={6} color="brand.default" />
						</Flex>
					</Flex>
				</Card>
			</GridItem>

			<GridItem colSpan={{ base: 12, md: 6, xl: 3 }}>
				<Card>
					<Flex justify="space-between" align="center">
						<Flex direction="column" gap={1} w="calc(100% - 76px)">
							<Text fontSize="2xl" fontWeight="semibold" color="accent-1" noOfLines={1}>
								₱0.00
							</Text>

							<Text fontSize="sm" fontWeight="medium">
								Total Collected
							</Text>
						</Flex>

						<Flex bg="brand.alpha" justify="center" align="center" borderRadius="full" h={16} w={16}>
							<Icon as={FiDollarSign} boxSize={6} color="brand.default" />
						</Flex>
					</Flex>
				</Card>
			</GridItem>
		</>
	)
}

export default Statistics
