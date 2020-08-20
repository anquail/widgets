import React from 'react';

const ColorText = ({ selected }) => {
	return (
		<div className="ui container" style={{ color: `${selected.label}`, textAlign: 'center', marginTop: '30px' }}>
			<h1>This text is {selected.label}!</h1>
		</div>
	);
};

export default ColorText;