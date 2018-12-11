// Cell.js

// Cell constructor
function createCell(row, col, size, grid_size) {
    let was_visited = false;
    let was_backtracked = false;
    const walls = {
        N: row === 0,
        E: row !== grid_size - 1 || col !== grid_size - 1,
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