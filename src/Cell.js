
// Cell constructor
function createCell(row, col, size, grid_size) {
    let was_visited = false;
    let was_backtracked = false;
    let previous_cell;
    let is_exit_cell = (row === grid_size - 1)
            && (col === grid_size - 1);
    let walls;
    initializeWalls();
    let direction_to_shortest_path = "";
    
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
        if (direction_to_shortest_path !== "") {
            ctx.fillStyle = "#FF9900";
            ctx.beginPath();
            ctx.moveTo(
                maze_x + cell_x + size * 0.5,
                maze_y + cell_y + size * 0.25
            ); 
            ctx.lineTo(
                maze_x + cell_x + size * 0.6,
                maze_y + cell_y + size * 0.6
            );
            ctx.lineTo(
                maze_x + cell_x + size * 0.4,
                maze_y + cell_y + size * 0.6
            );
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

    function markDirectionForShortestPath (dir) {
        direction_to_shortest_path = dir;
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
        markDirectionForShortestPath,
        initializeWalls,
        removeWall
    }
}

export default createCell;