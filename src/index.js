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

eventsBus.listenTo("REINITIALIZE_ALL", () => {
    window.location.reload();
});
/*
// maze publish -> MAZE_INITIALIZED
// DFS publish -> MAZE_CREATED
// BFS publish -> MAZE_SOLVED
// UIManager publish -> CREATE_MAZE
// UIManager publish -> FIND_PATH

// UIManager subsc: MAZE_INITIALIZED
    .create_maze is enabled, text is "Create Maze"
    .find_path is disabled

// UIManager subsc: MAZE_CREATED
    .create_maze is enabled, text is "Recreate Maze"
    .find_path is enabled

// UIManager subsc: MAZE_SOLVED
    .create_maze is enabled, text is "Recreate Maze"
    .find_path is disabled

// DFS subsc: CREATE_MAZE
    searcher.start();

// BFS subsc: FIND_PATH
    maze.clear();
    solver.start();

UIManager needs access to publish and subsc
DFS needs access to publish and subsc
BFS needs access to publish and subsc
maze needs access to publish
*/