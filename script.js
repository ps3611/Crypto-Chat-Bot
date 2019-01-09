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
  setTimeout(addMessage,2000,"My name is Crypto-Bot.","bot-text");
  setTimeout(addMessage,3000,"Ask me the price of any cryptocurrency!","bot-text");
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
    fetchSymbol(question);
  }
  document.getElementById("messagebox").value = '';
}

function fetchSymbol(question){
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
      let all_symbols = Object.keys(jsonResponse['Data']);
      let question_array = question.slice(0,-1).split(" ").map(el=>el.toUpperCase());
      let symbols = [];
      question_array.forEach(word => {if(all_symbols.includes(word)) symbols.push(word)});
      symbols.forEach(symbol => {
        setTimeout(fetchPrice,2000,symbol);
      }
    );
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
      let answer = "The price of " + symbol + " is $" + jsonResponse['USD'];
      addMessage(answer,"bot-text");
    }
  );
}
