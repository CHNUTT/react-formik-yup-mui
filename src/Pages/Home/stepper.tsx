import { Form, Formik, FormikConfig, FormikValues } from 'formik';
import { Children, useState } from 'react';
import { useStyle } from './styles';

const FormikStepper = ({ children, ...props }: FormikConfig<FormikValues>) => {
	const childrenArray = Children.toArray(children);
	const [step, setStep] = useState(0);
	const currentChild = childrenArray[step];
	const classes = useStyle();

	return (
		<Formik {...props}>
			<Form autoComplete='off' className={classes.form}>
				{currentChild}
			</Form>
		</Formik>
	);
};

export default FormikStepper;
