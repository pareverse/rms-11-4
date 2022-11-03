import NextHead from 'next/head'
import { Container, Flex, Text } from '@chakra-ui/react'

const Archive = () => {
	return (
		<>
			<NextHead>
				<title>Settings</title>
			</NextHead>

			<Container>
				<Flex justify="space-between" align="center" gap={6} mb={6}>
					<Text fontSize="xl" fontWeight="semibold" color="accent-1">
						Settings
					</Text>
				</Flex>
			</Container>
		</>
	)
}

Archive.authentication = {
	authorized: 'Admin'
}

export default Archive
