import React, { useState, useEffect, useRef } from 'react';

const Accordion = ({ items }) => {
	const [activeIndex, setActiveIndex] = useState(null);
	const [open, setOpen] = useState(true);
	const ref = useRef();

	useEffect(() => {
		const onBodyClick = event => {
			setOpen(false);
		};

		document.body.addEventListener('click', onBodyClick);

		return () => {
			document.body.removeEventListener('click', onBodyClick);
		};
	}, []);

	const onTitleClick = (index) => {
		setActiveIndex(index);
		setOpen(true);
	};

	const renderedItems = items.map((item, index) => {
		const active = (index === activeIndex && open === true) ? 'active' : '';

		return (
			<React.Fragment key={item.title}>
			<div 
				className={`title ${active}`}
				onClick={() => onTitleClick(index)}
			>
				<i className="dropdown icon"></i>
				{item.title}
			</div>
			<div className={`content ${active}`}>
				<p>{item.content}</p>
			</div>
		</React.Fragment>
		);
			});

	return (
		<div ref={ref}>
			<div className="ui styled accordion">
				{renderedItems}
			</div>
		</div>
	);
};

export default Accordion;