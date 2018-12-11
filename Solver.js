function createSolver(maze) {

    // recursive backtracker
    const my_stack = [];
    let t = -1;
    let delay = 100;
    function recursive_backtracker(current_cell) {
        current_cell.was_visited = true;
        if (maze.has_unvisited_cells() === true) {
            let next_cell = maze.getRandomNeighborFor(current_cell);

            if (next_cell !== null) {
                my_stack.push(current_cell);
                // remove walls from current cell / neighboring cell
                maze.removeWalls(current_cell, next_cell);
                delay = 50;

            } else if (my_stack.length > 0) {
                next_cell = my_stack.pop();
                next_cell.was_backtracked = true;
                delay = 10;
            }
            maze.draw();
            // console.log(current_cell, next_cell);

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
// export default createSolver;