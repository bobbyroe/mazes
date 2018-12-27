import createCell from "./Cell.js";
import createMazeManager from "./MazeManager.js";

// private
const width = 600;
const height = 600;
const cell_size = 60;

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
// @config_obj - 
function createMaze (config_obj) {
    const { canvas, eventsBus } = config_obj;
    const ctx = canvas.getContext("2d");
    const middle = {
        x: canvas.width * 0.5,
        y: canvas.height * 0.5
    }
    const x = middle.x - width * 0.5;
    const y = middle.y - height * 0.5;
    const cells = _createCells(cell_size, width);
    const manager = createMazeManager(cells);
    
    // set wall thinkness
    // TODO: move to cell?
    ctx.lineWidth = 4;
    ctx.strokeStyle = "#00CCFF";

    function draw () {
        ctx.clearRect(x, y, width, height);
        cells.forEach((row) => {

            row.forEach((cell) => {
                // fill style
                ctx.fillStyle = "#000000";
                if (cell.checkIfVisited() === true) {
                    ctx.fillStyle = "#202020";    
                } 
                if (cell.checkIfBacktracked() === true) {
                    ctx.fillStyle = "#202040";
                }
                cell.draw({ x, y }, ctx);
            });
        });
    }

    function initialize () {
        // move drawing point to proper pos
        ctx.moveTo( x, y );
        draw();
        eventsBus.dispatch("MAZE_INITIALIZED");
    }

    // clears cells for path finding only
    function clear() {
        cells.forEach((row) => {
            row.forEach((c) => {
                c.clear();
            });
        });
        draw();
    }

    function has_unvisited_cells () {
        return cells.some((row) => { 
            return row.some((cell) => { 
                return cell.checkIfVisited() === false; 
            }); 
        });
    }

    // cell management
    function markAsVisited (cell) {
        cell.markAsVisited();
    }

    function markAsBacktracked (cell) {
        cell.markAsBacktracked();
    }

    function setPreviousCell (obj) {
        const {for: cur_cell, with: other_cell} = obj;
        cur_cell.setPreviousCell(other_cell);
    }

    function getPreviousCell (cell) {
        return cell.getPreviousCell();
    }

    return {
        clear,
        draw,
        initialize,
        cells,
        has_unvisited_cells,
        getRandomNeighborFor: manager.getRandomNeighborFor,
        getAdjacentsFor: manager.getAdjacentsFor,
        removeWalls: manager.removeWalls,
        markAsVisited,
        markAsBacktracked,
        setPreviousCell,
        getPreviousCell
    };
}

export default createMaze;