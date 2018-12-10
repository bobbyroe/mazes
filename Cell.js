// Cell.js

// Cell constructor
function createCell(row, col, size) {
    let was_visited = false;
    let was_backtracked = false;
    const walls = {
        N: row === 0,
        E: true,
        S: true,
        W: col === 0 && row !== 0 // for "entrance"
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