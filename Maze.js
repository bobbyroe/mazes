// import createCell from "./Cell.js";
// Maze.js

// private
function _createCells(cell_size, width) {
    let grid_size = Math.floor(width / cell_size);
    const cells = [];
    for (let row = 0; row < grid_size; row += 1) {
        let cur_row = [];
        for (let col = 0; col < grid_size; col += 1) {
            cur_row.push(createCell(row, col, cell_size));
        }
        cells.push(cur_row);
    }
    return cells;
}

// Maze constructor
function createMaze(width, height, canvas, ctx) {
    const middle = {
        x: canvas.width * 0.5,
        y: canvas.height * 0.5
    }
    const x = middle.x - width * 0.5;
    const y = middle.y - height * 0.5;
    const cells = _createCells(40, width);

    function draw () {
        maze.cells.forEach((row) => {

            row.forEach((cell) => {
                let cell_x = cell.col * cell.size;
                let cell_y = cell.row * cell.size;

                // fill
                if (cell.was_visited === true) {
                    ctx.fillStyle = "#202020";    
                } else {
                    ctx.fillStyle   = "#000000";
                }

                ctx.rect(
                    maze.x + cell_x,
                    maze.y + cell_y,
                    cell.size,
                    cell.size
                );
                ctx.fill();

                // stroke
                if (cell.walls.N === true) {
                    ctx.beginPath();
                    ctx.moveTo(
                        maze.x + cell_x,
                        maze.y + cell_y
                    );
                    ctx.lineTo(
                        maze.x + cell_x + cell.size,
                        maze.y + cell_y
                    );
                    ctx.stroke();
                }
                if (cell.walls.W === true) {
                    ctx.beginPath();
                    ctx.moveTo(
                        maze.x + cell_x,
                        maze.y + cell_y
                    );
                    ctx.lineTo(
                        maze.x + cell_x,
                        maze.y + cell_y + cell.size
                    );
                    ctx.stroke();
                }
                if (cell.walls.E === true) {
                    ctx.beginPath();
                    ctx.moveTo(
                        maze.x + cell_x + cell.size,
                        maze.y + cell_y + cell.size
                    );
                    ctx.lineTo(
                        maze.x + cell_x + cell.size,
                        maze.y + cell_y
                    );
                    ctx.stroke();
                }
                if (cell.walls.S === true) {
                    ctx.beginPath();
                    ctx.moveTo(
                        maze.x + cell_x + cell.size,
                        maze.y + cell_y + cell.size
                    );
                    ctx.lineTo(
                        maze.x + cell_x,
                        maze.y + cell_y + cell.size
                    );
                    ctx.stroke();
                }
            });
        });
    }

    return {
        draw,
        initialize: draw,
        width,
        height,
        x,
        y,
        cells
    };
}

// export default createMaze;