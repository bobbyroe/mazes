// import createCell from "./Cell.js";
// Maze.js

// private
function _createCells(cell_size, width) {
    let grid_size = Math.floor(width / cell_size);
    const cells = [];
    for (let row = 0; row < grid_size; row += 1) {
        let cur_row = [];
        for (let col = 0; col < grid_size; col += 1) {
            cur_row.push(createCell(row, col, cell_size, grid_size));
        }
        cells.push(cur_row);
    }
    return cells;
}

// Maze constructor
function createMaze(width, height, canvas, ctx) {

    const cell_size = 40;
    const middle = {
        x: canvas.width * 0.5,
        y: canvas.height * 0.5
    }
    const x = middle.x - width * 0.5;
    const y = middle.y - height * 0.5;
    const cells = _createCells(cell_size, width);

    // set wall thinkness
    ctx.lineWidth = 6;
    ctx.strokeStyle = "#00CCFF";
    function draw () {
        ctx.clearRect(x, y, width, height);
        maze.cells.forEach((row) => {

            row.forEach((cell) => {
                // fill style
                ctx.fillStyle = "#000000";
                if (cell.was_visited === true) {
                    ctx.fillStyle = "#202020";    
                } 
                if (cell.was_backtracked === true) {
                    ctx.fillStyle = "#202040";
                }

                cell.draw(maze, ctx);
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
        const r_max = cells.length - 1;
        const neighbs = [];

        function checkCell (cur_cell) {
            if (cur_cell != null && cur_cell.was_visited === false) {
                neighbs.push(cur_cell);
            }
        }

        checkCell(cells[r][c + 1]);
        checkCell(cells[r][c - 1]);
        checkCell(cells[Math.min(r + 1, r_max)][c]);
        checkCell(cells[Math.max(r - 1, 0)][c]);
        
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