import React from 'react';
import deer from '../icons/deer-black.svg';
import './Logo.css';

interface Props {
	variant?: 'large' | 'small';
}

export const Logo = (props: Props) => (
	<div className="Logo">
		<img src={deer} alt="logo" />
		<h1>agilicious</h1>
		<p>a judicious and delicious estimation game</p>
	</div>
)

export default Logo;
