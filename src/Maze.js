import createCell from "./Cell.js";
import createMazeManager from "./MazeManager.js";
import createEventsManager from "./EventsManager.js"
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
// @config_obj 
function createMaze( config_obj) {
    const { width, height, canvas } = config_obj;
    const eventsBus = createEventsManager();
    const cell_size = 40;
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
                if (cell.was_visited === true) {
                    ctx.fillStyle = "#202020";    
                } 
                if (cell.was_backtracked === true) {
                    ctx.fillStyle = "#202040";
                }
                cell.draw({ x, y }, ctx);
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

    function clear () {
        cells.forEach( (row) => {
            row.forEach( (c) => {
                c.was_visited = false;
                c.was_backtracked = false;
            });
        });
        draw();
    }

    return {
        clear,
        draw,
        initialize: draw,
        width,
        height,
        x,
        y,
        cells,
        has_unvisited_cells,
        getRandomNeighborFor: manager.getRandomNeighborFor,
        getAdjacentsFor: manager.getAdjacentsFor,
        removeWalls: manager.removeWalls,
        eventsBus
    };
}

export default createMaze;