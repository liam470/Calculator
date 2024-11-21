// Initial game settings
let playerElixir = 10;
let opponentElixir = 10;
let playerUnits = [];
let opponentUnits = [];

const elixirCost = 3; // Cost of deploying each unit
const maxUnits = 5; // Max number of units that can be deployed at once

// DOM Elements
const playerElixirElement = document.getElementById('playerElixir');
const opponentElixirElement = document.getElementById('opponentElixir');
const playerUnitsElement = document.getElementById('playerUnits');
const opponentUnitsElement = document.getElementById('opponentUnits');
const restartButton = document.getElementById('restartButton');

// Rock, Paper, Scissors units
const units = {
    rock: { name: "Rock", color: "rock", beats: "scissors", role: "defense" },
    paper: { name: "Paper", color: "paper", beats: "rock", role: "balanced" },
    scissors: { name: "Scissors", color: "scissors", beats: "paper", role: "speed" }
};

// Add event listeners to buttons
document.getElementById('rockButton').addEventListener('click', () => deployUnit('rock'));
document.getElementById('paperButton').addEventListener('click', () => deployUnit('paper'));
document.getElementById('scissorsButton').addEventListener('click', () => deployUnit('scissors'));

restartButton.addEventListener('click', restartGame);

// Deploy units
function deployUnit(unitType) {
    if (playerElixir >= elixirCost && playerUnits.length < maxUnits) {
        playerElixir -= elixirCost;
        updateElixirDisplay();
        const unit = units[unitType];
        playerUnits.push(unit);
        renderPlayerUnits();
        opponentTurn();
    }
}

// Opponent's turn to deploy unit
function opponentTurn() {
    if (opponentElixir >= elixirCost && opponentUnits.length < maxUnits) {
        opponentElixir -= elixirCost;
        updateElixirDisplay();
        const randomUnitType = getRandomUnit();
        const unit = units[randomUnitType];
        opponentUnits.push(unit);
        renderOpponentUnits();
        checkBattle();
    }
}

// Random unit selection for opponent
function getRandomUnit() {
    const unitTypes = ['rock', 'paper', 'scissors'];
    return unitTypes[Math.floor(Math.random() * unitTypes.length)];
}

// Render player units
function renderPlayerUnits() {
    playerUnitsElement.innerHTML = "";
    playerUnits.forEach(unit => {
        const div = document.createElement('div');
        div.classList.add('unit', unit.color);
        div.textContent = unit.name;
        playerUnitsElement.appendChild(div);
    });
}

// Render opponent units
function renderOpponentUnits() {
    opponentUnitsElement.innerHTML = "";
    opponentUnits.forEach(unit => {
        const div = document.createElement('div');
        div.classList.add('unit', unit.color);
        div.textContent = unit.name;
        opponentUnitsElement.appendChild(div);
    });
}

// Check if there is a battle outcome
function checkBattle() {
    if (playerUnits.length > 0 && opponentUnits.length > 0) {
        const playerUnit = playerUnits[playerUnits.length - 1];
        const opponentUnit = opponentUnits[opponentUnits.length - 1];

        if (playerUnit.beats === opponentUnit.name.toLowerCase()) {
            alert("Player wins this battle!");
        } else if (opponentUnit.beats === playerUnit.name.toLowerCase()) {
            alert("Opponent wins this battle!");
        } else {
            alert("It's a draw!");
        }
    }
}

// Update elixir display
function updateElixirDisplay() {
    playerElixirElement.textContent = playerElixir;
    opponentElixirElement.textContent = opponentElixir;
}

// Restart game
function restartGame() {
    playerElixir = 10;
    opponentElixir = 10;
    playerUnits = [];
    opponentUnits = [];
    renderPlayerUnits();
    renderOpponentUnits();
    updateElixirDisplay();
}
