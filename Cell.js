// Cell.js

// Cell constructor
function createCell(row, col, size) {
    let was_visited = false;
    let was_backtracked = false;
    const walls = {
        N: col === 0,
        E: true,
        S: true,
        W: row === 0
    };

    return {
        row,
        col,
        size,
        was_visited,
        was_backtracked,
        walls
    }
}

// export default createCell;