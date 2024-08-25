const board = document.getElementById('board');
let cells = [];
let selectedCell = null;

function createBoard() {
    for (let i = 0; i < 64; i++) {
        const cell = document.createElement('div');
        cell.classList.add('cell');
        if ((i + Math.floor(i / 8)) % 2 === 0) {
            cell.classList.add('white');
        } else {
            cell.classList.add('black');
        }
        cell.dataset.index = i;
        cell.addEventListener('click', () => cellClicked(i));
        board.appendChild(cell);
        cells.push(cell);
    }
}

function cellClicked(index) {
    const cell = cells[index];
    if (!selectedCell && cell.classList.contains('black')) {
        selectedCell = cell;
        selectedCell.classList.add('selected');
    } else if (selectedCell) {
        const selectedIndex = parseInt(selectedCell.dataset.index);
        const diff = Math.abs(selectedIndex - index);
        if (diff === 7 || diff === 9) {
            if (!cells[index].querySelector('.piece')) {
                cells[index].appendChild(selectedCell.querySelector('.piece'));
                selectedCell.classList.remove('selected');
                selectedCell = null;
            }
        }
    }
}

function initializePieces() {
    cells.forEach((cell, index) => {
        if (index >= 0 && index < 24 && cell.classList.contains('black')) {
            const piece = document.createElement('div');
            piece.classList.add('piece', 'white');
            cell.appendChild(piece);
        } else if (index >= 40 && index < 64 && cell.classList.contains('black')) {
            const piece = document.createElement('div');
            piece.classList.add('piece', 'black');
            cell.appendChild(piece);
        }
    });
}

createBoard();
initializePieces();
