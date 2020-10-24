'use strict';

let userName = prompt('Enter your name:');
// eslint-disable-next-line no-undef
const socket = io();
// eslint-disable-next-line no-undef
const network = new brain.recurrent.LSTM();
var mydata = [
  {
    'text': 'how are you',
    'category': 'Good Mood (:',
  },
  {
    'text': 'happy',
    'category': 'Good Mood (:',
  },
  {
    'text': 'smile',
    'category': 'Good Mood (:',
  },
  {
    'text': 'party',
    'category': 'Good Mood (:',
  },
  {
    'text': 'fun funny',
    'category': 'Good Mood (:',
  },
  {
    'text': 'thank you',
    'category': 'Good Mood (:',
  },
  {
    'text': 'thanks nice pretty pretty thanx thnnx ',
    'category': 'Good Mood (:',
  },
  {
    'text': 'good job good work',
    'category': 'Good Mood (:',
  },
  {
    'text': 'good luck',
    'category': 'Good Mood (:',
  },
  {
    'text': ':)',
    'category': 'Good Mood (:',
  },
  {
    'text': ':P',
    'category': 'Good Mood (:',
  },
  {
    'text': 'sad',
    'category': 'angry Mood',
  },
  {
    'text': 'late',
    'category': 'angry Mood',
  },
  {
    'text': 'angry',
    'category': 'angry Mood',
  },
  {
    'text': 'angry',
    'category': 'angry Mood',
  },
  {
    'text': 'angry',
    'category': 'angry Mood',
  },
  {
    'text': 'angry',
    'category': 'angry Mood',
  },
  {
    'text': 'work hard',
    'category': 'angry Mood',
  },
  {
    'text': 'over time',
    'category': 'angry Mood',
  },
  {
    'text': 'no sleep',
    'category': 'angry Mood',
  },
  {
    'text': 'finish your work',
    'category': 'angry Mood',
  },
  {
    'text': 'hate',
    'category': 'angry Mood',
  },
  {
    'text': 'no brack',
    'category': 'angry Mood',
  },
  {
    'text': 'will crash',
    'category': 'angry Mood',
  },
  {
    'text': 'kill him you',
    'category': 'angry Mood',
  },
  {
    'text': 'tired',
    'category': 'angry Mood',
  },
  {
    'text': 'feel pain',
    'category': 'angry Mood',
  },
  {
    'text': 'my wife',
    'category': 'angry Mood',
  },
  {
    'text': ':(',
    'category': 'angry Mood',
  },
  {
    'text': 'how are you',
    'category': 'Good Mood (:',
  },
  {
    'text': 'how',
    'category': 'Good Mood (:',
  },
  {
    'text': 'how are you',
    'category': 'Good Mood (:',
  },
  {
    'text': 'happy',
    'category': 'Good Mood (:',
  },
  {
    'text': 'smile',
    'category': 'Good Mood (:',
  },
  {
    'text': 'party',
    'category': 'Good Mood (:',
  },
  {
    'text': 'fun funny',
    'category': 'Good Mood (:',
  },
  {
    'text': 'thank you',
    'category': 'Good Mood (:',
  },
  {
    'text': 'thanks nice pretty pretty thanx thnnx ',
    'category': 'Good Mood (:',
  },
  {
    'text': 'good job good work',
    'category': 'Good Mood (:',
  },
  {
    'text': 'abdallah',
    'category': 'Good Mood (:',
  },
  {
    'text': 'amar',
    'category': 'Good Mood (:',
  },
  {
    'text': 'raghad',
    'category': 'Good Mood (:',
  },
  {
    'text': 'ahlam',
    'category': 'Good Mood (:',
  },
  {
    'text': 'good luck',
    'category': 'Good Mood (:',
  },
  {
    'text': ':)',
    'category': 'Good Mood (:',
  },
  {
    'text': ':P',
    'category': 'Good Mood (:',
  },
  {
    'text': 'thank',
    'category': 'Good Mood (:',
  },
  {
    'text': 'Thank',
    'category': 'Good Mood (:',
  },
  {
    'text': 'hello',
    'category': 'Good Mood (:',
  },
  {
    'text': 'hi',
    'category': 'Good Mood (:',
  },
  {
    'text': 'hi guys',
    'category': 'Good Mood (:',
  },
  {
    'text': 'hello guys',
    'category': 'Good Mood (:',
  },
];
console.log(mydata);
const trainingData = mydata.map(item => ({
  input: item.text,
  output: item.category,
}));
network.train(trainingData, {
  iterations: 50,
});
socket.on('welcome', paylaod => {
  const messsageArea  = document.createElement('p');
  messsageArea.innerHTML = paylaod;
  document.getElementById('chat-output').append(messsageArea);
});
socket.on('message', payload => {
  const messsageArea  = document.createElement('p');
  messsageArea.innerHTML = `${payload.userName}: ${payload.message}`;
  document.getElementById('chat-output').append(messsageArea);
  if (userName !== 'admin' && messsageArea.innerHTML.split(':')[0] ==  'admin'){
    try{ 
      let feel = network.run(payload.message);
      console.log(feel);
      if (feel!= 'Good Mood (:') {
        alert('The Admin is activated angry Mood');
      } 
      else
      {
        alert('The Admin is activated Good Mood (:');
      }
    }catch(error){
      alert('The Admin is activated Good Mood (:');
    }
    console.log(payload.message);
  }
  document.getElementById('msg').value = '';
});

let chatForm = document.getElementById('chat-form');


chatForm.addEventListener('submit', (event) => {
  event.preventDefault();  
  const message = event.target.msg.value;
  let payload = {userName , message};
  socket.emit('newmessage', payload); 
});