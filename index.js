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
const my_stack = [];

// move drawing point to proper pos
ctx.moveTo(
    maze.x,
    maze.y
);

maze.initialize();

maze.cells[0][0].was_visited = true;
maze.draw();

// https://en.wikipedia.org/wiki/Maze_generation_algorithm#Recursive_backtracker