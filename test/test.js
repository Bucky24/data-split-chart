import React from 'react';
import { render } from 'react-dom';
import Chart from '../main.js';

const data = {
	id: 1,
	name: 'All',
	color: '#87B2D6',
	children: [
		{
			id: 2,
			name: 'Cat1',
			color: "#f00f0f",
			amount: 200,
			children: [
				{
					id: 4,
					name: 'Cat1_1',
					color: '#0f0fff',
					amount: 100
				},
				{
					id: 5,
					name: 'Cat1_2',
					color: '#0f0fff',
					amount: 10
				}
			]
		},
		{
			id: 3,
			name: 'Cat2',
			color: "#f00f0f",
			amount: 20
		}
	],
	amount: 100
};

render(
	<Chart data={data}/>,
	document.getElementById('root')
);

