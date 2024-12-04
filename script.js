class Minesweeper {
    constructor(boardSize = 10, mineCount = 10) {
        this.boardSize = boardSize;
        this.mineCount = mineCount;
        this.board = [];
        this.gameOver = false;
        this.firstClick = true;
        this.revealedCount = 0;
        this.flagCount = 0;
        this.timer = 0;
        this.timerInterval = null;
        
        this.init();
        this.setupEventListeners();
    }

    init() {
        // Initialize empty board
        for (let i = 0; i < this.boardSize; i++) {
            this.board[i] = [];
            for (let j = 0; j < this.boardSize; j++) {
                this.board[i][j] = {
                    isMine: false,
                    revealed: false,
                    flagged: false,
                    neighborMines: 0
                };
            }
        }

        // Create DOM elements
        const board = document.getElementById('board');
        board.innerHTML = '';
        for (let i = 0; i < this.boardSize; i++) {
            for (let j = 0; j < this.boardSize; j++) {
                const cell = document.createElement('div');
                cell.className = 'cell';
                cell.dataset.row = i;
                cell.dataset.col = j;
                board.appendChild(cell);
            }
        }

        // Reset UI
        this.updateMineCount();
        this.resetTimer();
        document.getElementById('reset-button').textContent = '😊';
    }

    setupEventListeners() {
        const board = document.getElementById('board');
        board.addEventListener('click', (e) => this.handleClick(e));
        board.addEventListener('contextmenu', (e) => this.handleRightClick(e));
        document.getElementById('reset-button').addEventListener('click', () => this.resetGame());
    }

    placeMines(firstRow, firstCol) {
        let minesPlaced = 0;
        while (minesPlaced < this.mineCount) {
            const row = Math.floor(Math.random() * this.boardSize);
            const col = Math.floor(Math.random() * this.boardSize);
            
            // Don't place mine on first click or where a mine already exists
            if (!this.board[row][col].isMine && !(row === firstRow && col === firstCol)) {
                this.board[row][col].isMine = true;
                minesPlaced++;
            }
        }

        // Calculate neighbor mines
        for (let i = 0; i < this.boardSize; i++) {
            for (let j = 0; j < this.boardSize; j++) {
                if (!this.board[i][j].isMine) {
                    this.board[i][j].neighborMines = this.countNeighborMines(i, j);
                }
            }
        }
    }

    countNeighborMines(row, col) {
        let count = 0;
        for (let i = -1; i <= 1; i++) {
            for (let j = -1; j <= 1; j++) {
                const newRow = row + i;
                const newCol = col + j;
                if (newRow >= 0 && newRow < this.boardSize && 
                    newCol >= 0 && newCol < this.boardSize &&
                    this.board[newRow][newCol].isMine) {
                    count++;
                }
            }
        }
        return count;
    }

    handleClick(e) {
        const cell = e.target;
        if (!cell.classList.contains('cell') || this.gameOver) return;

        const row = parseInt(cell.dataset.row);
        const col = parseInt(cell.dataset.col);

        if (this.board[row][col].flagged) return;

        if (this.firstClick) {
            this.firstClick = false;
            this.placeMines(row, col);
            this.startTimer();
        }

        this.revealCell(row, col);
    }

    handleRightClick(e) {
        e.preventDefault();
        const cell = e.target;
        if (!cell.classList.contains('cell') || this.gameOver) return;

        const row = parseInt(cell.dataset.row);
        const col = parseInt(cell.dataset.col);

        if (!this.board[row][col].revealed) {
            this.board[row][col].flagged = !this.board[row][col].flagged;
            cell.textContent = this.board[row][col].flagged ? '🚩' : '';
            this.flagCount += this.board[row][col].flagged ? 1 : -1;
            this.updateMineCount();
        }
    }

    revealCell(row, col) {
        const cell = this.board[row][col];
        if (cell.revealed || cell.flagged) return;

        cell.revealed = true;
        this.revealedCount++;
        
        const domCell = document.querySelector(`[data-row="${row}"][data-col="${col}"]`);
        domCell.classList.add('revealed');

        if (cell.isMine) {
            this.gameOver = true;
            domCell.classList.add('mine');
            domCell.textContent = '💣';
            this.revealAllMines();
            this.endGame(false);
            return;
        }

        if (cell.neighborMines > 0) {
            domCell.textContent = cell.neighborMines;
            domCell.classList.add(`n${cell.neighborMines}`);
        } else {
            // Reveal neighbors for empty cells
            for (let i = -1; i <= 1; i++) {
                for (let j = -1; j <= 1; j++) {
                    const newRow = row + i;
                    const newCol = col + j;
                    if (newRow >= 0 && newRow < this.boardSize && 
                        newCol >= 0 && newCol < this.boardSize) {
                        this.revealCell(newRow, newCol);
                    }
                }
            }
        }

        // Check for win
        if (this.revealedCount === this.boardSize * this.boardSize - this.mineCount) {
            this.endGame(true);
        }
    }

    revealAllMines() {
        for (let i = 0; i < this.boardSize; i++) {
            for (let j = 0; j < this.boardSize; j++) {
                if (this.board[i][j].isMine) {
                    const domCell = document.querySelector(`[data-row="${i}"][data-col="${j}"]`);
                    domCell.classList.add('revealed', 'mine');
                    domCell.textContent = '💣';
                }
            }
        }
    }

    endGame(won) {
        this.gameOver = true;
        clearInterval(this.timerInterval);
        document.getElementById('reset-button').textContent = won ? '😎' : '😵';
    }

    resetGame() {
        this.gameOver = false;
        this.firstClick = true;
        this.revealedCount = 0;
        this.flagCount = 0;
        this.init();
    }

    startTimer() {
        this.resetTimer();
        this.timerInterval = setInterval(() => {
            this.timer++;
            document.getElementById('timer').textContent = this.timer;
        }, 1000);
    }

    resetTimer() {
        clearInterval(this.timerInterval);
        this.timer = 0;
        document.getElementById('timer').textContent = '0';
    }

    updateMineCount() {
        document.getElementById('mines-count').textContent = this.mineCount - this.flagCount;
    }
}

// Start the game
new Minesweeper(10, 10);
