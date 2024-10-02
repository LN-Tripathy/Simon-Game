let gameSeq = []
let userSeq = []

const btns = ["red", "yellow", "green", "purple"]

let started = false
let level = 0
let highScore = 0
 
const h2 = document.querySelector('h2')
const allBtns = document.querySelectorAll(".btn")

const startScreen = function() {
    if (started == false){
        h2.innerText = `Game started`
        h2.style.color = "black"
        
        started = true

        levelUp()
    }
}
//for PC
document.addEventListener("keypress", startScreen)
//for mobile
document.addEventListener("touchstart", startScreen)



// function to increament the level
const levelUp = ()=>{
    userSeq = []
    level++
    setTimeout(() => {
        h2.innerText = `Level : ${level}`
    }, 500);

    // generating random buttons
    let rand = Math.floor(Math.random() * 4)
    let randCol = btns[rand]
    let randBtn = document.querySelector(`.${randCol}`)

    // adding game sequence 
    gameSeq.push(randCol)
    console.log(gameSeq)

    // to flash random buttons
    setTimeout(() => {
        btnFlash(randBtn)
    }, 1000);

}


// function to flash the buttons
const btnFlash = (btn)=>{
    btn.classList.toggle("gameFlash")
    setTimeout(() => {
        btn.classList.toggle("gameFlash")
    }, 250);  
}

// function to flash the buttons by the user
const usrFlash = (btn)=>{
    btn.classList.toggle("userFlash")
    setTimeout(() => {
        btn.classList.toggle("userFlash")
    }, 100);  
}


// button press
let btnPress = function() {
    let btn = this
    usrFlash(btn)

    // adding user pressed color in userSeq
    let userCol = btn.classList[1]
    userSeq.push(userCol)
    console.log(userSeq)
    checkAns(userSeq.length-1)
}
// assigning all functions with eventListeners
for (let btn of allBtns){
    btn.addEventListener("click", btnPress)
}



// function to check the pattern
const checkAns = function(idx){
    if (userSeq[idx] === gameSeq[idx]){
        if(userSeq.length == gameSeq.length){
            levelUp()
        }
    }else{
        // checking for high score
        if (highScore < level){
            highScore = level
        }


        // result
        h2.innerHTML = `Game Over, Your Score is <b style="font-size : 1.6em">${level*10}</b><br>High Score : <b style="font-size : 1.6em; color: orange">${highScore*10}</b><br> Press any key to start.<br>`
        

        // red gameover effect
        document.body.style.backgroundColor = "red"    
        setTimeout(() => {
            document.body.style.backgroundColor = "white"    
        }, 160);
        reset()    
    }
}



// reset function
const reset = function(){
    started = false
    gameSeq = []
    userSeq = []
    level = 0
}
