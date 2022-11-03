import { Flex, Icon, Text } from '@chakra-ui/react'
import { FiAlertTriangle, FiCheck } from 'react-icons/fi'
import Card from './_card'

const Toast = ({ title, message, status }) => {
	return (
		<Card shadow="sm">
			<Flex align="center" gap={3}>
				<Flex bg={status ? 'brand.default' : 'red.default'} justify="center" align="center" borderRadius="full" h={10} w={10}>
					<Icon as={status ? FiCheck : FiAlertTriangle} color="white" />
				</Flex>

				<Flex direction="column">
					<Text fontSize="sm" fontWeight="semibold" color="accent-1">
						{title ? title : null}
					</Text>

					<Text fontSize="sm">{message ? message : null}</Text>
				</Flex>
			</Flex>
		</Card>
	)
}

export default Toast
