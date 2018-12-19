import createQueue from "./Queue.js";

function createBFS (maze) {
    
    let t = -1;
    const queue = createQueue();
    const delay = 50;
    function recursive_search (active_cell) {
        let next_cell;
        let a_cell;
        let adjacent_cells = maze.getAdjacentsFor(active_cell);
        let was_exit_found = false;
        
        while (adjacent_cells.length > 0) {
            a_cell = adjacent_cells.pop();
            a_cell.was_visited = true;
            a_cell.previous_cell = active_cell;

            if (a_cell.is_exit_cell === true) {
                console.log("found the exit! begin backtracking.");
                was_exit_found = true;
                break;
            } else {
                queue.enqueue(a_cell);
            }
        }
        maze.draw();
        
        if (was_exit_found === false) {
            if (queue.isEmpty() === false) {
                next_cell = queue.dequeue();
                t = setTimeout(recursive_search, delay, next_cell);
            } else {
                console.log("oh no, I didn't find the exit!");
            }
        } else {
            find_pathback(a_cell);
        }
    }
    function find_pathback (exit_cell) {
        let next_cell = exit_cell;
        const path_cells = [];
        while (next_cell != null) {
            path_cells.push(next_cell);
            next_cell = next_cell.previous_cell;
        } 
        path_cells.reverse();
        
        // recursively draw solution
        let inc = 0;
        function recursive_pathback (cell) {
            cell.markForShortestPath(true);
            maze.draw();
            inc += 1;
            if (path_cells[inc] != null) {
                t = setTimeout(recursive_pathback, delay, path_cells[inc]);
            } else {
                console.log("DONE");
            }
        }
        recursive_pathback(path_cells[inc]);
    }

    function start() {

        let start_cell = maze.cells[0][0];
        start_cell.was_visited = true;

        recursive_search(start_cell);
    }

    return {
        start
    }
}

// https://en.wikipedia.org/wiki/Maze_solving_algorithm

export default createBFS


/*

start with 1st cell
mark it visited
---------

*mark it as active cell*
for each unvisited neighbor cell:
    mark it visited
    record it's parent / previous cell
    add it to the queue

if queue is not empty
    pop next cell from queue
else 
    we're done!
    backtrack to the start cell
*/