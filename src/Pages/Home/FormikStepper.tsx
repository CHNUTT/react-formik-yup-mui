import {
	Button,
	CircularProgress,
	Grid,
	Step,
	StepLabel,
	Stepper,
} from '@material-ui/core';
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
	const [completed, setCompleted] = useState(false);
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
					setCompleted(true);
				} else {
					setStep(s => s + 1);
				}
			}}
		>
			{({ isSubmitting }) => (
				<Form autoComplete='off' className={classes.form}>
					<Stepper alternativeLabel activeStep={step}>
						{childrenArray.map((child, index) => (
							<Step
								key={child.props.label}
								completed={step > index || completed}
							>
								<StepLabel>{child.props.label}</StepLabel>
							</Step>
						))}
					</Stepper>
					{currentChild}
					<div>
						<Grid container spacing={2}>
							{step > 0 && (
								<Grid item>
									<Button
										disabled={isSubmitting}
										variant='contained'
										color='primary'
										onClick={() => setStep(s => s - 1)}
									>
										Back
									</Button>
								</Grid>
							)}
							<Grid item>
								<Button
									startIcon={isSubmitting && <CircularProgress size='1rem' />}
									disabled={isSubmitting}
									variant='contained'
									color='primary'
									type='submit'
								>
									{isSubmitting
										? 'Submitting'
										: isLastStep()
										? 'Submit'
										: 'Next'}
								</Button>
							</Grid>
						</Grid>
					</div>
				</Form>
			)}
		</Formik>
	);
};

export default FormikStepper;
