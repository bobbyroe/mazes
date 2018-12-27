import createMaze from "./Maze.js";
import createDFS from "./DFS.js";
import createBFS from "./BFS.js";
import createEventsManager from "./EventsManager.js"
import createUIManager from "./UIManager.js";

let canvas = document.createElement("canvas");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
document.body.appendChild(canvas);

let ctx = canvas.getContext("2d");

const eventsBus = createEventsManager();
const maze = createMaze({ 
    canvas,
    eventsBus
});
// move drawing point to proper pos
ctx.moveTo(
    maze.x,
    maze.y
);
const UI = createUIManager(eventsBus);
const searcher = createDFS({maze, eventsBus});
const solver = createBFS({maze, eventsBus});
maze.initialize();

// debug
window.maze = maze;
window.eventsBus = eventsBus;

eventsBus.listenTo("REINITIALIZE_ALL", () => {
    window.location.reload();
});