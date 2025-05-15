// (function () {})();
const Gameboard = (function () {
  const gameboard = [];
  const getGameboard = () => gameboard;
  const squareMarker = (mark, index) => {
    gameboard[index] = { mark };
    //display gameboard
  };
})();
const displayController = (function () {})();
const game = {};
function Player(name, marker) {
  return { name, marker };
}
