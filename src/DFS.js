function createDFS (app) {

    const { maze, eventsBus } = app;
    const my_stack = [];
    let t = -1;
    let max_delay = 10;
    let delay = max_delay * 0.5;
    let DFS_was_completed = false;
    function recursive_backtracker(current_cell) {
        current_cell.was_visited = true;
        if (maze.has_unvisited_cells() === true) {
            let next_cell = maze.getRandomNeighborFor(current_cell);

            if (next_cell !== null) {
                // push the CURRENT CELL –
                // NOT the /next/ cell
                my_stack.push(current_cell); 
                maze.removeWalls(current_cell, next_cell);

            } else if (my_stack.length > 0) {
                next_cell = my_stack.pop();
                next_cell.was_backtracked = true;
                delay = max_delay * 0.1;
            }
            maze.draw();

            t = setTimeout(() => { recursive_backtracker(next_cell); }, delay);
        } else {
            maze.draw();
            eventsBus.dispatch("MAZE_CREATED");
            DFS_was_completed = true;
        }
    }

    function handleCreateMaze () {
        if (DFS_was_completed === false) {
            start();
        } else {
            maze.reinititalize();
        }
    }

    function handleMazeInit () {
        DFS_was_completed = false;
    }

    function start() {
        recursive_backtracker(maze.cells[0][0]);
    }

    eventsBus.listenTo("MAZE_INITIALIZED", handleMazeInit);
    eventsBus.listenTo("CREATE_MAZE", handleCreateMaze);
    return {
        start
    };
}
// https://en.wikipedia.org/wiki/Maze_generation_algorithm#Recursive_backtracker

export default createDFS;