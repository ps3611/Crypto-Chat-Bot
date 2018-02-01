
const fetch = require('node-fetch');

function Coin(symbol, value){
   this.symbol = symbol;
   this.value = value;
}

Coin.prototype.fetchData = function(){
		let url = 'https://min-api.cryptocompare.com/data/histoday?fsym=' + this.symbol + '&tsym=USD&limit=50';
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
					this.value = jsonResponse
				}
			);
};

var eth = new Coin('ETH', 0);
eth.fetchData()
console.log(eth.value);

let coin = {
	data:0,
	symbol:'ETH',
	fetchData: function(){
		let url = 'https://min-api.cryptocompare.com/data/histoday?fsym=' + this.symbol + '&tsym=USD&limit=50';
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
					this.data = jsonResponse
				}
			);
	}
}
coin.fetchData()
console.log(coin.data)


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
				//console.log(jsonResponse);
			}
		);
}
