// Grabe DOM element from HTML
const word = document.getElementById('word');
const wrongLetters = document.getElementById('wrong-letters');
const popup = document.getElementById('popup-container');
const restartButton = document.getElementById('restart');
const notification = document.getElementById('slider-container');
const message = document.getElementById('win-lose');

const hangmanParts = document.querySelectorAll('.hangman-part');

// An array of words to select from 
const wordsPool = ['JavaScript', 'Computer', 'Hangman', 'Facebook', 'Youtube'];

// Selection a word at random from the pool
let selectedWord = wordsPool[Math.floor(Math.random() * wordsPool.length)];

// Arrays to classify the input of the user
const correctLetters = [];
const incorrectLetters = ['a'];

// Function to display the word on the screen
function displaySelectedWord(){
   word.innerHTML = `
   ${selectedWord
     .split('')
     .map(
         letter => `
           <span class="letter">
           ${correctLetters.includes(letter) ? letter : ''}
           </span>
         `
     )
     .join('')
}
   
   `;
   const wordText = word.innerText.replace(/\n/g, '');
    if( wordText == selectedWord){
      message.innerText = 'You Won!';
      popup.style.display = 'flex';
    }
};

// Function to display the sliding notification
function showNotification(){
  notification.classList.add('show');

  setTimeout(() => {notification.classList.remove('show');}, 3000);
}

// Function to update Incorrect Letters
function  updateWrongLetter(){
  // Update the display for wronge letters
  wrongLetters.innerHTML = `
  ${incorrectLetters.length > 0 ? `<p>Wrong</p>`: ''}
  ${incorrectLetters.map( letter => `<span>${letter}</span>`)}
  `;

  // Update the display for hangman part
  hangmanParts.forEach( (part, index) => {
    const error = incorrectLetters.length;

    if( index < error ){
      part.style.display = 'block';
    } else{
      part.style.display = 'none';
    }
  } );

  // show popup if lost
  if(incorrectLetters.length === hangmanParts.length){
    message.innerText = 'You lsot!';
    popup.style.display = 'flex';
  }
}

// Event Handler
// 1. Event Handler of keyboard Button press
window.addEventListener('keydown', e => {
if( e.keyCode >= 65 && e.keyCode <= 90 ){
  const letter = e.key;
  
  if(selectedWord.includes(letter)){
    if(!correctLetters.includes(letter)){
      correctLetters.push(letter);
      displaySelectedWord();
    }
    else{
      showNotification();
    }
  }
  else{
    if(!incorrectLetters.includes(letter)){
      incorrectLetters.push(letter);
      updateWrongLetter();
    } else{
      showNotification();
    }
  }
}
});

// 2. Event listner for restart button
restartButton.addEventListener('click', () => {
  // empty arrays
  correctLetters.splice(0);
  incorrectLetters.splice(0);

  displaySelectedWord();
  // Get a new selected word from the pool
  updateWrongLetter();
  
  //Hide the popup
  popup.style.display = 'none';

})

displaySelectedWord();
