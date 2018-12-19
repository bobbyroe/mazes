import createMaze from "./Maze.js";
import createDFS from "./DFS.js";
import createBFS from "./BFS.js";

let canvas = document.createElement("canvas");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
document.body.appendChild(canvas);

let ctx = canvas.getContext("2d");

const maze = createMaze(600, 600, canvas, ctx);
const searcher = createDFS(maze);
const solver = createBFS(maze);
// move drawing point to proper pos
ctx.moveTo(
    maze.x,
    maze.y
);

maze.initialize();

// debug
window.maze = maze;

// Event Handlers
document.body.addEventListener("click", (evt) => {

    if (evt.target.classList.contains("disabled") === false) {
     
        if (evt.target.id === "create_maze") {
            searcher.start();
        }

        if (evt.target.id === "find_path") {
            maze.clear();
            solver.start();
        }
    }
});