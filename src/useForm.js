import { useState, useRef } from 'react';

const useForm = () => {
	const inputsData = useRef({});
	const [errors, setErrors] = useState({});

	const register = (validationSchema) => {
		return (ref) => {
			if (ref && !inputsData.current[ref.name]) {
				inputsData.current[ref.name] = {
					ref,
					validationSchema,
				};
				ref.addEventListener('blur', (event) =>
					validateInput(event.target.name)
				);
			}
		};
	};

	const getValue = (name) => {
		return inputsData.current[name].ref.value;
	};

	const validateInput = (name) => {
		const message = calculateInputError(name);
		if (message) {
			setErrors((prevErrors) => ({ ...prevErrors, [name]: message }));
		}
	};

	const calculateInputError = (name) => {
		const { ref, validationSchema } = inputsData.current[name];
		const { isRequired, minLength, patterns, validate } = validationSchema;

		if (isRequired && ref.value === '') {
			return 'This field is required';
		}

		if (minLength && ref.value.length < minLength) {
			return `This field must be at least ${minLength} characters long`;
		}

		if (patterns) {
			for (const pattern of patterns) {
				if (!pattern.regex.test(ref.value)) {
					return pattern.message;
				}
			}
		}

		if (validate) {
			const message = validate(ref.value);
			if (message) return message;
		}

		return '';
	};

	const validateForm = (handleSubmit) => (event) => {
		event.preventDefault();

		const newErrors = Object.keys(inputsData.current).reduce((acc, name) => {
			acc[name] = calculateInputError(name);
			return acc;
		}, {});
		setErrors(newErrors);

		const formIsValid = Object.values(newErrors).every((error) => error === '');
		if (formIsValid) {
			const data = Object.values(inputsData.current).reduce((acc, { ref }) => {
				acc[ref.name] = ref.value;
				return acc;
			}, {});

			handleSubmit(data);
		}
	};

	return { errors, register, getValue, validateForm };
};

export default useForm;
