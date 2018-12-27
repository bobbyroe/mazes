import createQueue from "./Queue.js";

function createBFS (app) {
    
    const { maze, eventsBus } = app;
    let t = -1;
    const queue = createQueue();
    const delay = 20;
    function recursive_search (active_cell) {
        let next_cell;
        let a_cell;
        let adjacent_cells = maze.getAdjacentsFor(active_cell);
        let was_exit_found = false;
        
        while (adjacent_cells.length > 0) {
            a_cell = adjacent_cells.pop();
            maze.markAsVisited(a_cell);
            maze.setPreviousCell({ 
                for: a_cell, 
                with: active_cell
            });

            if (a_cell.is_exit_cell === true) {
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
            next_cell = maze.getPreviousCell(next_cell);
        } 
        path_cells.reverse();
        
        function getPathDirection (cell) {
            let dir = "E";
            let row_diff;
            let col_diff;
            const prev_cell = maze.getPreviousCell(cell);
            if (prev_cell != null) {
                row_diff = cell.row - prev_cell.row;
                col_diff = cell.col - prev_cell.col;
                if (row_diff === -1) {
                    dir = "N"
                }
                if (row_diff === 1) {
                    dir = "S"
                }
                if (col_diff === -1) {
                    dir = "W"
                }
                if (col_diff === 1) {
                    dir = "E"
                }
            }
            return dir;
        }

        // recursively draw solution
        let inc = 0;
        function recursive_pathback (cell) {
            let dir = getPathDirection(cell);
            cell.markForShortestPathWithDirection(true, dir);
            maze.draw();
            inc += 1;
            if (path_cells[inc] != null) {
                t = setTimeout(recursive_pathback, delay, path_cells[inc]);
            } else {
                eventsBus.dispatch("MAZE_SOLVED");
            }
        }
        recursive_pathback(path_cells[inc]);
    }

    function start() {
        maze.clear();
        let start_cell = maze.cells[0][0];
        maze.markAsVisited(start_cell);

        recursive_search(start_cell);
    }

    eventsBus.listenTo("FIND_PATH", start);

    // API
    return {
        start
    }
}

// https://en.wikipedia.org/wiki/Maze_solving_algorithm

export default createBFS;