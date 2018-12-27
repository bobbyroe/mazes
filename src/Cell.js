import getStylus from "./CellStylus.js";
// constructor
function createCell(row, col, size, grid_size) {
    let was_visited = false;
    let was_backtracked = false;
    let previous_cell;
    let is_exit_cell = (row === grid_size - 1)
            && (col === grid_size - 1);
    let walls = {
        N: row === 0,
        E: row !== grid_size - 1 || col !== grid_size - 1,
        S: true,
        W: col === 0 && row !== 0 // for "entrance"
    };
    let is_on_shortest_path = false;
    let arrow_direction = "";
    const stylus = getStylus();
    
    function draw (maze_pos, ctx) {

        let { x: maze_x, y: maze_y } = maze_pos;
        let cell_x = maze_x + (col * size);
        let cell_y = maze_y + (row * size);

        // fill style
        ctx.fillStyle = "#000000";
        if (was_visited === true) {
            ctx.fillStyle = "#202020";
        }
        if (was_backtracked === true) {
            ctx.fillStyle = "#202040";
        }

        stylus.drawCell({
            walls,
            cell_x,
            cell_y,
            size,
            ctx
        });

        // draw direction arrow
        if (is_on_shortest_path === true) {
            stylus.drawArrow({
                arrow_direction,
                cell_x,
                cell_y,
                size,
                ctx
            });
        }
    }

    function clear () {
        was_visited = false;
        was_backtracked = false;
    }

    function markAsVisited () {
        was_visited = true;
    }

    function checkIfVisited () {
        return was_visited;
    }

    function markAsBacktracked() {
        was_backtracked = true;
    }

    function checkIfBacktracked() {
        return was_backtracked;
    }

    function setPreviousCell (cell) {
        previous_cell = cell;
    }
    function getPreviousCell () {
        return previous_cell;
    }

    function removeWall (on_side) {
        walls[on_side] = false;
    }

    function markForShortestPathWithDirection (is_shortest, dir) {
        is_on_shortest_path = is_shortest;
        arrow_direction = dir;
    }

    return {
        row,
        col,
        size,
        is_exit_cell,
        walls,
        draw,
        markForShortestPathWithDirection,
        removeWall,
        clear,
        markAsVisited,
        checkIfVisited,
        markAsBacktracked,
        checkIfBacktracked,
        setPreviousCell,
        getPreviousCell
    }
}

export default createCell;