import NextLink from 'next/link'
import { useRouter } from 'next/router'
import { useSession, signIn } from 'next-auth/react'
import { Button, chakra, Divider, Flex, Icon, IconButton, Link, Text } from '@chakra-ui/react'
import { FiArchive, FiBox, FiBriefcase, FiCreditCard, FiEdit2, FiGrid, FiPieChart, FiSettings, FiStar, FiUsers, FiX } from 'react-icons/fi'

const Sidebar = ({ isSidebarOpen, onSidebarClose }) => {
	const router = useRouter()
	const { data: session } = useSession()

	const links = [
		{ pathname: 'dashboard', icon: FiPieChart },
		{ pathname: 'blogs', icon: FiEdit2 },
		{ pathname: 'units', icon: FiGrid },
		{ pathname: 'tenants', icon: FiUsers },
		{ pathname: 'companies', icon: FiBriefcase },
		{ pathname: 'payments', icon: FiCreditCard },
		{ pathname: 'accounts', icon: FiStar },
		{ pathname: 'archive', icon: FiArchive },
		{ pathname: 'settings', icon: FiSettings }
	]

	return (
		<>
			<chakra.div bg="hsla(0, 0%, 0%, 0.4)" position="fixed" top={0} left={0} h="100vh" w="full" visibility={isSidebarOpen ? 'visible' : 'hidden'} opacity={isSidebarOpen ? 1 : 0} transition="0.4s ease-in-out" zIndex={99} onClick={onSidebarClose} />

			<chakra.aside bg="white" position="fixed" top={0} left={isSidebarOpen ? 0 : -300} h="100vh" w={300} transition="0.4s ease-in-out" zIndex={100} _dark={{ bg: 'surface' }}>
				<Flex justify="space-between" align="center" px={6} py={3} h={20}>
					<Flex align="center" gap={2} color="accent-1" cursor="default">
						<Icon as={FiBox} boxSize={6} />

						<Text fontSize="lg" fontWeight="semibold">
							TSVJ CENTER
						</Text>
					</Flex>

					<IconButton variant="plain" mr="-10px" icon={<FiX size={20} />} onClick={onSidebarClose} />
				</Flex>

				{session ? (
					<Flex direction="column" p={3}>
						{links.map((data, index) => (
							<NextLink href={`/${data.pathname}`} passHref key={index}>
								<Flex bg={router.pathname.includes(data.pathname) ? 'canvas-1' : 'transparent'} justify="space-between" align="center" gap={6} borderRadius={12} px={3} h="48px" color={router.pathname.includes(data.pathname) ? 'accent-1' : 'accent-3'} transition=".4s" _hover={{ color: 'accent-1' }} onClick={onSidebarClose}>
									<Flex align="center" gap={3}>
										<Icon as={data.icon} boxSize={4} />

										<Text fontSize="sm" fontWeight="medium" textTransform="capitalize">
											{data.pathname}
										</Text>
									</Flex>
								</Flex>
							</NextLink>
						))}
					</Flex>
				) : (
					<Flex direction="column" gap={6} p={6}>
						<Button colorScheme="brand" onClick={() => signIn('google')}>
							Sign in
						</Button>

						<Divider />

						<NextLink href="/" passHref>
							<Link as="span" w="full" active={router.pathname === '/' ? 1 : 0}>
								Home
							</Link>
						</NextLink>

						<NextLink href="/" passHref>
							<Link as="span" active={router.pathname === '/blogs' ? 1 : 0}>
								Blogs
							</Link>
						</NextLink>

						<NextLink href="/" passHref>
							<Link as="span" active={router.pathname === '/services' ? 1 : 0}>
								Services
							</Link>
						</NextLink>

						<NextLink href="/" passHref>
							<Link as="span" active={router.pathname === '/company' ? 1 : 0}>
								Company
							</Link>
						</NextLink>

						<NextLink href="/" passHref>
							<Link as="span" active={router.pathname === '/contact' ? 1 : 0}>
								Call Us
							</Link>
						</NextLink>
					</Flex>
				)}
			</chakra.aside>
		</>
	)
}

export default Sidebar
