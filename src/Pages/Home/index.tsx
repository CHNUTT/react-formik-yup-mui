import { FC } from 'react';
import { Box, Card, CardContent } from '@material-ui/core';
import { Field } from 'formik';
import { CheckboxWithLabel, TextField } from 'formik-material-ui';
import * as Yup from 'yup';
import FormikStepper from './FormikStepper';
import { FormikStep } from './FormikStep';
import { FIELD_NAMES } from './constant';

const sleep = (time: number) => new Promise(acc => setTimeout(acc, time));

const HomePage: FC = () => {
	const { FIRST_NAME, LAST_NAME, MONEY, MILLIONAIRE, DESCRIPTION } =
		FIELD_NAMES;

	const InforSchema = Yup.object().shape({
		[FIRST_NAME.name]: Yup.string().required().min(2),
	});

	const MoneySchema = Yup.object().shape({
		[MONEY.name]: Yup.mixed().when(MILLIONAIRE.name, {
			is: true,
			then: Yup.number().min(
				1_000_000,
				'Because you said you are a millionaire you need to have 1 million'
			),
			otherwise: Yup.number().required(),
		}),
	});

	return (
		<Card>
			<CardContent>
				<FormikStepper
					initialValues={{
						[FIRST_NAME.name]: '',
						[LAST_NAME.name]: '',
						[MILLIONAIRE.name]: false,
						[MONEY.name]: 0,
						[DESCRIPTION.name]: '',
					}}
					onSubmit={async values => {
						await sleep(3000);
						console.log('values', values);
					}}
				>
					<FormikStep label='Personal Data' validationSchema={InforSchema}>
						<Box paddingBottom={2}>
							<Field
								fullWidth
								name={FIRST_NAME.name}
								component={TextField}
								label={FIRST_NAME.label}
							/>
						</Box>
						<Box paddingBottom={2}>
							<Field
								fullWidth
								name={LAST_NAME.name}
								component={TextField}
								label={LAST_NAME.label}
							/>
						</Box>
						<Box paddingBottom={2}>
							<Field
								name={MILLIONAIRE.name}
								type='checkbox'
								component={CheckboxWithLabel}
								Label={{ label: MILLIONAIRE.label }}
							/>
						</Box>
					</FormikStep>
					<FormikStep label='Bank Accounts' validationSchema={MoneySchema}>
						<Box paddingBottom={2}>
							<Field
								fullWidth
								name={MONEY.name}
								type='number'
								component={TextField}
								label={MONEY.label}
							/>
						</Box>
					</FormikStep>
					<FormikStep label='More Info'>
						<Box paddingBottom={2}>
							<Field
								fullWidth
								name={DESCRIPTION.name}
								component={TextField}
								label={DESCRIPTION.label}
							/>
						</Box>
					</FormikStep>
				</FormikStepper>
			</CardContent>
		</Card>
	);
};

export default HomePage;
