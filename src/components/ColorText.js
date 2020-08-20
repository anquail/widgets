import React from 'react';

const ColorText = ({ selected }) => {
	return (
		<div style={{ color: `${selected.label}` }}>This text is {selected.label}!</div>
	);
};

export default ColorText;