
// create canvas
let canvas = document.createElement("canvas");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
document.body.appendChild(canvas);

// get context
let ctx = canvas.getContext("2d");
ctx.strokeStyle = "#00CCFF";
ctx.lineWidth = 1;



const maze = createMaze(400, 400);

// move drawing point to proper pos
ctx.moveTo(
    maze.grid.x,
    maze.grid.y
);

maze.grid.cells.forEach ( (row) => {
    
    row.forEach( (cell) => {
        let cell_x = cell.row * cell.size;
        let cell_y = cell.col * cell.size; 
        if (cell.walls.N === true) {
            ctx.beginPath();
            ctx.moveTo(
                maze.grid.x + cell_x,
                maze.grid.y + cell_y
            );
            ctx.lineTo(
                maze.grid.x + cell_x + cell.size, 
                maze.grid.y
                );
            ctx.stroke();    
        }
        if (cell.walls.W === true) {
            ctx.beginPath();
            ctx.moveTo(
                maze.grid.x + cell_x,
                maze.grid.y + cell_y
            );
            ctx.lineTo(
                maze.grid.x + cell_x, 
                maze.grid.y + cell_y + cell.size
                );
            ctx.stroke();
        }
        if (cell.walls.E === true) {
            ctx.beginPath();
            ctx.moveTo(
                maze.grid.x + cell_x + cell.size,
                maze.grid.y + cell_y + cell.size
            );
            ctx.lineTo(
                maze.grid.x + cell_x + cell.size,
                maze.grid.y + cell_y
            );
            ctx.stroke();
        }
        if (cell.walls.S === true) {
            ctx.beginPath();
            ctx.moveTo(
                maze.grid.x + cell_x + cell.size,
                maze.grid.y + cell_y + cell.size
            );
            ctx.lineTo(
                maze.grid.x + cell_x,
                maze.grid.y + cell_y + cell.size
            );
            ctx.stroke();
        }
    });
});


function createMaze (width, height) {
    const middle = {
        x: canvas.width * 0.5,
        y: canvas.height * 0.5
    }
    const x = middle.x - width * 0.5;
    const y = middle.y - height * 0.5
    return {
        grid: {
            width,
            height,
            x,
            y,
            cells: createCells(40, width)
        }
    };
}

function createCell(row, col, size) {
    let was_visited = false;
    let was_backtracked = false;
    const walls = {
        N: col === 0,
        E: true,
        S: true,
        W: row === 0
    };

    return {
        row,
        col,
        size,
        was_visited,
        was_backtracked,
        walls
    }
}

// init maze
function createCells(cell_size, width) {
    let grid_size = Math.floor(width / cell_size);
    const cells = [];
    for (let col = 0; col < grid_size; col += 1) {
        let cur_row = [];
        for (let row = 0; row < grid_size; row += 1) {
            cur_row.push(createCell(row, col, cell_size));
        }
        cells.push(cur_row);
    }
    return cells;
}
// https://en.wikipedia.org/wiki/Maze_generation_algorithm#Recursive_backtracker