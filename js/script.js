let coins = {'BTC':'$11000','ETH':'$900','Bitcoin':'$11000','Ethereum':'$900',
            'bitcoin':'$11000','ethereum':'$900','ether':'$900'}

function addMessage(message,id) {
  let text = document.createTextNode(message);
  let para = document.createElement("P");
  para.id = id;
  para.appendChild(text);
  document.getElementById("chatbar").appendChild(para);
  updateScroll();
}

function updateScroll(){
    let element = document.getElementById("chatbar");
    element.scrollTop = element.scrollHeight;
}

function initialBotMessage() {
  setTimeout(addMessage,1000,"Hi there","bot-text");
  setTimeout(addMessage,2000,"My name is Pedro","bot-text");
  setTimeout(addMessage,3000,"Ask me any crypto related questions!","bot-text");
}

function addUserMessage() {
    let message = document.getElementsByTagName("input")[0].value;
    addMessage(message,"user-text");
}

function addBotAnswer() {
    let question = document.getElementsByTagName("input")[0].value;
    if(question[question.length-1] !== '?'){
      setTimeout(addMessage,1000,'This is not a question!',"bot-text");
      setTimeout(addMessage,2000,'Please ask me a question',"bot-text");
    }
    else {
      fetchSymbol()
    }
    document.getElementById("messagebox").value = '';
}

function fetchSymbol(){
  fetch('https://min-api.cryptocompare.com/data/all/coinlist')
    .then(
      response => {
        if (response.ok) return response.json();
        throw new Error('Request failed!');
      },
      networkError => console.log(networkError.message)
    )
    .then(
      jsonResponse => {
        let symbol = Object.keys(jsonResponse['Data'])[40]
        fetchPrice(symbol);
      }
    );
}

function fetchPrice(symbol) {
  fetch('https://min-api.cryptocompare.com/data/price?fsym=' + symbol + '&tsyms=USD')
    .then(
      response => {
        if (response.ok) return response.json();
        throw new Error('Request failed!');
      },
      networkError => console.log(networkError.message)
    )
    .then(
      jsonResponse => {
        let answer = "The price of " + symbol + " is " + jsonResponse['USD'];
        setTimeout(addMessage,1000,answer,"bot-text");
      }
    );
}
