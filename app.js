/* 
GAME FUNCTION:
- Player must guess a number between a min and a max 
- Player gets a certain amount of guesses
- Notify player of guesses remaining
- Notify player of the correct answer if they loose
- Let player choose to play again
*/

//Game values
let min = 1,
    max = 10,
    winningNum = getRandomNum(min, max),
    guessesLeft = 3;

//UI Elements
const game = document.querySelector('#game'),
      minNum = document.querySelector('.min-num'),
      maxNum = document.querySelector('.max-num'),
      guessBtn = document.querySelector('#guess-btn'),
      guessInput = document.querySelector('#guess-input'),
      message = document.querySelector('.message');

//Assign UI min and max
minNum.textContent = min;
maxNum.textContent = max;

//Play again event listener
game.addEventListener('mousedown', function(e){
  if(e.target.className === 'play-again'){
    window.location.reload();
  }
})

//Listen for guess
guessBtn.addEventListener('click', function(){
  let guess = parseInt(guessInput.value);

  //Validate
  if(isNaN(guess) || guess < min || guess > max){
    setMessage(`Please enter a number between ${min} and ${max}`, 'red');
  }

  //Check if won
  if(guess === winningNum){
    //Game over - WON

    // //disable input
    // guessInput.disabled = true;
    // //Change border to green
    // guessInput.style.borderColor = 'green';
    // //Set Message to won
    // setMessage(`${winningNum} is correct, YOU WIN!`, 'green');
    gameOver(true, `${winningNum} is correct, YOU WIN!`);

  } else {
    //Wrong number
    guessesLeft -= 1;

    if(guessesLeft === 0){
      //Game over - LOST

    // //disable input
    // guessInput.disabled = true;
    // //Change border to red
    // guessInput.style.borderColor = 'red';
    // //Set Message to won
    // setMessage(`Game over, YOU LOST. The correct number was ${winningNum} `, 'red');
    gameOver(false, `Game over, YOU LOST. The correct number was ${winningNum} `);

    } else {
    //Game Continues - ANSWER WRONG

    //Change border to red
    guessInput.style.borderColor = 'red';

    //Clear Input
    guessInput.value = '';
    
    //Tell user it's the wrong number
    setMessage(`${guess} is not correct, ${guessesLeft} guesses left`, 'red');
    }
  }
});

//Game over 
function gameOver(won, msg){
let color;
won === true ? color = 'green' : color = 'red';

//disable input
guessInput.disabled = true;
//Change border to green
guessInput.style.borderColor = color;
//Change text color
message.style.color = color;
//Set Message to won
setMessage(msg);

//Play again
guessBtn.value = 'Play again';
guessBtn.className += 'Play-again';
}

//Get winning number
function getRandomNum(min, max){
  return Math.floor(Math.random()*(max-min+1)+min);
}

//Set Message
function setMessage(msg, color){
  message.style.color = color;
  message.textContent = msg;
}
      
