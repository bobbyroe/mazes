
// Cell constructor
function createCell(row, col, size, grid_size) {
    let was_visited = false;
    let was_backtracked = false;
    let previous_cell;
    let is_exit_cell = (row === grid_size - 1)
            && (col === grid_size - 1);
    let walls;
    initializeWalls();
    let is_on_shortest_path = false;
    
    function draw (maze_pos, ctx) {

        let { x: maze_x, y: maze_y } = maze_pos;
        let cell_x = col * size;
        let cell_y = row * size;
        ctx.beginPath();
        ctx.rect(
            maze_x + cell_x,
            maze_y + cell_y,
            size,
            size
        );
        ctx.fill();

        // stroke
        if (walls.N === true) {
            ctx.beginPath();
            ctx.moveTo(
                maze_x + cell_x,
                maze_y + cell_y
            );
            ctx.lineTo(
                maze_x + cell_x + size,
                maze_y + cell_y
            );
            ctx.stroke();
        }
        if (walls.W === true) {
            ctx.beginPath();
            ctx.moveTo(
                maze_x + cell_x,
                maze_y + cell_y
            );
            ctx.lineTo(
                maze_x + cell_x,
                maze_y + cell_y + size
            );
            ctx.stroke();
        }
        if (walls.E === true) {
            ctx.beginPath();
            ctx.moveTo(
                maze_x + cell_x + size,
                maze_y + cell_y + size
            );
            ctx.lineTo(
                maze_x + cell_x + size,
                maze_y + cell_y
            );
            ctx.stroke();
        }
        if (walls.S === true) {
            ctx.beginPath();
            ctx.moveTo(
                maze_x + cell_x + size,
                maze_y + cell_y + size
            );
            ctx.lineTo(
                maze_x + cell_x,
                maze_y + cell_y + size
            );
            ctx.stroke();
        }
        if (is_on_shortest_path === true) {
            ctx.fillStyle = "#FF9900";
            ctx.beginPath();
            ctx.arc(
                maze_x + cell_x + size * 0.5,
                maze_y + cell_y + size * 0.5, 
                size * 0.1, 
                0, 
                2 * Math.PI);
            ctx.fill();
        }
    }

    function removeWall (on_side) {
        walls[on_side] = false;
    }

    function initializeWalls () {
        walls = {
            N: row === 0,
            E: row !== grid_size - 1 || col !== grid_size - 1,
            S: true,
            W: col === 0 && row !== 0 // for "entrance"
        };
    }

    function markForShortestPath (is_shortest) {
        is_on_shortest_path = is_shortest;
    }

    return {
        row,
        col,
        size,
        was_visited,
        was_backtracked,
        previous_cell,
        is_exit_cell,
        walls,
        draw,
        markForShortestPath,
        initializeWalls,
        removeWall
    }
}

export default createCell;