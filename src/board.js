export default class Board {
  constructor() {
    this.moves = [0,1,2,3,4,5,6,7,8];
    this.setPlayers();
    this.update();
  }

  playMove(player, moveIndex) {
    if(moveIndex >= this.moves.length || moveIndex < 0) {
      return 1;
    } else if(this.moves[moveIndex] === 'x' || this.moves[moveIndex] === 'o') {
      return 1;
    } else {
      this.moves[moveIndex] = player;
      this.flipTurn();
      this.update();
    }
  }

  flipTurn() {
    if(this.turn === 1) {
      this.turn =  2;
    } else {
      this.turn = 1;
    }
  }

  update() {
    this.moves.map((move, i) => {
      if(move !== 'x' && move !== 'o') {
        $('#' + i).text(' ');
      } else {
        $('#' + i).text(move);
      }
    });
  }
}
