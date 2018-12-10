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
    const cells = _createCells(80, width);

    function draw () {
        maze.cells.forEach((row) => {

            row.forEach((cell) => {
                let cell_x = cell.col * cell.size;
                let cell_y = cell.row * cell.size;

                // fill
                ctx.fillStyle = "#000000";
                if (cell.was_visited === true) {
                    ctx.fillStyle = "#606060";    
                } 
                if (cell.was_backtracked === true) {
                    ctx.fillStyle = "#808080";
                }

                ctx.rect(
                    maze.x + cell_x + 4,
                    maze.y + cell_y + 4,
                    cell.size - 8,
                    cell.size - 8
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

    function has_unvisited_cells () {
        return cells.some((row) => { 
            return row.some((cell) => { 
                return cell.was_visited === false; 
            }); 
        });
    }

    function getRandomNeighborFor (cell) {

        let random_neighbor;
        let randex = -1;
        const c = cell.col;
        const r = cell.row;
        const c_max = cells.length - 1;
        const neighbs = [];

        function checkCell (cur_cell) {
            if (cur_cell != null && cur_cell.was_visited === false) {
                neighbs.push(cur_cell);
            }
        }

        checkCell(cells[c][r + 1]);
        checkCell(cells[c][r - 1]);
        checkCell(cells[Math.min(c + 1, c_max)][r]);
        checkCell(cells[Math.max(c - 1, 0)][r]);
        
        if (neighbs.length > 1) { 
            randex = Math.floor(Math.random() * neighbs.length);
            random_neighbor = neighbs[randex];
        } else if (neighbs.length === 1) {
            random_neighbor = neighbs[0];
        } else {
            random_neighbor = null;
        }

        return random_neighbor;
    }

    function removeWalls(cur_cell, next_cell) {
        // -1 = up / left | 0 = same | 1 = down / right
        const row_diff = next_cell.row - cur_cell.row;
        const col_diff = next_cell.col - cur_cell.col;
        
        if (row_diff === -1) {
            next_cell.walls.S = false;
            cur_cell.walls.N = false;
        }
        if (row_diff === 1) {
            next_cell.walls.N = false;
            cur_cell.walls.S = false;
        }
        if (col_diff === -1) {
            next_cell.walls.E = false;
            cur_cell.walls.W = false;
        }
        if (col_diff === 1) {
            next_cell.walls.W = false;
            cur_cell.walls.E = false;
        }
    }

    return {
        draw,
        initialize: draw,
        width,
        height,
        x,
        y,
        cells,
        has_unvisited_cells,
        getRandomNeighborFor,
        removeWalls
    };
}

// export default createMaze;