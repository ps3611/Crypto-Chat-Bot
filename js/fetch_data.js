const fetch = require('node-fetch');

function fetchData(crypto_symbol){
	let url = 'https://min-api.cryptocompare.com/data/histoday?fsym=' + crypto_symbol + '&tsym=USD&limit=50';
	fetch(url)
		.then(
			response => {
				if (response.ok) return response.json();
				throw new Error('Request failed!');
			},
			networkError => console.log(networkError.message)
		)
		.then(
			jsonResponse => {
				console.log(jsonResponse);
        return jsonResponse;
			}
		);
}

console.log(fetchData('ETH'));
