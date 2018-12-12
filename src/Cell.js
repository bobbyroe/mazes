
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
            // ctx.strokeStyle = "#FF0000";
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
            // ctx.strokeStyle = "#FFFF00";
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
            // ctx.strokeStyle = "#00FF00";
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
            // ctx.strokeStyle = "#0000FF";
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
    }
    return {
        row,
        col,
        size,
        was_visited,
        was_backtracked,
        walls,
        draw
    }
}

export default createCell;