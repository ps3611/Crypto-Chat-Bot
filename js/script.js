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
    else if (Object.keys(coins).some(x => question.includes(x))) {
      let coin_array = Object.keys(coins);
      let index_array = [];
      for (let i = 0; i < coin_array.length; i++) {
        if(question.includes(coin_array[i])) index_array.push(i);
      }
      for (let i = 0; i < index_array.length; i++) {
        let answer = "The price of " + coin_array[index_array[i]] + " is " + coins[coin_array[index_array[i]]];
        setTimeout(addMessage,1000*(i+1),answer,"bot-text");
      }
    }
    else {
      setTimeout(addMessage,1000,"I don't know the answer to this question :(","bot-text");
      setTimeout(addMessage,2000,"Please ask me another one","bot-text");
    }
    document.getElementById("messagebox").value = '';
}
