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

// Tetromino shapes
const pieces = [
    { shape: [[1, 1, 0], [0, 1, 1]], color: "red" }, // Z shape
    { shape: [[0, 1, 1], [1, 1, 0]], color: "green" }, // S shape
    { shape: [[0, 1, 0], [1, 1, 1]], color: "purple" }, // T shape
    { shape: [[1, 1], [1, 1]], color: "yellow" }, // O shape
    { shape: [[1, 0, 0], [1, 1, 1]], color: "orange" }, // L shape
    { shape: [[0, 1, 0], [0, 1, 0], [0, 1, 1]], color: "cyan" }, // I shape
    { shape: [[0, 0, 1], [1, 1, 1]], color: "blue" } // J shape
];

// Random piece
function randomPiece() {
    return pieces[Math.floor(Math.random() * pieces.length)];
}

// Piece constructor
function Piece(tetromino) {
    this.tetromino = tetromino.shape;
    this.color = tetromino.color;
    this.x = 3;
    this.y = -2; // Start above the board
}

// Draw piece
Piece.prototype.draw = function () {
    for (let r = 0; r < this.tetromino.length; r++) {
        for (let c = 0; c < this.tetromino[r].length; c++) {
            if (this.tetromino[r][c]) {
                drawSquare(this.x + c, this.y + r, this.color);
            }
        }
    }
};

// Undraw piece
Piece.prototype.unDraw = function () {
    for (let r = 0; r < this.tetromino.length; r++) {
        for (let c = 0; c < this.tetromino[r].length; c++) {
            if (this.tetromino[r][c]) {
                drawSquare(this.x + c, this.y + r, empty);
            }
        }
    }
};

// Check for collisions
Piece.prototype.collision = function (x, y) {
    for (let r = 0; r < this.tetromino.length; r++) {
        for (let c = 0; c < this.tetromino[r].length; c++) {
            if (!this.tetromino[r][c]) continue;
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
    if (!this.collision(0, 1)) {
        this.unDraw();
        this.y++;
        this.draw();
    } else {
        this.lock();
        p = new Piece(randomPiece());
    }
};

// Move right
Piece.prototype.moveRight = function () {
    if (!this.collision(1, 0)) {
        this.unDraw();
        this.x++;
        this.draw();
    }
};

// Move left
Piece.prototype.moveLeft = function () {
    if (!this.collision(-1, 0)) {
        this.unDraw();
        this.x--;
        this.draw();
    }
};

// Lock piece
Piece.prototype.lock = function () {
    for (let r = 0; r < this.tetromino.length; r++) {
        for (let c = 0; c < this.tetromino[r].length; c++) {
            if (this.tetromino[r][c]) {
                board[this.y + r][this.x + c] = this.color;
            }
        }
    }
    // Check for completed rows
    for (let r = row - 1; r >= 0; r--) {
        let isFull = true;
        for (let c = 0; c < col; c++) {
            if (board[r][c] === empty) {
                isFull = false;
                break;
            }
        }
        if (isFull) {
            board.splice(r, 1);
            board.unshift(new Array(col).fill(empty));
        }
    }
};

// Create the first piece
let p = new Piece(randomPiece());
p.draw();

function drop() {
    if (!gameOver) {
        p.moveDown();
    }
    setTimeout(drop, 1000);
}

drop();

document.addEventListener("keydown", (event) => {
    if (event.key === "ArrowLeft") {
        p.moveLeft();
    } else if (event.key === "ArrowRight") {
        p.moveRight();
    } else if (event.key === "ArrowDown") {
        p.moveDown();
    } else if (event.key === "ArrowUp") {
        p.rotate();
    }
});
