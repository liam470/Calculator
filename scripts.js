// Game Setup
let playerElixir = 10;
let opponentElixir = 10;
let playerUnits = [];
let opponentUnits = [];
const unitCost = 3; // Elixir cost for each unit

// DOM Elements
const playerElixirElement = document.getElementById('playerElixir');
const opponentElixirElement = document.getElementById('opponentElixir');
const playerUnitsElement = document.getElementById('playerUnits');
const opponentUnitsElement = document.getElementById('opponentUnits');
const playerTower = document.getElementById('playerTower');
const opponentTower = document.getElementById('opponentTower');
const deployUnitBtn = document.getElementById('deployUnitBtn');

// Units
const units = [
    { name: 'Knight', health: 100, damage: 10, speed: 1, elixir: unitCost, class: 'knight' },
    { name: 'Archer', health: 80, damage: 12, speed: 1.2, elixir: unitCost, class: 'archer' },
    { name: 'Giant', health: 200, damage: 20, speed: 0.8, elixir: unitCost, class: 'giant' }
];

// Game loop
let gameInterval = setInterval(gameLoop, 1000);

// Deploy Unit Button
deployUnitBtn.addEventListener('click', () => deployUnit());

// Deploy Unit Logic
function deployUnit() {
    if (playerElixir >= unitCost) {
        playerElixir -= unitCost;
        updateElixirDisplay();

        // Choose a random unit
        const unit = units[Math.floor(Math.random() * units.length)];
        playerUnits.push(unit);
        createUnit(unit, 'player');
    }
}

// Create Unit Function
function createUnit(unit, playerType) {
    const unitDiv = document.createElement('div');
    unitDiv.classList.add('unit', unit.class);
    unitDiv.textContent = unit.name;
    const field = playerType === 'player' ? playerUnitsElement : opponentUnitsElement;
    field.appendChild(unitDiv);

    // Set unit position
    const unitPosition = playerType === 'player' ? 'left' : 'right';
    unitDiv.style.position = 'absolute';
    unitDiv.style.bottom = '0';
    unitDiv.style[unitPosition] = '10%';

    // Move the unit towards the opponent's tower
    moveUnit(unitDiv, playerType, unit);
}

// Unit Movement
function moveUnit(unitDiv, playerType, unit) {
    const targetTower = playerType === 'player' ? opponentTower : playerTower;
    let unitPosition = parseInt(unitDiv.style.left || 0);
    const unitSpeed = unit.speed * 10;

    let interval = setInterval(() => {
        unitPosition += unitSpeed;
        unitDiv.style.left = unitPosition + '%';

        // Check if the unit has reached the opponent's tower
        if (unitPosition >= 90) {
            clearInterval(interval);
            targetTowerHit(unit, playerType);
        }
    }, 100);
}

// Tower Hit Logic
function targetTowerHit(unit, playerType) {
    if (playerType === 'player') {
        opponentElixir -= unit.damage;
    } else {
        playerElixir -= unit.damage;
    }
    updateElixirDisplay();
    checkWin();
}

// Update Elixir Display
function updateElixirDisplay() {
    playerElixirElement.textContent = playerElixir;
    opponentElixirElement.textContent = opponentElixir;
}

// Check for Win Condition
function checkWin() {
    if (playerElixir <= 0) {
        alert("Game Over! You Lost!");
        resetGame();
    } else if (opponentElixir <= 0) {
        alert("You Win!");
        resetGame();
    }
}

// Reset Game Logic
function resetGame() {
    playerElixir = 10;
    opponentElixir = 10;
    playerUnits = [];
    opponentUnits = [];
    updateElixirDisplay();
    playerUnitsElement.innerHTML = '';
    opponentUnitsElement.innerHTML = '';
}

// Game Loop to regenerate elixir
function gameLoop() {
    if (playerElixir < 10) playerElixir++;
    if (opponentElixir < 10) opponentElixir++;
    updateElixirDisplay();
}
