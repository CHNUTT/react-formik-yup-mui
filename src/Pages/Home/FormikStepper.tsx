import { Button, Step, StepLabel, Stepper } from '@material-ui/core';
import { Form, Formik, FormikConfig, FormikValues } from 'formik';
import { Children, ReactElement, useState } from 'react';
import { useStyle } from './styles';
import { FormikStepProps } from './FormikStep';

const FormikStepper = ({ children, ...props }: FormikConfig<FormikValues>) => {
	const childrenArray = Children.toArray(
		children
	) as ReactElement<FormikStepProps>[];
	const [step, setStep] = useState(0);
	const currentChild = childrenArray[step] as ReactElement<FormikStepProps>;
	const classes = useStyle();

	// console.log('children', currentChild.props.validationSchema);
	// console.log('childrenArray', childrenArray.length);

	const isLastStep = () => step === childrenArray.length - 1;

	return (
		<Formik
			{...props}
			validationSchema={currentChild.props.validationSchema}
			onSubmit={async (values, helpers) => {
				if (isLastStep()) {
					await props.onSubmit(values, helpers);
				} else {
					setStep(s => s + 1);
				}
			}}
		>
			<Form autoComplete='off' className={classes.form}>
				<Stepper alternativeLabel activeStep={step}>
					{childrenArray.map(child => (
						<Step key={child.props.label}>
							<StepLabel>{child.props.label}</StepLabel>
						</Step>
					))}
				</Stepper>
				{currentChild}
				<div>
					{step > 0 && (
						<Button
							variant='contained'
							color='primary'
							onClick={() => setStep(s => s - 1)}
						>
							Back
						</Button>
					)}
					<Button variant='contained' color='primary' type='submit'>
						{isLastStep() ? 'Submit' : 'Next'}
					</Button>
				</div>
			</Form>
		</Formik>
	);
};

export default FormikStepper;
