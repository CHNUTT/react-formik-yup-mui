import { FC } from 'react';
import { Button, Card, CardContent } from '@material-ui/core';
import { Field } from 'formik';
import { CheckboxWithLabel, TextField } from 'formik-material-ui';
import * as Yup from 'yup';
import FormikStepper from './stepper';
import { FIELD_NAMES } from './constant';

const HomePage: FC = () => {
	const { FIRST_NAME, LAST_NAME, MONEY, MILLIONAIRE, DESCRIPTION } =
		FIELD_NAMES;

	const BankSchema = Yup.object().shape({
		money: Yup.mixed().when(MILLIONAIRE.name, {
			is: true,
			then: Yup.number().min(
				1_000_000,
				'Because you said you are a millionaire you need to have 1 million'
			),
			otherwise: Yup.number().required(),
		}),
		firstName: Yup.string().min(3, 'Name'),
	});

	return (
		<Card>
			<CardContent>
				<FormikStepper
					validationSchema={BankSchema}
					initialValues={{
						[FIRST_NAME.name]: '',
						[LAST_NAME.name]: '',
						[MILLIONAIRE.name]: false,
						[MONEY.name]: 0,
						[DESCRIPTION.name]: '',
					}}
					onSubmit={values => {
						console.log(values);
					}}
				>
					<div>
						<Field
							name='{FIRST_NAME.name}'
							component={TextField}
							label={FIRST_NAME.label}
						/>
						<Field
							name={LAST_NAME.name}
							component={TextField}
							label={LAST_NAME.label}
						/>
						<Field
							name={MILLIONAIRE.name}
							type='checkbox'
							component={CheckboxWithLabel}
							Label={{ label: MILLIONAIRE.label }}
						/>
					</div>
					<div>
						<Field
							name={MONEY.name}
							type='number'
							component={TextField}
							label={MONEY.label}
						/>
					</div>
					<div>
						<Field
							name={DESCRIPTION.name}
							component={TextField}
							label={DESCRIPTION.label}
						/>
					</div>

					<Button variant='outlined' type='submit'>
						Submit
					</Button>
				</FormikStepper>
			</CardContent>
		</Card>
	);
};

export default HomePage;
