import NextHead from 'next/head'
import { Button, Container, Flex, Select, Td, Text, Tr } from '@chakra-ui/react'
import Card from 'components/_card'
import Table from 'components/_table'

const Payments = () => {
	return (
		<>
			<NextHead>
				<title>Payments</title>
			</NextHead>

			<Container>
				<Flex justify="space-between" align="center" gap={6} mb={6}>
					<Text fontSize="xl" fontWeight="semibold" color="accent-1">
						Payments
					</Text>

					<Button colorScheme="brand">History</Button>
				</Flex>

				<Card>
					<Table
						data={[]}
						th={['']}
						td={(data, index) => (
							<Tr key={index}>
								<Td></Td>
							</Tr>
						)}
						select={(register, state, dispatch) => (
							<Flex flex={1} justify="end" align="center">
								<Select size="lg" w="auto">
									<option></option>
								</Select>
							</Flex>
						)}
					/>
				</Card>
			</Container>
		</>
	)
}

Payments.authentication = {
	authorized: 'Admin'
}

export default Payments
