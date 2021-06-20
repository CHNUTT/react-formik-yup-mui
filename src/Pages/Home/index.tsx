import { Card, CardContent, TextField } from '@material-ui/core';
import { Field, Form, Formik } from 'formik';
import { CheckboxWithLabel } from 'formik-material-ui';
import { FC } from 'react';

const HomePage: FC = () => (
	<Card>
		<CardContent>
			<Formik
				initialValues={{
					firstName: '',
					lastName: '',
					millionaire: '',
					money: 0,
					description: '',
				}}
				onSubmit={() => {}}
			>
				<Form>
					<Field name='firstName' component={TextField} label='First Name' />
					<Field name='lastName' component={TextField} label='Last Name' />
					<Field
						name='millionaire'
						type='checkbox'
						component={CheckboxWithLabel}
						Label={{ label: 'I am checkbox' }}
					/>
					<Field
						name='money'
						type='number'
						component={TextField}
						label='All the money I have'
					/>
					<Field name='description' component={TextField} label='Description' />
				</Form>
			</Formik>
		</CardContent>
	</Card>
);

export default HomePage;
