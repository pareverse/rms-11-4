import { useState, useEffect } from 'react'
import NextLink from 'next/link'
import { useRouter } from 'next/router'
import { useSession, signIn, signOut } from 'next-auth/react'
import { Avatar, Button, chakra, Flex, Icon, IconButton, Link, Menu, MenuButton, MenuDivider, MenuItem, MenuList, Text, useColorMode, useColorModeValue } from '@chakra-ui/react'
import { FiBell, FiBox, FiLogOut, FiMenu, FiMoon, FiMoreVertical, FiSun } from 'react-icons/fi'

const Header = ({ onSidebarOpen }) => {
	const router = useRouter()
	const { data: session } = useSession()
	const { toggleColorMode } = useColorMode()
	const colorModeIcon = useColorModeValue(<FiMoon size={16} fill="currentColor" />, <FiSun size={16} fill="currentColor" />)
	const [isScrolling, setIsScrolling] = useState(false)

	useEffect(() => {
		if (typeof window !== 'undefined') {
			window.addEventListener('scroll', () => {
				setIsScrolling(window.pageYOffset > 0)
			})
		}
	}, [])

	return (
		<chakra.header bg="white" position="sticky" top={0} shadow={isScrolling && 'sm'} transition=".4s" zIndex={99} _dark={{ bg: isScrolling ? 'surface' : 'system', border: 'none', shadow: isScrolling && 'dark-xl' }}>
			<Flex justify="space-between" align="center" gap={6} mx="auto" px={6} h={20} w="full" maxW={1280}>
				<Flex align="center" gap={3}>
					{session && session.user.role === 'Admin' && <IconButton variant="outline" color="accent-1" icon={<FiMoreVertical size={16} />} onClick={onSidebarOpen} />}

					<Flex align="center" gap={2} color="accent-1" cursor="default">
						<Icon as={FiBox} boxSize={6} />

						<Text display={{ base: session && session.user.role === 'Admin' ? 'none' : 'block', lg: 'block' }} fontSize="lg" fontWeight="semibold">
							TSVJ CENTER
						</Text>
					</Flex>
				</Flex>

				{session ? (
					<Flex align="center" gap={3}>
						<Flex align="center">
							<IconButton variant="ghost" icon={colorModeIcon} onClick={toggleColorMode} />
						</Flex>

						<Menu>
							<MenuButton>
								<Avatar name={session.user.name} src={session.user.image} />
							</MenuButton>

							<MenuList w={256}>
								<MenuItem>
									<Flex align="center" gap={3}>
										<Avatar name={session.user.name} src={session.user.image} />

										<Text color="accent-1" noOfLines={1}>
											{session.user.name}
										</Text>
									</Flex>
								</MenuItem>

								<MenuDivider />

								<MenuItem icon={<FiLogOut size={16} />} onClick={() => signOut()}>
									Log out
								</MenuItem>

								<MenuDivider />

								<Text fontSize="xs" textAlign="center">
									alpha build 11022022
								</Text>
							</MenuList>
						</Menu>
					</Flex>
				) : (
					<Flex display={{ base: 'none', md: 'flex' }} align="center" gap={8}>
						<NextLink href="/" passHref>
							<Link as="span" active={router.pathname === '/' ? 1 : 0}>
								Home
							</Link>
						</NextLink>

						<NextLink href="/blogs" passHref>
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

						<Button colorScheme="brand" onClick={() => signIn('google')}>
							Sign in
						</Button>
					</Flex>
				)}

				{!session && <IconButton display={{ base: 'flex', md: 'none' }} variant="outline" color="accent-1" icon={<FiMenu size={16} />} onClick={onSidebarOpen} />}
			</Flex>
		</chakra.header>
	)
}

export default Header
