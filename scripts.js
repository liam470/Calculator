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

// Tetromino shapes
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

// Random piece
function randomPiece() {
    const pieces = [
        [Z, "red"],
        [S, "green"],
        [T, "purple"],
        [O, "yellow"],
        [L, "orange"],
        [I, "cyan"],
        [J, "blue"]
    ];
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
    this.y = -2; // Start above the board
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
                    alert("Game Over!");
                    gameOver = true;
                    return;
                }
                board[this.y + r][this.x + c] = this.color;
            }
        }
    }
    // Check for lines
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

let p = randomPiece();
p.draw();

function drop() {
    if (!gameOver) {
        p.moveDown();
    }
    setTimeout(drop, 1000);
}

drop();

// Control the piece
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
