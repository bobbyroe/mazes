import createMaze from "./Maze.js";
import createSearcher from "./DFS.js";

let canvas = document.createElement("canvas");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
document.body.appendChild(canvas);

let ctx = canvas.getContext("2d");

const maze = createMaze(600, 600, canvas, ctx);
const searcher = createSearcher(maze);

// move drawing point to proper pos
ctx.moveTo(
    maze.x,
    maze.y
);

maze.initialize();
searcher.start();