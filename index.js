// import createMaze from "./Maze.js";

// create canvas
let canvas = document.createElement("canvas");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
document.body.appendChild(canvas);

// get context
let ctx = canvas.getContext("2d");
ctx.strokeStyle = "#00CCFF";
ctx.fillStyle = "#000000";
ctx.lineWidth = 1;



const maze = createMaze(400, 400, canvas, ctx);


// move drawing point to proper pos
ctx.moveTo(
    maze.x,
    maze.y
);

maze.initialize();

// recursive backtracker
const my_stack = [];
let t = -1;
function recursive_backtracker(current_cell) {
    current_cell.was_visited = true;
    if (maze.has_unvisited_cells() === true) {
        let next_cell = maze.getRandomNeighborFor(current_cell);

        if (next_cell !== null) {
            my_stack.push(current_cell);
            // remove walls from current cell / neighboring cell
            maze.removeWalls(current_cell, next_cell);
            
        } else if (my_stack.length > 0) {
            next_cell = my_stack.pop();
            next_cell.was_backtracked = true;
        }
        maze.draw();
        // console.log(current_cell, next_cell);
        
        clearTimeout(t);
        t = setTimeout( () => { recursive_backtracker(next_cell); }, 1000);
    } else {
        console.log("done!");
    }
}
// start
recursive_backtracker(maze.cells[0][0]);


// https://en.wikipedia.org/wiki/Maze_generation_algorithm#Recursive_backtracker