function createSearcher (maze) {

    const my_stack = [];
    let t = -1;
    let delay = 100;
    function recursive_backtracker(current_cell) {
        current_cell.was_visited = true;
        if (maze.has_unvisited_cells() === true) {
            let next_cell = maze.getRandomNeighborFor(current_cell);

            if (next_cell !== null) {
                my_stack.push(current_cell);
                maze.removeWalls(current_cell, next_cell);
                delay = 50;

            } else if (my_stack.length > 0) {
                next_cell = my_stack.pop();
                next_cell.was_backtracked = true;
                delay = 10;
            }
            maze.draw();

            clearTimeout(t);
            t = setTimeout(() => { recursive_backtracker(next_cell); }, delay);
        } else {
            maze.draw();
            console.log("done!");
        }
    }

    function start() {
        recursive_backtracker(maze.cells[0][0]);
    }

    return {
        start
    };
}
// https://en.wikipedia.org/wiki/Maze_generation_algorithm#Recursive_backtracker

export default createSearcher;