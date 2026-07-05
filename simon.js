let gameSeq = [];
let userSeq = [];

let highScore =0;

let btns = ["red", "green", "yellow", "purple"];

let started = false;
let level = 0;

let h2 = document.querySelector("h2");

document.addEventListener("keypress", function() {
  if (started == false) {
    console.log("Game Started");
    started = true;

    levelUp();

   }
});

function gameFlash (btn) {
    btn.classList.add ("flash");
    setTimeout(function()  {
        btn.classList.remove("flash");
        
    }, 300);
}

function userFlash (btn) {
    btn.classList.add ("userflash");
    setTimeout(function()  {
        btn.classList.remove("userflash");
        
    }, 300);
}


function levelUp () {
    userSeq = [];
    level++;
    h2.innerText = `Level ${level}`;

    let randIdx = Math.floor(Math.random()*btns.length);
    let randColor = btns[randIdx];
    let randBtn = document.querySelector(`.${randColor}`);
    // console.log(randIdx);
    // console.log(randColor);
    // console.log(randBtn);
    gameSeq.push(randColor);
    console.log(gameSeq);
    gameFlash(randBtn);
}

function checkAns (idx) {
    // console.log(`curr level :`, level);

    if (userSeq[idx] == gameSeq[idx]) {
        if (userSeq.length == gameSeq.length){
            setTimeout(levelUp,1000);
        }
    } else {
        if (level>highScore) {
            highScore = level;
        }
        h2.innerHTML = `Game Over! Your Score Was <b>${level}</b> <br>  High Score: <b>${highScore}</b> <br> Press Any key To RESTART.`;
        document.querySelector("body").style.backgroundColor = "orange";
        setTimeout(function() {
            document.querySelector("body").style.backgroundColor = "white";
        }, 400);
        reset();
    }

}

function btnPress() {
   let btn = this;
   userFlash(btn);

   let userColor = btn.getAttribute("id");
   userSeq.push(userColor);

   checkAns(userSeq.length-1);
}

let allBtns = document.querySelectorAll(".btn");
for (btn of allBtns){
    btn.addEventListener("click", btnPress);
}

function reset() {
    started =false;
    gameSeq =[];
    userSeq =[];
    level = 0;
}