const cursor = document.querySelector('.cursor')
const holes = [...document.querySelectorAll('.hole')]
const scoreEl = document.querySelector('.score span')
let score = 0

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



function run(){
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
                }, 500)
            }
        })
    }

    hole.appendChild(img)

    // Only set a score timer if the current image is a mole
    if (isMole) {
        // Set a score timer that decreases the score by 10 every 1000 milliseconds (1 second)
        scoreTimer = setInterval(() => {
            score -= 10
            scoreEl.textContent = score
        }, 1000)
    }

    timer = setTimeout(() => {
        hole.removeChild(img)
        clearInterval(scoreTimer) // Clear the score timer
        run()
    }, 1500)
}

// Define the gameOver function
function gameOver() {
    // Display a game over message
    alert('Game Over!')

    // Reset the score to 0
    score = 0
    scoreEl.textContent = score

    // Clear any timeouts or intervals to stop the game
    clearTimeout(timer)
    clearInterval(scoreTimer)
}

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
