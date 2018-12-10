// import createCell from "./Cell.js";
// Maze.js

function _createCells(cell_size, width) {
    let grid_size = Math.floor(width / cell_size);
    const cells = [];
    for (let col = 0; col < grid_size; col += 1) {
        let cur_row = [];
        for (let row = 0; row < grid_size; row += 1) {
            cur_row.push(createCell(row, col, cell_size));
        }
        cells.push(cur_row);
    }
    return cells;
}

// Maze constructor
function createMaze(width, height, canvas) {
    const middle = {
        x: canvas.width * 0.5,
        y: canvas.height * 0.5
    }
    const x = middle.x - width * 0.5;
    const y = middle.y - height * 0.5;
    const cells = _createCells(40, width);

    function initialize () {
        maze.grid.cells.forEach((row) => {

            row.forEach((cell) => {
                let cell_x = cell.row * cell.size;
                let cell_y = cell.col * cell.size;
                if (cell.walls.N === true) {
                    ctx.beginPath();
                    ctx.moveTo(
                        maze.grid.x + cell_x,
                        maze.grid.y + cell_y
                    );
                    ctx.lineTo(
                        maze.grid.x + cell_x + cell.size,
                        maze.grid.y
                    );
                    ctx.stroke();
                }
                if (cell.walls.W === true) {
                    ctx.beginPath();
                    ctx.moveTo(
                        maze.grid.x + cell_x,
                        maze.grid.y + cell_y
                    );
                    ctx.lineTo(
                        maze.grid.x + cell_x,
                        maze.grid.y + cell_y + cell.size
                    );
                    ctx.stroke();
                }
                if (cell.walls.E === true) {
                    ctx.beginPath();
                    ctx.moveTo(
                        maze.grid.x + cell_x + cell.size,
                        maze.grid.y + cell_y + cell.size
                    );
                    ctx.lineTo(
                        maze.grid.x + cell_x + cell.size,
                        maze.grid.y + cell_y
                    );
                    ctx.stroke();
                }
                if (cell.walls.S === true) {
                    ctx.beginPath();
                    ctx.moveTo(
                        maze.grid.x + cell_x + cell.size,
                        maze.grid.y + cell_y + cell.size
                    );
                    ctx.lineTo(
                        maze.grid.x + cell_x,
                        maze.grid.y + cell_y + cell.size
                    );
                    ctx.stroke();
                }
            });
        });
    }
    return {
        initialize,
        grid: {
            width,
            height,
            x,
            y,
            cells
        }
    };
}

// export default createMaze;