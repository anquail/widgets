import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Search = () => {
	const [term, setTerm] = useState('');
	const [debouncedTerm, setDebouncedTerm] = useState(term);
	const [results, setResults] = useState([]);

	useEffect(() => {
		const timerId = setTimeout(() => {
			setDebouncedTerm(term);
		}, 500);

		return () => {
			clearTimeout(timerId);
		};
	}, [term]);

	useEffect(() => {
		const search = async () => {
			const { data } = await axios.get('https://en.wikipedia.org/w/api.php', {
				params: {
					action: 'query',
					list: 'search',
					origin: '*',
					format: 'json',
					srsearch: debouncedTerm
				}
			});

			setResults(data.query.search);
		};

		if(debouncedTerm) {
			search();
		}
		

	}, [debouncedTerm]);
		



		//USE THIS CODE IF I HAVE A DEFAULT TERM (MAKES THE FIRST SEARCH HAPPEN IMMEDIATELY UPON FIRST RENDERING THE PAGE)
		// if(term && !results.length) {
		// 	search();
		// } else {
		// 	const timeoutId = setTimeout(() => {
		// 		if (term) {
		// 			search();
		// 		}
		// 	}, 500);

		// 	return () => {
		// 		clearTimeout(timeoutId);
		// 	};
		// }
	

	const renderedResults = results.map(result => {
		return (
			<div key={result.pageid} className="item">
				<div className="right floated content">
					<a 
						className="ui button"
						href={`https://en.wikipedia.org?curid=${result.pageid}`}
					>
						Go
					</a>
				</div>
				<div className="content">
					<div className="header">{result.title}</div>
					<span dangerouslySetInnerHTML={{ __html: result.snippet }}></span>
				</div>
			</div>
		);
	})

	return (
		<div className="ui container">
			<div className="ui form">
				<div className="field">
					<label>Search Wikipedia</label>
					<input
						value={term}
						onChange={e => setTerm(e.target.value)} 
						className="input" 
					/>
				</div>
			</div>
				<div className="ui celled list">
					{renderedResults}
				</div>
		</div>
	);
};

export default Search;