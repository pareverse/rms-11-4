import { useRouter } from 'next/router'
import { useQuery } from '@tanstack/react-query'
import api from 'instance'
import { Container, Grid, GridItem, Tab, TabList, TabPanel, TabPanels, Tabs } from '@chakra-ui/react'
import Profile from 'components/units/profile'
import Details from 'components/units/details'
import Overview from 'components/units/overview'
import History from 'components/units/history'
import Card from 'components/_card'

const Unit = () => {
	const router = useRouter()
	const { id } = router.query

	const { data: unit, isFetched: isUnitFetched } = useQuery(['unit', id], () => api.get('/units', id))

	if (!isUnitFetched) return null

	return (
		<Container>
			<Grid templateColumns={{ base: 'full', lg: '300px 1fr' }} alignItems="start" gap={6}>
				<GridItem display="grid" gridTemplateColumns={{ base: '1fr', md: '1fr 1fr', lg: '1fr' }} gap={6}>
					<Profile unit={unit} />
					<Details unit={unit} />
				</GridItem>

				<GridItem>
					<Tabs isFitted w={{ base: 'calc(100vw - 65px)', lg: 'auto' }} maxW={1280}>
						<TabList>
							<Tab>Overview</Tab>
							<Tab>History</Tab>
							<Tab>Settings</Tab>
						</TabList>

						<TabPanels>
							<TabPanel>
								<Overview id={id} unit={unit} />
							</TabPanel>

							<TabPanel>
								<History />
							</TabPanel>

							<TabPanel>
								<Card />
							</TabPanel>
						</TabPanels>
					</Tabs>
				</GridItem>
			</Grid>
		</Container>
	)
}

Unit.authentication = {
	authorized: 'Admin'
}

export default Unit
