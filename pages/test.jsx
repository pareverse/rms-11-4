import { useState, useEffect } from 'react'
import { Accordion, AccordionButton, AccordionIcon, AccordionItem, AccordionPanel, Badge, Box, Button, Checkbox, Container, Divider, Flex, FormControl, FormErrorMessage, FormHelperText, FormLabel, Grid, IconButton, Image, Input, Link, Menu, MenuButton, MenuDivider, MenuItem, MenuList, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Popover, PopoverArrow, PopoverBody, PopoverCloseButton, PopoverContent, PopoverFooter, PopoverHeader, PopoverTrigger, Radio, Select, SimpleGrid, Stack, Switch, Tab, Table, TableContainer, TabList, TabPanel, TabPanels, Tabs, Tbody, Td, Text, Textarea, Th, Thead, Tr, useColorMode, useDisclosure } from '@chakra-ui/react'
import { useQuery } from '@tanstack/react-query'
import Card from 'components/_card'
import { Facebook, Google, Romadan, Telegram } from 'components/_logos'
import api from 'instance'
import { FiLogOut, FiSettings, FiUser, FiX } from 'react-icons/fi'
import { BiPencil } from 'react-icons/bi'
import axios from 'axios'
import { useSession, signIn, signOut } from 'next-auth/react'

const Test = () => {
	const handleImage = (e) => {
		const file = e.target.files[0]

		if (!file) return console.log('file does not exists.')
		if (file.size > 1024 * 1024) return console.log('the largest image size is 1mb.')
		if (file.type !== 'image/jpeg' && file.type !== 'image/png') return console.log('image format is incorrect.')

		setImage(file)
	}

	const uploadImage = async (image) => {
		let data = null

		for (const item of image) {
			const formData = new FormData()

			formData.append('file', item)
			formData.append('upload_preset', 'uploads')

			const res = await axios.post('https://api.cloudinary.com/v1_1/commence/image/upload', formData)
			data = res.data
		}

		return data
	}

	const { toggleColorMode } = useColorMode()
	const { isOpen, onOpen, onClose } = useDisclosure()
	const [image, setImage] = useState()
	const { data: session } = useSession()

	const upload = (e) => {
		const file = e.target.files[0]

		if (!file) return console.log('file does not exists.')
		if (file.size > 1024 * 1024) return console.log('the largest image size is 1mb.')
		if (file.type !== 'image/jpeg' && file.type !== 'image/png') return console.log('image format is incorrect.')

		setImage(file)
	}

	const handleOnChange = (e) => {
		const reader = new FileReader()

		reader.onload = function (e) {
			setImage(e.target.result)
		}

		reader.readAsDataURL(e.target.files[0])
	}

	const handleSubmit = async (e) => {
		e.preventDefault()

		const form = e.currentTarget
		const fileInput = Array.from(form.elements).find(({ name }) => name === 'file')

		const formData = new FormData()

		for (const file of fileInput.files) {
			formData.append('file', file)
		}

		formData.append('upload_preset', 'uploads')

		const data = await axios.post('https://api.cloudinary.com/v1_1/commence/image/upload', formData).then((res) => res.data)
		console.log(data)
	}

	return (
		<>
			<Container>
				{/* <Card>
					<Table
						title="Latest Payments"
						data={[]}
						th={['#', 'First Name', 'Last Name', 'Maiden Name', 'Age', 'Gender']}
						td={(user) => (
							<Tr key={user.id}>
								<Td>{user.id}</Td>
								<Td>{user.firstName}</Td>
								<Td>{user.lastName}</Td>
								<Td>{user.maidenName}</Td>
								<Td>{user.age}</Td>
								<Td>{user.gender}</Td>
							</Tr>
						)}
						select={(register, state, dispatch) => (
							<Flex flex={1} justify="end">
								<Select placeholder="Gender" variant="filled" size="lg" w="auto" {...register('gender', { onChange: () => dispatch({ ...state, isLoading: true }) })}>
									<option value="male">Male</option>
									<option value="female">Female</option>
								</Select>
							</Flex>
						)}
						filters={(data, watch) => {
							return data.filter((data) => ['firstName', 'lastName', 'maidenName'].some((key) => data[key].toString().toLowerCase().includes(watch('search').toLowerCase()))).filter((data) => (watch('gender') ? data.gender === watch('gender') : data))
						}}
						effects={(watch) => {
							return [watch('gender')]
						}}
					/>
				</Card> */}

				<Card>
					<Stack gap={3}>
						<form onSubmit={handleSubmit}>
							<Flex direction="column" gap={6}>
								<Box position="relative">
									<Box position="absolute" top={-3}>
										<Input type="file" name="file" opacity={0} onChange={handleOnChange} />
									</Box>

									<Box bg="canvas-2" boxSize={148} borderRadius={12} overflow="hidden">
										{image && <Image boxSize={148} alt="" src={image} />}
									</Box>
								</Box>

								<Button type="submit">Upload File</Button>
							</Flex>
						</form>

						<Text fontSize="4xl" fontWeight="semibold" color="accent-1">
							Welcome to Next JS {session ? 'with session' : 'no session'}
						</Text>

						<Romadan h={32} w={24} />
						<Google size={96} />
						<Facebook />
						<Telegram />

						<Text color="accent-3">Lorem ipsum dolor sit amet consectetur adipisicing elit. Expedita natus itaque ipsam doloremque aspernatur nisi molestias sequi maiores neque, est voluptate culpa nemo tenetur iste hic at magnam nam asperiores.</Text>

						<Text color="accent-4">Tristan Felizarta - 08/23/2000</Text>
						<Text color="accent-5">visit us on facebook</Text>

						<Box>
							<Button onClick={toggleColorMode}>Toggle Theme</Button>
						</Box>

						<Divider />

						<Stack direction="row" spacing={3}>
							<Button>Connect</Button>
							<Box>
								<Menu>
									<MenuButton as={Button} colorScheme="blue">
										Connect
									</MenuButton>

									<MenuList>
										<MenuItem icon={<FiUser size={16} />}>Profile</MenuItem>
										<MenuItem icon={<FiSettings size={16} />}>Settings</MenuItem>
										<MenuDivider />
										<MenuItem icon={<FiLogOut size={16} />}>Log out</MenuItem>
									</MenuList>
								</Menu>
							</Box>
							<Button colorScheme="red" size="lg" onClick={onOpen}>
								Connect
							</Button>

							<Modal size="sm" isCentered preserveScrollBarGap isOpen={isOpen} onClose={onClose}>
								<ModalOverlay />

								<ModalContent>
									<ModalHeader display="flex" justifyContent="space-between" alignItems="center">
										<Text>Create User</Text>

										<IconButton size="sm" borderRadius="full" icon={<FiX size={16} />} />
									</ModalHeader>

									<ModalBody>
										<Stack spacing={6}>
											<FormControl isRequired>
												<FormLabel>Unit Number</FormLabel>
												<Input size="lg" variant="filled" />
												<FormHelperText>We dont share your username.</FormHelperText>
												<FormErrorMessage>Username is required.</FormErrorMessage>
											</FormControl>

											<FormControl isRequired>
												<FormLabel>Select Payments</FormLabel>
												<Select size="lg" variant="filled">
													<option>Payment Methods</option>
												</Select>
											</FormControl>
										</Stack>
									</ModalBody>

									<ModalFooter gap={3}>
										<Button colorScheme="blue" size="lg">
											Submit
										</Button>
									</ModalFooter>
								</ModalContent>
							</Modal>

							<Button colorScheme="brand" onClick={() => signIn('google')}>
								Sign in
							</Button>
							<Button colorScheme="brand" onClick={() => signOut()}>
								Sign out
							</Button>
							<Button colorScheme="green">Connect</Button>
							<Button colorScheme="yellow">Connect</Button>

							<Box>
								<Popover>
									<PopoverTrigger>
										<Button colorScheme="purple">Connect</Button>
									</PopoverTrigger>

									<PopoverContent>
										<PopoverHeader>Confirmation!</PopoverHeader>
										<PopoverCloseButton />
										<PopoverBody>Are you sure you want to have that milkshake?</PopoverBody>
										<PopoverFooter>
											<Button>Close</Button>
										</PopoverFooter>
									</PopoverContent>
								</Popover>
							</Box>
						</Stack>

						<Divider />

						<Stack direction="row" spacing={6}>
							<Link active={1}>Home</Link>
							<Link>Products</Link>
							<Link>Blogs</Link>
							<Link>Services</Link>
							<Link>Contact Us</Link>
						</Stack>

						<Divider />

						<Tabs>
							<TabList>
								<Tab>Overview</Tab>
								<Tab>Settings</Tab>
							</TabList>

							<TabPanels>
								<TabPanel>1</TabPanel>
								<TabPanel>2</TabPanel>
							</TabPanels>
						</Tabs>

						<Divider />

						<Accordion defaultIndex={[0]} allowMultiple>
							<AccordionItem>
								<h2>
									<AccordionButton>
										<Box flex="1" textAlign="left">
											Section 1 title
										</Box>
										<AccordionIcon />
									</AccordionButton>
								</h2>
								<AccordionPanel pb={4}>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</AccordionPanel>
							</AccordionItem>

							<AccordionItem>
								<h2>
									<AccordionButton>
										<Box flex="1" textAlign="left">
											Section 2 title
										</Box>
										<AccordionIcon />
									</AccordionButton>
								</h2>
								<AccordionPanel pb={4}>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</AccordionPanel>
							</AccordionItem>
						</Accordion>

						<Divider />

						<FormControl isRequired>
							<FormLabel>Unit Number</FormLabel>
							<Input size="lg" placeholder="Search Customers" />
							<FormHelperText>We dont share your username.</FormHelperText>
							<FormErrorMessage>Username is required.</FormErrorMessage>
						</FormControl>

						<FormControl isRequired>
							<FormLabel>Select Payments</FormLabel>
							<Select size="lg">
								<option>Payment Methods</option>
							</Select>
						</FormControl>

						<FormControl isRequired>
							<FormLabel size="lg">Message</FormLabel>

							<Textarea placeholder="Whats on your mind..."></Textarea>
						</FormControl>

						<Stack spacing={3}>
							<Checkbox>Accept terms and policy.</Checkbox>
						</Stack>

						<Box>
							<Stack spacing={3}>
								<Switch />
							</Stack>
						</Box>

						<Stack direction="row" spacing={3}>
							<Badge>Occupied</Badge>
							<Badge colorScheme="blue">Occupied</Badge>

							<Badge variant="tinted">Occupied</Badge>
							<Badge variant="tinted" colorScheme="blue">
								Occupied
							</Badge>
						</Stack>

						<Stack direction="row" spacing={3}>
							<Button colorScheme="brand">Sign in</Button>
							<Button>Close</Button>
						</Stack>

						<TableContainer>
							<Table>
								<Thead>
									<Tr>
										<Th>
											<Checkbox />
										</Th>
										<Th>Company</Th>
										<Th>Tenant</Th>
										<Th>Unit</Th>
										<Th>Amount</Th>
										<Th>Status</Th>
									</Tr>
								</Thead>

								<Tbody>
									{[...Array(5)].map((data, index) => (
										<Tr key={index}>
											<Td>
												<Checkbox />
											</Td>
											<Td>Company Name</Td>
											<Td>Tenant Name</Td>
											<Td>110</Td>
											<Td>P25,000</Td>
											<Td>Occupied</Td>
										</Tr>
									))}
								</Tbody>
							</Table>
						</TableContainer>
					</Stack>
				</Card>
			</Container>

			<Container py={6}>
				<SimpleGrid spacing={6}>
					<Card></Card>

					<Card></Card>

					<Card></Card>

					<Card></Card>
				</SimpleGrid>
			</Container>
		</>
	)
}

export default Test
