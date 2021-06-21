import { FC } from 'react';
import { Button, Card, CardContent } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { Field, Form, Formik } from 'formik';
import { CheckboxWithLabel, TextField } from 'formik-material-ui';
import * as Yup from 'yup';
import { FIELD_NAMES } from './constant';

const useStyle = makeStyles({
	form: {
		display: 'flex',
		justifyContent: 'center',
	},
});

const HomePage: FC = () => {
	const classes = useStyle();

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
				<Formik
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
					<Form autoComplete='off' className={classes.form}>
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
						<Field
							name={MONEY.name}
							type='number'
							component={TextField}
							label={MONEY.label}
						/>
						<Field
							name={DESCRIPTION.name}
							component={TextField}
							label={DESCRIPTION.label}
						/>
						<Button variant='outlined' type='submit'>
							Submit
						</Button>
					</Form>
				</Formik>
			</CardContent>
		</Card>
	);
};

export default HomePage;
