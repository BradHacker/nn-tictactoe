import $ from 'jquery';
window.jQuery = $;
window.$ = $;
import Board from './board.js';
import NeuralNetwork from './nn.js';
import Player from './player.js';

// Define network shape
const INPUT_SIZE = 9;
const HIDDEN_SIZE = 18;
const OUTPUT_SIZE = 9;

// Define amount of games (should be even number)
const NUMBER_OF_GAMES = 4;

// Other constants
const NAMES = ['Dude', 'Bro', 'Dawg', 'Homeboy', 'Homeslice', 'Man', 'Human', 'Guy'];

// Create global storage
let global_players = [];
let global_boards = [];

$(document).ready(function() {
  initBoards(NUMBER_OF_GAMES);
  //Measure performance of init
  console.log('Created ' + NUMBER_OF_GAMES + ' games in ' + performance.getEntriesByName('initTime')[0].duration.toFixed(2) + ' seconds.');
  performance.clearMarks();
  performance.clearMeasures();
});

function initBoards(amount_boards) {
  performance.mark('beginInit');
  let num_networks = amount_boards * 2;
  let _temp_networks = createNN(num_networks, INPUT_SIZE, HIDDEN_SIZE, OUTPUT_SIZE);
  // Make boards onscreen
  for(let i = 0; i < amount_boards; i++) {
    global_boards.push(new Board());
    $('<div class="gameBoard' + i + '"><table><tr><td><button id="0" onClick="playerMove(0)"></button></td><td><button id="1" onClick="playerMove(1)"></button></td><td><button id="2" onClick="playerMove(2)"></button></td></tr><tr><td><button id="3" onClick="playerMove(3)"></button></td><td><button id="4" onClick="playerMove(4)"></button></td><td><button id="5" onClick="playerMove(5)"></button></td></tr><tr><td><button id="6" onClick="playerMove(6)"></button></td><td><button id="7" onClick="playerMove(7)"></button></td><td><button id="8" onClick="playerMove(8)"></button></td></tr></table></div>').insertAfter('.header');
  }
  // Create players, assign their boards, and show their names
  global_players = createPlayers(_temp_networks, NAMES);
  for(let i = 0; i < global_players.length; i += 2) {
    global_players[i].board = i/2;
    global_players[i+1].board = i/2;
    $('.gameBoard' + i/2).prepend('<h4>' + global_players[i].name + ' vs. ' + global_players[i+1].name);
  }
  performance.mark('endInit');
  performance.measure('initTime', 'beginInit', 'endInit');
}

function createNN(amount_ns, i_amount, h_amount, o_amount) {
  let array = [];
  for(let i = 0; i < amount_ns; i++) {
    array.push(new NeuralNetwork(i_amount, h_amount, o_amount));
  }
  return array;
}

function createPlayers(brains, names) {
  let _temp_players = [];
  brains.map((brain) => {
    _temp_players.push(new Player(brain, names[Math.floor(Math.random() * names.length)]));
  });
  return _temp_players;
}
