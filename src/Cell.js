
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
        if (this.walls.N === true) {
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
        if (this.walls.W === true) {
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
        if (this.walls.E === true) {
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
        if (this.walls.S === true) {
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
        if (this.is_on_shortest_path === true) {
            // console.log("dir:", this.arrow_direction);
            ctx.fillStyle = "#FF9900";
            ctx.beginPath();
            _drawArrow(cell_x, cell_y, ctx, this.arrow_direction);
            ctx.fill();
        }
    }

    function _drawArrow(cell_x, cell_y, ctx, dir) {
        if (dir === "N") {
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
        if (dir === "E") {
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
        if (dir === "S") {
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
        if (dir === "W") {
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

    function initializeWalls () {
        this.walls = {
            N: row === 0,
            E: row !== grid_size - 1 || col !== grid_size - 1,
            S: true,
            W: col === 0 && row !== 0 // for "entrance"
        };
    }

    return {
        row,
        col,
        was_visited,
        was_backtracked,
        previous_cell,
        is_exit_cell,
        walls,
        draw,
        initializeWalls,
        arrow_direction
    }
}

export default createCell;