const domManipulator = (function () {
  return {
    container: document.querySelector(".container"),
    solo: document.querySelector("#solo"),
    group: document.querySelector("#group"),
    gameboard: document.querySelector(".gameboard"),
    playerSection: document.querySelector(".playersSection"),
    gameIcon: document.querySelector(".gameIcon"),
    gamePlayers: document.querySelector(".gamePlayers"),
    playerOneScore: document.querySelector("#playerOneScore"),
    playerTwoScore: document.querySelector("#playerTwoScore"),
    player1Name: document.querySelector("#player1Name"),
    player2Name: document.querySelector("#player2Name"),
    turn: document.querySelector(".turn"),
    winner: document.querySelector(".winner"),
    getCells: function () {
      return this.gameboard.querySelectorAll(".cell");
    },
    newCell: function (mark) {
      const cell = document.createElement("div");
      cell.classList.add("cell");
      cell.style.border = "3px dashed #f9d45b";
      cell.style.height = "100%";
      cell.style.width = "100%";

      if (mark) {
        cell.appendChild(mark);
      }
      return cell;
    },
    marker: function (mark) {
      const markType = document.createElement("span");
      markType.classList.add("markType");
      markType.textContent = mark;
      return markType;
    },
    clearGameboard: function () {
      this.getCells().forEach((cell) => {
        this.gameboard.removeChild(cell);
      });
    },
    display: function (board) {
      this.clearGameboard();
      board.forEach((cell) => {
        this.gameboard.appendChild(this.newCell(this.marker(cell.mark)));
      });
    },
  };
})();
const Gameboard = (function () {
  const cell = {
    mark: "",
  };
  const gameboard = [];
  const getGameboard = () => gameboard;
  const cellMarker = (mark, index) => {
    gameboard[index] = { mark };
    //display gameboard
    domManipulator.display(gameboard);
  };
  const load = () => {
    for (let i = 1; i <= 9; i++) {
      gameboard.push(cell);
    }
    domManipulator.display(gameboard);
  };
  return {
    getGameboard,
    cellMarker,
    load,
  };
})();
const displayController = (function () {
  function Player(name, marker, type = "human") {
    return { name, marker, type };
  }
  // console.log("display");
  domManipulator.gameboard.style.display = "none";
  domManipulator.solo.addEventListener("click", () => {
    // domManipulator.container.style.display = "none";
    domManipulator.playerSection.style.display = "none";
    domManipulator.gameIcon.style.display = "none";
    domManipulator.gamePlayers.style.display = "flex";
    domManipulator.gameboard.style.display = "grid";

    Gameboard.load();
    console.log("inside solo button");
    humanPlayer(player1.marker);
  });
  const player1 = Player("Human", "X");
  const player2 = Player("Bot", "O");
  let currentPlayer = player1;

  domManipulator.group.addEventListener("click", () => {
    domManipulator.playerSection.style.display = "none";
    domManipulator.gameIcon.style.display = "none";
    // domManipulator.gamePlayers.style.display = "flex";
    domManipulator.gameboard.style.display = "grid";
    Gameboard.load();
    console.log("inside group button");
  });
  function humanPlayer(mark) {
    // console.log("checking");
    domManipulator.getCells().forEach((cell) => {
      cell.addEventListener("click", (e) => {
        if (e.currentTarget.textContent == "") {
          const index = Array.from(e.currentTarget.parentNode.children).indexOf(
            e.currentTarget
          );
          // console.log("X");
          Gameboard.cellMarker(mark, index);
          takeTurn();
        }
      });
    });
  }
  function switchPlayers() {
    currentPlayer = currentPlayer === player1 ? player2 : player1;
  }
  function takeTurn() {
    let player = "";
    if (currentPlayer == player1) {
      player = player1;
    } else {
      player = player2;
    }
    humanPlayer(player1.marker);
    console.log("Turn");
  }
})();
const game = {};

// domManipulator.getCells().forEach((cell) => {
//   cell.addEventListener("click", () => {
//     const clickedCell = e.currentTarget;
//     const markSpan = clickedCell.querySelector(".markType");
//     if (markSpan && markSpan.textContent === "") {
//       const currentPlayerMark = "X";
//       markSpan.textContent = currentPlayerMark;

//       markSpan.classList.add("placed-mark");
//       markSpan.classList.add(currentPlayerMark.toLowerCase());
//     }
//     console.log("X");
//   });
// });
