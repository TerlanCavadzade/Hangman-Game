let stages = ['<div class="head man"></div>',
    '<div class="arm1 man"></div>',
    '<div class="arm2 man"></div>',
    '<div class="body man"></div>',
    '<div class="leg1 man"></div>',
    '<div class="leg2 man"></div>'
]
let words = ["terlan", 'budget', 'burden', 'bureau', 'button', 'camera', 'cancer', 'cannot', 'carbon', 'career', 'castle', 'casual', 'caught', 'center', ]
let word = ""
let lives = 6
let letters = []
var gameOver = false
var won = 0
let EnteredLetterArray = []
let indexContainer = []

//Select Random Word
function randomWord() {
    let boxes = document.querySelectorAll(".word")
    if (boxes) {
        for (let box of boxes) {
            box.parentNode.removeChild(box);
        }
    }
    let random = Math.floor(Math.random() * words.length)
    word = words[random]
    console.log(word);
    for (let i = 0; i < word.length; i++) {
        var node = document.createElement("input");
        node.classList.add("word")
        node.setAttribute("readonly", '');
        document.querySelector(".wordcount").appendChild(node);
    }
    if (letters.length = !0) {
        letters = []
    }
    for (let i = 0; i < word.length; i++) {
        letters.push(word[i])
    }
}

//SubmitAnswer
let btn = document.querySelector(".Submit")
let inpt = document.querySelector(".inpt")
let LiveCountContainer = document.querySelector('.lives')
btn.addEventListener('click', function () {
    let LiveCount = document.querySelector(".livesLeft")
    let enteredLetter = inpt.value.toLowerCase();
    inpt.value = ''
    if (!EnteredLetterArray.includes(enteredLetter)) {
        EnteredLetterArray.push(enteredLetter)
        if (lives > 0) {
            if (!letters.includes(enteredLetter)) {
                lives -= 1
                document.querySelector(".frame").innerHTML += stages[lives]
                LiveCount.innerHTML = lives
            }
            if (letters.includes(enteredLetter)) {
                var indexes = getAllIndexes(letters, enteredLetter);
                won += indexes.length
                let boxes = document.querySelectorAll(".word")
                for (let index of indexes) {
                    boxes[index].setAttribute('value', enteredLetter.toUpperCase())
                    indexContainer.push(index)
                }

            }
        }
        if (lives < 1) {
            btn.disabled = true
            btn.style.cursor = 'unset'
            inpt.setAttribute('disabled', '')
            LiveCountContainer.innerHTML = `GameOver! Word Was ${word}`
        }
        if (won == 6) {
            btn.disabled = true
            btn.style.cursor = 'unset'
            inpt.setAttribute('disabled', '')
            LiveCountContainer.innerHTML = "Congratulations You Win!"
        }
    } else(
        alert("You Have Entered This Letter Already")
    )

})

//StartGame
let StartBtn = document.querySelector(".start")
let RestartBtn = document.querySelector(".restart")
let HintBtn = document.querySelector(".hint")
StartBtn.addEventListener('click', function () {
    this.classList.add("deactive")
    RestartBtn.classList.remove("deactive")
    RestartBtn.style.width = "100%"
    RestartBtn.style.transitionDelay = "unset"
    HintBtn.classList.remove("deactive")
    HintBtn.style.width = "100%"
    HintBtn.style.transitionDelay = "unset"
    randomWord()
    btn.disabled = false
    btn.style.cursor = 'pointer'
    inpt.style.cursor = 'unset'
    inpt.removeAttribute('disabled')
})
RestartBtn.addEventListener('click', Reset)
// Get All indexes
function getAllIndexes(arr, val) {
    var indexes = [],
        i = -1;
    while ((i = arr.indexOf(val, i + 1)) != -1) {
        indexes.push(i);
    }
    return indexes;
}
//Hint 
HintBtn.addEventListener('click', function () {
    let hintIndex = Math.floor(Math.random() * letters.length)
    if (!indexContainer.includes(hintIndex)) {
        won += 1
        let boxes = document.querySelectorAll(".word")
        boxes[hintIndex].setAttribute('value', letters[hintIndex].toUpperCase())
        HintBtn.disabled = true
        HintBtn.style.width = '0%'
        var indexes = getAllIndexes(letters, letters[hintIndex]);
        if (indexes.length = !2) {
            EnteredLetterArray.push(letters[hintIndex])
        }
    } else {
        alert("You Entered This Letter Already Please Try Again")
    }

})
//Reset
function Reset() {
    lives = 6
    won = 0
    gameOver = false
    randomWord()
    btn.disabled = false
    HintBtn.disabled = false
    btn.style.cursor = 'pointer'
    inpt.removeAttribute('disabled')
    HintBtn.style.width = '100%'
    LiveCountContainer.innerHTML = `Lives Left: <span class="livesLeft">6</span>`
    let man = document.querySelectorAll(".man")
    if (man) {
        for (let body of man) {
            body.parentNode.removeChild(body);
        }
    }
    if (EnteredLetterArray.length = !0) {
        EnteredLetterArray = []
    }
    if (indexContainer.length = !0) {
        indexContainer = []
    }
}

// disable buttons 
btn.disabled = true
btn.style.cursor = 'not-allowed'
inpt.setAttribute('disabled', '')
inpt.style.cursor = 'not-allowed'