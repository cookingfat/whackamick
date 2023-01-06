const cursor = document.querySelector('.cursor')
const holes = [...document.querySelectorAll('.hole')]
const scoreEl = document.querySelector('.score span')
let score = 0
const gameover = new Audio("assets/gameover.mp3")
const sound = new Audio("assets/smash.mp3")
// Create a new Audio object for the soundtrack
const soundtrack = new Audio("assets/soundtrack.mp3")

// Set the loop property to true
soundtrack.loop = true
// Set the volume of the soundtrack to 70%
soundtrack.volume = 0.3

// Play the soundtrack
soundtrack.play()

// Get a reference to the mute button
const muteButton = document.querySelector('#mute-button')

// Add an event listener to the button that calls the pause method of the soundtrack when the button is clicked
muteButton.addEventListener('click', () => {
    if (soundtrack.paused) {
        soundtrack.play()
    } else {
        soundtrack.pause()
    }
})

let scoreTimer = null;
const missedScoreEl = document.createElement('div')
missedScoreEl.classList.add('missed-score')
missedScoreEl.innerHTML = 'MISSED: <span>0</span>'
document.body.appendChild(missedScoreEl)

let missedScore = 0

function run() {
    const i = Math.floor(Math.random() * holes.length)
    const hole = holes[i]
    let timer = null
    let scoreTimer = null

    // Introduce a new variable to determine whether to use a bomb or a mole
    const useBomb = Math.random() < 0.2
    const img = document.createElement('img')

    // Set a new variable indicating whether the current image is a mole or a bomb
    const isMole = !useBomb

    if (useBomb) {
        // Use the bomb image
        img.classList.add('bomb')
        img.src = 'assets/bomb.png'


        // Add an event listener to the bomb that calls gameOver when clicked
        img.addEventListener('click', () => {
            // Play the sound
            sound.play()
            
            gameOver()
        })
    } else {
        // Use the mole image
        img.classList.add('mole')
        img.src = 'assets/mole.png'

        // Add a clicked property to the mole image and set it to false
        img.clicked = false

        // Add an event listener to the mole that increments the score when clicked
        img.addEventListener('click', () => {
            // Only increment the score if the clicked property is not true
            if (!img.clicked) {
                score += 10
                sound.play()
                scoreEl.textContent = score
                img.src = 'assets/mole-whacked.png'
                img.clicked = true // Set the clicked property to true
                clearTimeout(timer)
                clearTimeout(scoreTimer) // Clear the score timer
                setTimeout(() => {
                    hole.removeChild(img)
                    run()
                }, 500)  // Set timeout to 500 milliseconds (0.5 seconds)
            }
        })
if (isMole) {
    missedScoreTimer = setTimeout(() => {
      if (!img.clicked) {
        missedScore += 1
        missedScoreEl.querySelector('span').textContent = missedScore

        // Check if the player has reached 5 misses
        if (missedScore === 5) {
          gameOver()
        }
      }
    }, 1500)
  }
        
    }


    hole.appendChild(img)
    

    



    // Speeds up the game as the score increases

    if (score >= 400) {
        timer = setTimeout(() => {
            hole.removeChild(img);
            clearInterval(scoreTimer); // Clear the score timer
            run();
        }, 700); // Set timeout to 700 milliseconds (0.7 seconds)
    } else if (score >= 300) {
        timer = setTimeout(() => {
            hole.removeChild(img);
            clearInterval(scoreTimer); // Clear the score timer
            run();
        }, 800); // Set timeout to 800 milliseconds (0.8 seconds)
    } else if (score >= 200) {
        timer = setTimeout(() => {
            hole.removeChild(img);
            clearInterval(scoreTimer); // Clear the score timer
            run();
        }, 900); // Set timeout to 900 milliseconds (0.9 seconds)
    } else if (score >= 100) {
        timer = setTimeout(() => {
            hole.removeChild(img);
            clearInterval(scoreTimer); // Clear the score timer
            run();
        }, 1000); // Set timeout to 1000 milliseconds (1 second)
    } else {
        timer = setTimeout(() => {
            hole.removeChild(img);
            clearInterval(scoreTimer); // Clear the score timer
            run();
        }, 1500);
    }

    if (score >= 400) {
        soundtrack.playbackRate = 1.75; // Set playback rate to 1.75x
    } else if (score >= 300) {
        soundtrack.playbackRate = 1.5; // Set playback rate to 1.5x
    } else if (score >= 200) {
        soundtrack.playbackRate = 1.25; // Set playback rate to 1.25x
    } else if (score >= 100) {
        soundtrack.playbackRate = 1.1; // Set playback rate to 1.1x
    } else {
        soundtrack.playbackRate = 1; // Set playback rate to 1x
    }


}

// Define the gameOver function
function gameOver() {
    // Display a game over message
    gameover.play()
    soundtrack.pause()
    
alert('Game Over! Your final score is: ' + score)
   
    soundtrack.play()

    // Reset the score to 0
    score = 0
    scoreEl.textContent = score
    // Reset the missed score to 0
    missedScore = 0
    missedScoreEl.querySelector('span').textContent = missedScore

    // Clear any timeouts or intervals to stop the game
    clearTimeout(timer)
    clearInterval(scoreTimer)
}

/*
function gameOver() {
    // Pause the soundtrack
    soundtrack.pause()
  
    // Play the gameover sound
    gameover.play()
  
    // Create the gameover box
    const gameoverBox = document.createElement('div')
    gameoverBox.classList.add('gameover-box')
    gameoverBox.innerHTML = `
      <p>Game Over!</p>
      <p>Your final score is: ${score}</p>
      <button id="restart-button">Restart</button>
    `
    document.body.appendChild(gameoverBox)
  
    // Add an event listener to the restart button
    const restartButton = document.querySelector('#restart-button')
    restartButton.addEventListener('click', () => {
      // Remove the gameover box
      document.body.removeChild(gameoverBox)
  
      // Reset the score
      score = 0
      scoreEl.textContent = score
  
      // Reset the missed score
      missedScore = 0
      missedScoreEl.querySelector('span').textContent = missedScore
  
      // Start the game again
      run()
  
      // Play the soundtrack
      soundtrack.play()
    })
  }
*/

run()

window.addEventListener('mousemove', e => {
    cursor.style.top = e.pageY + 'px'
    cursor.style.left = e.pageX + 'px'
})
window.addEventListener('mousedown', () => {
    cursor.classList.add('active')
})
window.addEventListener('mouseup', () => {
    cursor.classList.remove('active')
})
