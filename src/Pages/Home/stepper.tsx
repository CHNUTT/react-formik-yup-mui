import { Button } from '@material-ui/core';
import { Form, Formik, FormikConfig, FormikValues } from 'formik';
import { Children, useState } from 'react';
import { useStyle } from './styles';

const FormikStepper = ({ children, ...props }: FormikConfig<FormikValues>) => {
	const childrenArray = Children.toArray(children);
	const [step, setStep] = useState(0);
	const currentChild = childrenArray[step];
	const classes = useStyle();

	const isLastStep = () => step === childrenArray.length - 1;

	return (
		<Formik
			{...props}
			onSubmit={async (values, helpers) => {
				if (isLastStep()) {
					await props.onSubmit(values, helpers);
				} else {
					setStep(s => s + 1);
				}
			}}
		>
			<Form autoComplete='off' className={classes.form}>
				{currentChild}
				{step > 0 && <Button onClick={() => setStep(s => s - 1)}>Back</Button>}
				<Button type='submit'>Next</Button>
			</Form>
		</Formik>
	);
};

export default FormikStepper;
