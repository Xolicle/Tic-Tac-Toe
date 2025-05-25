const domManipulator = (function () {
  return {
    container: document.querySelector(".container"),
    solo: document.querySelector("#solo"),
    group: document.querySelector("#group"),
    gameboard: document.querySelector(".gameboard"),
    playerSection: document.querySelector(".playersSection"),
    gameIcon: document.querySelector(".gameIcon"),
    gamePlayers: document.querySelector(".gamePlayers"),
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
  domManipulator.gameboard.style.display = "none";
  domManipulator.solo.addEventListener("click", () => {
    // domManipulator.container.style.display = "none";
    domManipulator.playerSection.style.display = "none";
    domManipulator.gameIcon.style.display = "none";
    domManipulator.gamePlayers.style.display = "flex";
    domManipulator.gameboard.style.display = "grid";
    Gameboard.load();
    // console.log("starting");
  });
  domManipulator.group.addEventListener("click", () => {
    domManipulator.playerSection.style.display = "none";
    domManipulator.gameIcon.style.display = "none";
    // domManipulator.gamePlayers.style.display = "flex";
    domManipulator.gameboard.style.display = "grid";
    Gameboard.load();
  });
})();
const game = {};
