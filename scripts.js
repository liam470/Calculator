const Z = [
    [[1, 1, 0],
     [0, 1, 1],
     [0, 0, 0]],

    [[0, 0, 1],
     [0, 1, 1],
     [0, 1, 0]]
];

const S = [
    [[0, 1, 1],
     [1, 1, 0],
     [0, 0, 0]],

    [[0, 1, 0],
     [0, 1, 1],
     [0, 0, 1]]
];

const T = [
    [[0, 1, 0],
     [1, 1, 1],
     [0, 0, 0]],

    [[0, 1, 0],
     [0, 1, 1],
     [0, 1, 0]],

    [[0, 0, 0],
     [1, 1, 1],
     [0, 1, 0]],

    [[0, 1, 0],
     [1, 1, 0],
     [0, 1, 0]]
];

const O = [
    [[1, 1],
     [1, 1]]
];

const L = [
    [[1, 0, 0],
     [1, 1, 1],
     [0, 0, 0]],

    [[0, 1, 1],
     [0, 1, 0],
     [0, 1, 0]],

    [[0, 0, 0],
     [1, 1, 1],
     [0, 0, 1]],

    [[0, 1, 0],
     [0, 1, 0],
     [1, 1, 0]]
];

const I = [
    [[0, 0, 0, 0],
     [1, 1, 1, 1],
     [0, 0, 0, 0],
     [0, 0, 0, 0]],

    [[0, 1, 0, 0],
     [0, 1, 0, 0],
     [0, 1, 0, 0],
     [0, 1, 0, 0]]
];

const J = [
    [[0, 0, 1],
     [1, 1, 1],
     [0, 0, 0]],

    [[0, 1, 0],
     [0, 1, 0],
     [0, 1, 1]],

    [[0, 0, 0],
     [1, 1, 1],
     [1, 0, 0]],

    [[1, 1, 0],
     [0, 1, 0],
     [0, 1, 0]]
];

const canvas = document.getElementById("tetris");
const context = canvas.getContext("2d");

const row = 20;
const col = 10;
const sq = 30; // Square size
const empty = "#111"; // Empty color

// Draw square
function drawSquare(x, y, color) {
    context.fillStyle = color;
    context.fillRect(x * sq, y * sq, sq, sq);
    context.strokeStyle = "#222";
    context.strokeRect(x * sq, y * sq, sq, sq);
}

// Create board
let board = [];
for (let r = 0; r < row; r++) {
    board[r] = [];
    for (let c = 0; c < col; c++) {
        board[r][c] = empty;
    }
}

// Draw the board
function drawBoard() {
    for (let r = 0; r < row; r++) {
        for (let c = 0; c < col; c++) {
            drawSquare(c, r, board[r][c]);
        }
    }
}
drawBoard();

// Tetris shapes and colors
const pieces = [
    [Z, "red"],
    [S, "green"],
    [T, "purple"],
    [O, "yellow"],
    [L, "orange"],
    [I, "cyan"],
    [J, "blue"]
];

// Random piece
function randomPiece() {
    let r = Math.floor(Math.random() * pieces.length);
    return new Piece(pieces[r][0], pieces[r][1]);
}

// Piece constructor
function Piece(tetromino, color) {
    this.tetromino = tetromino;
    this.color = color;
    this.tetrominoN = 0; // Initial rotation
    this.activeTetromino = this.tetromino[this.tetrominoN];
    this.x = 3;
    this.y = -2;
}

// Draw piece
Piece.prototype.draw = function () {
    for (let r = 0; r < this.activeTetromino.length; r++) {
        for (let c = 0; c < this.activeTetromino.length; c++) {
            if (this.activeTetromino[r][c]) {
                drawSquare(this.x + c, this.y + r, this.color);
            }
        }
    }
};

// Undraw piece
Piece.prototype.unDraw = function () {
    for (let r = 0; r < this.activeTetromino.length; r++) {
        for (let c = 0; c < this.activeTetromino.length; c++) {
            if (this.activeTetromino[r][c]) {
                drawSquare(this.x + c, this.y + r, empty);
            }
        }
    }
};

// Collision detection
Piece.prototype.collision = function (x, y, piece) {
    for (let r = 0; r < piece.length; r++) {
        for (let c = 0; c < piece.length; c++) {
            if (!piece[r][c]) {
                continue;
            }
            let newX = this.x + c + x;
            let newY = this.y + r + y;
            if (newX < 0 || newX >= col || newY >= row || (newY >= 0 && board[newY][newX] !== empty)) {
                return true;
            }
        }
    }
    return false;
};

// Move down
Piece.prototype.moveDown = function () {
    if (!this.collision(0, 1, this.activeTetromino)) {
        this.unDraw();
        this.y++;
        this.draw();
    } else {
        this.lock();
        p = randomPiece();
    }
};

// Move right
Piece.prototype.moveRight = function () {
    if (!this.collision(1, 0, this.activeTetromino)) {
        this.unDraw();
        this.x++;
        this.draw();
    }
};

// Move left
Piece.prototype.moveLeft = function () {
    if (!this.collision(-1, 0, this.activeTetromino)) {
        this.unDraw();
        this.x--;
        this.draw();
    }
};

// Rotate
Piece.prototype.rotate = function () {
    let nextPattern = this.tetromino[(this.tetrominoN + 1) % this.tetromino.length];
    if (!this.collision(0, 0, nextPattern)) {
        this.unDraw();
        this.tetrominoN = (this.tetrominoN + 1) % this.tetromino.length;
        this.activeTetromino = this.tetromino[this.tetrominoN];
        this.draw();
    }
};

// Lock piece
Piece.prototype.lock = function () {
    for (let r = 0; r < this.activeTetromino.length; r++) {
        for (let c = 0; c < this.activeTetromino.length; c++) {
            if (this.activeTetromino[r][c]) {
                if (this.y + r < 0) {
                    alert("Game Over");
                    gameOver = true;
                    break;
                }
                board[this.y + r][this.x + c] = this.color;
            }
        }
    }
    // Remove full rows
    for (let r = 0; r < row; r++) {
        let isRowFull = true;
        for (let c = 0; c < col; c++) {
            isRowFull = isRowFull && board[r][c] !== empty;
        }
        if (isRowFull) {
            for (let y = r; y > 1; y--) {
                for (let c = 0; c < col; c++) {
                    board[y][c] = board[y - 1][c];
                }
            }
            for (let c = 0; c < col; c++) {
                board[0][c] = empty;
            }
            score += 10;
        }
    }
    drawBoard();
    document.getElementById("score").innerHTML = "Score: " + score;
};

// Control the piece
document.addEventListener("keydown", CONTROL);
function CONTROL(event) {
    if (event.keyCode === 37) {
        p.moveLeft();
    } else if (event.keyCode === 38) {
        p.rotate();
    } else if (event.keyCode === 39) {
        p.moveRight();
    } else if (event.keyCode === 40) {
        p.moveDown();
    }
}

// Start the game
let p = randomPiece();
let score = 0;
let gameOver = false;

function drop() {
    let now = Date.now();
    let delta = now - dropStart;
    if (delta > 1000) {
        p.moveDown();
        dropStart = Date.now();
    }
    if (!gameOver) {
        requestAnimationFrame(drop);
    }
}

let dropStart = Date.now();
drop();
