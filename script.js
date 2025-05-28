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
    restart: document.querySelector(".restart"),
    getCells: function () {
      return this.gameboard.querySelectorAll(".cell");
    },
    newCell: function (mark) {
      const cell = document.createElement("div");
      cell.classList.add("cell");

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
    restartFunction: function () {
      const restartBtn = document.createElement("button");
      restartBtn.textContent = "Play Again";
      this.restart.appendChild(restartBtn);
      this.container.appendChild(this.restart);
      restartBtn.addEventListener("click", () => {
        location.reload();
        return false;
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
    // let cells = domManipulator.getCells();
    // cells[index].classList.add(`marked-${mark.toLowerCase()}`);

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
  const player1 = Player("Human", "X");
  const player2 = Player("Bot", "O", "bot");
  let currentPlayer = player1;
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
    // humanPlayer(player1.marker);
    playerTurns();
    domManipulator.restartFunction();
  });

  domManipulator.group.addEventListener("click", () => {
    domManipulator.playerSection.style.display = "none";
    domManipulator.gameIcon.style.display = "none";
    // domManipulator.gamePlayers.style.display = "flex";
    domManipulator.gameboard.style.display = "grid";
    Gameboard.load();
    player2.type = "human";
    playerTurns();
  });

  function roundWinner() {
    const board = Gameboard.getGameboard();
    let winnerMark = "";
    // let winner = [];
    const winningConditions = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];

    for (let i = 0; i < winningConditions.length; i++) {
      const [a, b, c] = winningConditions[i];
      // Check if the squares are not empty AND all three marks are the same
      if (
        board[a].mark !== "" &&
        board[a].mark === board[b].mark &&
        board[a].mark === board[c].mark
      ) {
        winnerMark = board[a].mark;
        break;
      }
    }
    if (winnerMark == "X") {
      console.log(`Winner is player 1`);
      domManipulator.turn.style.display = "none";
      domManipulator.winner.textContent = `Winner is player 1`;
      return true;
    } else if (winnerMark == "O") {
      console.log(`Winner is player 2`);
      domManipulator.turn.style.display = "none";
      domManipulator.winner.textContent = `Winner is player 2`;
      return true;
    } else if (
      board.filter((cell) => {
        return cell.mark !== "";
      }).length === 9
    ) {
      domManipulator.turn.style.display = "none";
      domManipulator.winner.textContent = `Draw`;
      return true;
    } else return false;
  }
  // console.log(domManipulator.getCells());

  function humanPlayer(mark) {
    // console.log("checking");
    domManipulator.getCells().forEach((cell) => {
      cell.addEventListener("click", (e) => {
        if (e.currentTarget.textContent == "") {
          const index = Array.from(e.currentTarget.parentNode.children).indexOf(
            e.currentTarget
          );
          // console.log(cell.);

          Gameboard.cellMarker(mark, index);
          switchPlayers();
          playerTurns();
        }
      });
    });
  }

  function computerPlayer(marker) {
    // const corners = [0, 2, 6, 8];
    // const sides = [1, 3, 5, 7];
    let board = Gameboard.getGameboard();
    let emptyCells = board
      .map((cell, index) => (cell.mark !== "" ? false : index))
      .filter((index) => index !== false);
    if (board[4].mark === "") {
      Gameboard.cellMarker(marker, 4);
    } else {
      const selection = Math.floor(Math.random() * emptyCells.length);
      Gameboard.cellMarker(marker, emptyCells[selection]);
    }
    switchPlayers();
    playerTurns();
  }
  function switchPlayers() {
    currentPlayer = currentPlayer === player1 ? player2 : player1;
  }
  function playerTurns() {
    if (!roundWinner()) {
      let player = "";
      if (currentPlayer == player1) {
        player = player1;
        domManipulator.turn.textContent = "Player 1 turn";
      } else {
        player = player2;
        domManipulator.turn.textContent = "Player 2 turn";
      }
      if (player.type == "bot") {
        computerPlayer(player.marker);
      } else {
        humanPlayer(player.marker);
      }
    } else console.log("Winner, stop");

    // console.log("Turn");
  }
})();
// const game = {};
