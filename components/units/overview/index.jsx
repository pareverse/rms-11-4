import { useMutation, useQueryClient } from '@tanstack/react-query'
import api from 'instance'
import { Button, Divider, Flex, Text } from '@chakra-ui/react'
import Card from 'components/_card'
import Schedule from './schedule'
import MonthlyRent from './monthly-rent'
import Camc from './camc'
import Vat from './vat'
import WaterBill from './water-bill'
import Maintenance from './maintenance'

const Overview = ({ id, unit }) => {
	const queryClient = useQueryClient()

	let monthly_rent = Number(unit.monthly_rent)
	let camc = Number(unit.camc.amount)
	let value_added_tax = (Number(unit.monthly_rent) + Number(unit.camc.amount)) * (Number(unit.vat.percent) / 100)
	let water_bill = Number(unit.water_bill.amount)
	let maintenance = 0

	unit.maintenance.forEach((unit) => {
		maintenance += Number(unit.amount)
	})

	let total_amount_due = monthly_rent + camc + value_added_tax + water_bill + maintenance

	const addSoaMutation = useMutation((data) => api.create('/soa', data), {
		onSuccess: () => {
			queryClient.invalidateQueries('soa')
		}
	})

	const submitSoa = () => {
		addSoaMutation.mutate({
			id: unit._id,
			data: {
				unit: {
					id: unit._id
				},
				company: {
					id: unit.company.id
				},
				schedule: unit.schedule,
				monthly_rent: unit.monthly_rent,
				camc: unit.camc,
				vat: unit.vat,
				water_bill: unit.water_bill,
				maintenance: unit.maintenance,
				total_amount: total_amount_due.toString()
			}
		})
	}

	return (
		<Card>
			<Flex direction="column" gap={6}>
				<Flex justify="space-between" align="center" gap={6}>
					<Text fontSize="lg" fontWeight="semibold" color="accent-1">
						Overview
					</Text>

					<Button colorScheme="brand" onClick={submitSoa}>
						Submit
					</Button>
				</Flex>

				<Schedule id={id} unit={unit} />

				{unit.schedule.start_date && unit.schedule.due_date && (
					<>
						<MonthlyRent id={id} unit={unit} />
						<Camc id={id} unit={unit} />
						<Vat unit={unit} />
						<WaterBill unit={unit} />
						<Maintenance id={id} unit={unit} />

						<Divider />

						<Flex justify="space-between" align="center" gap={6}>
							<Text fontSize="xl" fontWeight="semibold" color="accent-1">
								Total Amount Due
							</Text>

							<Text fontSize="xl" fontWeight="semibold" color="accent-1">
								₱ {Number(total_amount_due).toLocaleString(undefined, { maximumFractionDigits: 2 })}
							</Text>
						</Flex>
					</>
				)}
			</Flex>
		</Card>
	)
}

export default Overview
