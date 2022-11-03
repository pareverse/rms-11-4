import { IconButton, Modal as ChakraModal, ModalBody, ModalContent, ModalHeader, ModalOverlay, Text } from '@chakra-ui/react'
import { FiX } from 'react-icons/fi'

const Modal = (props) => {
	const { children, isOpen, onClose, header, title } = props

	return (
		<ChakraModal preserveScrollBarGap isOpen={isOpen} onClose={onClose} {...props}>
			<ModalOverlay />

			<ModalContent>
				{!header || header !== 'off' ? (
					<ModalHeader display="flex" justifyContent="space-between" alignItems="center">
						<Text>{title ? title : null}</Text>

						<IconButton size="sm" borderRadius="full" icon={<FiX size={16} />} onClick={onClose} />
					</ModalHeader>
				) : null}

				<ModalBody>{children}</ModalBody>
			</ModalContent>
		</ChakraModal>
	)
}

export default Modal
