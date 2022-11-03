import { useRouter } from 'next/router'
import { useQuery } from '@tanstack/react-query'
import api from 'instance'
import { Container, Grid, GridItem, Tab, TabList, TabPanel, TabPanels, Tabs } from '@chakra-ui/react'
import Profile from 'components/companies/profile'
import Tenants from 'components/companies/tenants'
import SOA from 'components/companies/soa'
import Payments from 'components/companies/payments'
import Card from 'components/_card'

const Company = () => {
	const router = useRouter()
	const { id } = router.query

	const { data: company, isFetched: isCompanyFetched } = useQuery(['company', id], () => api.get('/companies', id))

	if (!isCompanyFetched) return null

	return (
		<Container>
			<Grid templateColumns={{ base: 'full', lg: '300px 1fr' }} alignItems="start" gap={6}>
				<GridItem display="grid" gridTemplateColumns={{ base: '1fr', md: '1fr 1fr', lg: '1fr' }} gap={6}>
					<Profile company={company} />
					<Tenants id={id} company={company} />
				</GridItem>

				<GridItem>
					<Tabs isFitted w={{ base: 'calc(100vw - 65px)', lg: 'auto' }} maxW={1280}>
						<TabList>
							<Tab>Overview</Tab>
							<Tab>Settings</Tab>
						</TabList>

						<TabPanels>
							<TabPanel display="grid" gap={6}>
								<SOA />
								<Payments />
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

Company.authentication = {
	authorized: 'Admin'
}

export default Company
