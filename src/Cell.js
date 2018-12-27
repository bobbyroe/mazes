
// Cell constructor
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
    
    function draw (maze_pos, ctx) {

        let { x: maze_x, y: maze_y } = maze_pos;
        let cell_x = maze_x + (col * size);
        let cell_y = maze_y + (row * size);

        ctx.beginPath();
        ctx.rect(
            cell_x,
            cell_y,
            size,
            size
        );
        ctx.fill();

        // stroke
        if (walls.N === true) {
            ctx.beginPath();
            ctx.moveTo(
                cell_x,
                cell_y
            );
            ctx.lineTo(
                cell_x + size,
                cell_y
            );
            ctx.stroke();
        }
        if (walls.W === true) {
            ctx.beginPath();
            ctx.moveTo(
                cell_x,
                cell_y
            );
            ctx.lineTo(
                cell_x,
                cell_y + size
            );
            ctx.stroke();
        }
        if (walls.E === true) {
            ctx.beginPath();
            ctx.moveTo(
                cell_x + size,
                cell_y + size
            );
            ctx.lineTo(
                cell_x + size,
                cell_y
            );
            ctx.stroke();
        }
        if (walls.S === true) {
            ctx.beginPath();
            ctx.moveTo(
                cell_x + size,
                cell_y + size
            );
            ctx.lineTo(
                cell_x,
                cell_y + size
            );
            ctx.stroke();
        }
        // draw direction arrow
        if (is_on_shortest_path === true) {
            ctx.fillStyle = "#FF9900";
            ctx.beginPath();
            _drawArrow(cell_x, cell_y, ctx);
            ctx.fill();
        }
    }

    function _drawArrow(cell_x, cell_y, ctx) {
        if (arrow_direction === "N") {
            ctx.moveTo(
                cell_x + size * 0.5,
                cell_y + size * 0.5
            );
            ctx.lineTo(
                cell_x + size * 0.6,
                cell_y + size * 0.85
            );
            ctx.lineTo(
                cell_x + size * 0.4,
                cell_y + size * 0.85
            );
        }
        if (arrow_direction === "E") {
            ctx.moveTo(
                cell_x + size * 0.5,
                cell_y + size * 0.5
            );
            ctx.lineTo(
                cell_x + size * 0.15,
                cell_y + size * 0.6
            );
            ctx.lineTo(
                cell_x + size * 0.15,
                cell_y + size * 0.4
            );
        }
        if (arrow_direction === "S") {
            ctx.moveTo(
                cell_x + size * 0.5,
                cell_y + size * 0.5
            );
            ctx.lineTo(
                cell_x + size * 0.4,
                cell_y + size * 0.15
            );
            ctx.lineTo(
                cell_x + size * 0.6,
                cell_y + size * 0.15
            );
        }
        if (arrow_direction === "W") {
            ctx.moveTo(
                cell_x + size * 0.5,
                cell_y + size * 0.5
            );
            ctx.lineTo(
                cell_x + size * 0.85,
                cell_y + size * 0.4
            );
            ctx.lineTo(
                cell_x + size * 0.85,
                cell_y + size * 0.6
            );
        }
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
        was_visited,
        was_backtracked,
        previous_cell,
        is_exit_cell,
        walls,
        draw,
        markForShortestPathWithDirection,
        removeWall
    }
}

export default createCell;