let boxes = document.querySelectorAll(".box");
let resetBtn = document.querySelector("#reset-btn");
let newGameBtn = document.querySelector("#new-btn");
let msgContainer = document.querySelector(".msg-container");
let msg = document.querySelector("#msg");

let turnO = true; //player X & player O
const winPatterns = [
  [0, 1, 2],
  [0, 3, 6],
  [0, 4, 8],
  [1, 4, 7],
  [2, 5, 8],
  [2, 4, 6],
  [3, 4, 5],
  [6, 7, 8],
];

//for reset the game
const resetGame = () => {
  turnO = true;
  enableBoxes();
  msgContainer.classList.add("hide");
  resetBtn.classList.remove("hide");
};

// for adding eventListener to all the boxes
boxes.forEach((box) => {
  box.addEventListener("click", () => {
    if (turnO) {
      // player O
      // if turn of O is true then print O(turnO === true)
      box.innerText = "O";
      turnO = false; // adding this to make sure not true for next turn
    } else {
      // player X
      box.innerText = "X";
      turnO = true;
    }
    box.disabled = true;
    checkWinner();
  });
});

// this fun is used for disable the boxes if we got winner
const disableBoxes = () => {
  for (let box of boxes) {
    box.disabled = true;
  }
};

// this fun is used for enable the boxes for restart the new game
const enableBoxes = () => {
  for (let box of boxes) {
    box.disabled = false;
    box.innerText = "";
  }
};

// this fun is used to show the hidden msg and start again btn after we got winner
const showWinner = (winner) => {
  msg.innerText = `Congratulations, Our winner is ${winner}`;
  msgContainer.classList.remove("hide");
  resetBtn.classList.add("hide");
  disableBoxes();
};

// this fun is used to show the hidden msg and start again btn if match will draw
const showDraw = () => {
  msg.innerText = `It's a Draw!`;
  msgContainer.classList.remove("hide");
  resetBtn.classList.add("hide");
  disableBoxes();
};

// this fun is used to check all the winning pattrens to find winner or draw
const checkWinner = () => {
  let isDraw = true; // Assume it's a draw unless we find a winner

  for (let pattern of winPatterns) {
    let pos1Val = boxes[pattern[0]].innerText;
    let pos2Val = boxes[pattern[1]].innerText;
    let pos3Val = boxes[pattern[2]].innerText;

    if (pos1Val != "" && pos2Val != "" && pos3Val != "") {
      if (pos1Val === pos2Val && pos2Val === pos3Val) {
        showWinner(pos1Val);
        return; // Stop checking further, as we have a winner
      }
    }
  }

  // Check if all boxes are filled (i.e., no empty boxes)
  boxes.forEach((box) => {
    if (box.innerHTML === "") {
      isDraw = false; // If any box is empty, it's not a draw
    }
  });

  if (isDraw) {
    showDraw();
  }
};

newGameBtn.addEventListener("click", resetGame);
resetBtn.addEventListener("click", resetGame);
