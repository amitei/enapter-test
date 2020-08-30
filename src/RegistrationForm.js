import React from 'react';
import useForm from './useForm';

function RegistrationForm() {
	const { register, validateForm, getValue, errors } = useForm();

	const handleSubmit = (data) => {
		console.log(JSON.stringify(data));
	};

	const registerUsername = register({
		isRequired: true,
		minLength: 3,
		patterns: [
			{
				regex: /^[a-zA-Z]+$/,
				message: 'Only latin characters are allowed',
			},
			{
				regex: /^[A-Z]/,
				message: 'Username must start with a capital letter',
			},
		],
	});

	const registerEmail = register({
		isRequired: true,
		patterns: [
			{
				regex: /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/,
				message: 'Email is not valid',
			},
		],
	});

	const registerPhone = register({
		isRequired: true,
		patterns: [
			{
				regex: /^[\d-()]+$/,
				message:
					'Phone number can only include digits, hyphens and parantheses',
			},
		],
	});

	const registerPassword = register({
		isRequired: true,
		minLength: 6,
		patterns: [
			{
				regex: /\d/,
				message: 'Password must include digits',
			},
			{
				regex: /[a-z]/,
				message: 'Password must include lower case letter',
			},
			{
				regex: /[A-Z]/,
				message: 'Password must include upper case letter',
			},
			{
				regex: /^[a-zA-Z\d!@#$%^&*(){}<>~]+$/,
				message: 'Password includes unallowed characters',
			},
		],
	});

	const registerConfirmPassword = register({
		isRequired: true,
		validate: (value) => {
			if (value !== getValue('password')) {
				return "Passwords don't match";
			}
		},
	});

	console.log('RENDER');

	return (
		<form
			className="registration-form"
			onSubmit={validateForm(handleSubmit)}
			noValidate
		>
			<div className="input-group">
				<label htmlFor="username">Username</label>
				<input
					name="username"
					className={errors.username ? 'error-input' : null}
					ref={registerUsername}
				/>
				<div className="error-message">{errors.username}</div>
			</div>

			<div className="input-group">
				<label htmlFor="email">Email</label>
				<input
					name="email"
					type="email"
					className={errors.email ? 'error-input' : null}
					ref={registerEmail}
				/>
				<div className="error-message">{errors.email}</div>
			</div>

			<div className="input-group">
				<label htmlFor="phone">Phone number</label>
				<input
					name="phone"
					type="tel"
					className={errors.phone ? 'error-input' : null}
					ref={registerPhone}
				/>
				<div className="error-message">{errors.phone}</div>
			</div>

			<div className="input-group">
				<label htmlFor="password">Password</label>
				<input
					name="password"
					type="password"
					className={errors.password ? 'error-input' : null}
					ref={registerPassword}
				/>
				<div className="error-message">{errors.password}</div>
			</div>

			<div className="input-group">
				<label htmlFor="confirmPassword">Confirm Password</label>
				<input
					name="confirmPassword"
					type="password"
					className={errors.confirmPassword ? 'error-input' : null}
					ref={registerConfirmPassword}
				/>
				<div className="error-message">{errors.confirmPassword}</div>
			</div>

			<button type="submit">Sign Up</button>
		</form>
	);
}

export default RegistrationForm;
