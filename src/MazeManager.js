function createMazeManager (cells) {

    function getRandomNeighborFor(cell) {
        let random_neighbor;
        let randex = -1;
        const c = cell.col;
        const r = cell.row;
        const r_max = cells.length - 1;
        const neighbs = [];

        function checkCell(cur_cell) {
            if (cur_cell != null && cur_cell.checkIfVisited() === false) {
                neighbs.push(cur_cell);
            }
        }
        checkCell(cells[r][c + 1]);
        checkCell(cells[r][c - 1]);
        checkCell(cells[Math.min(r + 1, r_max)][c]);
        checkCell(cells[Math.max(r - 1, 0)][c]);

        if (neighbs.length > 1) {
            randex = Math.floor(Math.random() * neighbs.length);
            random_neighbor = neighbs[randex];
        } else if (neighbs.length === 1) {
            random_neighbor = neighbs[0];
        } else {
            random_neighbor = null;
        }

        return random_neighbor;
    }

    function getAdjacentsFor (cell) {
        const neighbs = [];
        const c = cell.col;
        const r = cell.row;
        const r_max = cells.length - 1;

        function hasWallsBetween (cur_cell, next_cell) {
            const row_diff = next_cell.row - cur_cell.row;
            const col_diff = next_cell.col - cur_cell.col;
            let has_walls = false;

            if (row_diff === -1) {
                has_walls = next_cell.walls.S === true
                    || cur_cell.walls.N === true;
            }
            if (row_diff === 1) {
                has_walls = next_cell.walls.N === true
                    || cur_cell.walls.S === true;
            }
            if (col_diff === -1) {
                has_walls = next_cell.walls.E === true
                    || cur_cell.walls.W === true;
            }
            if (col_diff === 1) {
                has_walls = next_cell.walls.W === true
                    || cur_cell.walls.E === true;
            }
            return has_walls;
        }

        function checkCell(cur_cell) {
            if (cur_cell != null && cur_cell.checkIfVisited() === false && cur_cell !== cell) {
                if (hasWallsBetween(cell, cur_cell) === false) {
                    neighbs.push(cur_cell);
                }
            }
        }
        checkCell(cells[r][c + 1]);
        checkCell(cells[r][c - 1]);
        checkCell(cells[Math.min(r + 1, r_max)][c]);
        checkCell(cells[Math.max(r - 1, 0)][c]);
        return neighbs;
    }

    function removeWalls(cur_cell, next_cell) {
        // -1 = up / left | 0 = same | 1 = down / right
        const row_diff = next_cell.row - cur_cell.row;
        const col_diff = next_cell.col - cur_cell.col;
        let on_side_next = "";
        let on_side_current = "";
        if (row_diff === -1) {
            on_side_next = "S";
            on_side_current = "N";
        }
        if (row_diff === 1) {
            on_side_next = "N";
            on_side_current = "S";
        }
        if (col_diff === -1) {
            on_side_next = "E";
            on_side_current = "W";
        }
        if (col_diff === 1) {
            on_side_next = "W";
            on_side_current = "E";
        }
        next_cell.removeWall(on_side_next);
        cur_cell.removeWall(on_side_current);
    }

    function getPathDirectionFor(cell) {
        let dir = "E";
        let row_diff;
        let col_diff;
        const prev_cell = cell.getPreviousCell();
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

    return {
        getRandomNeighborFor,
        getAdjacentsFor,
        removeWalls,
        getPathDirectionFor
    };
}

export default createMazeManager;