/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/BFS.js":
/*!********************!*\
  !*** ./src/BFS.js ***!
  \********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _Queue_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Queue.js */ \"./src/Queue.js\");\n\n\nfunction createBFS (app) {\n    \n    const { maze, eventsBus } = app;\n    let t = -1;\n    const queue = Object(_Queue_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"])();\n    const delay = 20;\n    function recursive_search (active_cell) {\n        let next_cell;\n        let a_cell;\n        let adjacent_cells = maze.getAdjacentsFor(active_cell);\n        let was_exit_found = false;\n        \n        while (adjacent_cells.length > 0) {\n            a_cell = adjacent_cells.pop();\n            maze.markAsVisited(a_cell);\n            maze.setPreviousCell({ \n                for: a_cell, \n                with: active_cell\n            });\n\n            if (a_cell.is_exit_cell === true) {\n                was_exit_found = true;\n                break;\n            } else {\n                queue.enqueue(a_cell);\n            }\n        }\n        maze.draw();\n        \n        if (was_exit_found === false) {\n            if (queue.isEmpty() === false) {\n                next_cell = queue.dequeue();\n                t = setTimeout(recursive_search, delay, next_cell);\n            } else {\n                console.log(\"oh no, I didn't find the exit!\");\n            }\n        } else {\n            find_pathback(a_cell);\n        }\n    }\n    function find_pathback (exit_cell) {\n        let next_cell = exit_cell;\n        const path_cells = [];\n        while (next_cell != null) {\n            path_cells.push(next_cell);\n            next_cell = maze.getPreviousCell(next_cell);\n        } \n        path_cells.reverse();\n        \n        // recursively draw solution\n        let inc = 0;\n        function recursive_pathback (cell) {\n            let dir = maze.getPathDirectionFor(cell);\n            cell.markForShortestPathWithDirection(true, dir);\n            maze.draw();\n            inc += 1;\n            if (path_cells[inc] != null) {\n                t = setTimeout(recursive_pathback, delay, path_cells[inc]);\n            } else {\n                eventsBus.dispatch(\"MAZE_SOLVED\");\n            }\n        }\n        recursive_pathback(path_cells[inc]);\n    }\n\n    function start() {\n        maze.clear();\n        let start_cell = maze.getStartCell();\n        maze.markAsVisited(start_cell);\n        recursive_search(start_cell);\n    }\n\n    eventsBus.listenTo(\"FIND_PATH\", start);\n\n    // API\n    return {\n        start\n    }\n}\n\n// https://en.wikipedia.org/wiki/Maze_solving_algorithm\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (createBFS);\n\n//# sourceURL=webpack:///./src/BFS.js?");

/***/ }),

/***/ "./src/Cell.js":
/*!*********************!*\
  !*** ./src/Cell.js ***!
  \*********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n\n// constructor\nfunction createCell(row, col, size, grid_size) {\n    let was_visited = false;\n    let was_backtracked = false;\n    let previous_cell;\n    let is_exit_cell = (row === grid_size - 1)\n            && (col === grid_size - 1);\n    let walls = {\n        N: row === 0,\n        E: row !== grid_size - 1 || col !== grid_size - 1,\n        S: true,\n        W: col === 0 && row !== 0 // for \"entrance\"\n    };\n    let is_on_shortest_path = false;\n    let arrow_direction = \"\";\n    \n    function draw (maze_pos, ctx) {\n\n        let { x: maze_x, y: maze_y } = maze_pos;\n        let cell_x = maze_x + (col * size);\n        let cell_y = maze_y + (row * size);\n\n        // fill style\n        ctx.fillStyle = \"#000000\";\n        if (was_visited === true) {\n            ctx.fillStyle = \"#202020\";\n        }\n        if (was_backtracked === true) {\n            ctx.fillStyle = \"#202040\";\n        }\n\n        ctx.beginPath();\n        ctx.rect(\n            cell_x,\n            cell_y,\n            size,\n            size\n        );\n        ctx.fill();\n\n        // stroke\n        if (walls.N === true) {\n            ctx.beginPath();\n            ctx.moveTo(\n                cell_x,\n                cell_y\n            );\n            ctx.lineTo(\n                cell_x + size,\n                cell_y\n            );\n            ctx.stroke();\n        }\n        if (walls.W === true) {\n            ctx.beginPath();\n            ctx.moveTo(\n                cell_x,\n                cell_y\n            );\n            ctx.lineTo(\n                cell_x,\n                cell_y + size\n            );\n            ctx.stroke();\n        }\n        if (walls.E === true) {\n            ctx.beginPath();\n            ctx.moveTo(\n                cell_x + size,\n                cell_y + size\n            );\n            ctx.lineTo(\n                cell_x + size,\n                cell_y\n            );\n            ctx.stroke();\n        }\n        if (walls.S === true) {\n            ctx.beginPath();\n            ctx.moveTo(\n                cell_x + size,\n                cell_y + size\n            );\n            ctx.lineTo(\n                cell_x,\n                cell_y + size\n            );\n            ctx.stroke();\n        }\n        // draw direction arrow\n        if (is_on_shortest_path === true) {\n            ctx.fillStyle = \"#FF9900\";\n            ctx.beginPath();\n            _drawArrow(cell_x, cell_y, ctx);\n            ctx.fill();\n        }\n    }\n\n    function _drawArrow(cell_x, cell_y, ctx) {\n        if (arrow_direction === \"N\") {\n            ctx.moveTo(\n                cell_x + size * 0.5,\n                cell_y + size * 0.5\n            );\n            ctx.lineTo(\n                cell_x + size * 0.6,\n                cell_y + size * 0.85\n            );\n            ctx.lineTo(\n                cell_x + size * 0.4,\n                cell_y + size * 0.85\n            );\n        }\n        if (arrow_direction === \"E\") {\n            ctx.moveTo(\n                cell_x + size * 0.5,\n                cell_y + size * 0.5\n            );\n            ctx.lineTo(\n                cell_x + size * 0.15,\n                cell_y + size * 0.6\n            );\n            ctx.lineTo(\n                cell_x + size * 0.15,\n                cell_y + size * 0.4\n            );\n        }\n        if (arrow_direction === \"S\") {\n            ctx.moveTo(\n                cell_x + size * 0.5,\n                cell_y + size * 0.5\n            );\n            ctx.lineTo(\n                cell_x + size * 0.4,\n                cell_y + size * 0.15\n            );\n            ctx.lineTo(\n                cell_x + size * 0.6,\n                cell_y + size * 0.15\n            );\n        }\n        if (arrow_direction === \"W\") {\n            ctx.moveTo(\n                cell_x + size * 0.5,\n                cell_y + size * 0.5\n            );\n            ctx.lineTo(\n                cell_x + size * 0.85,\n                cell_y + size * 0.4\n            );\n            ctx.lineTo(\n                cell_x + size * 0.85,\n                cell_y + size * 0.6\n            );\n        }\n    }\n\n    function clear () {\n        was_visited = false;\n        was_backtracked = false;\n    }\n\n    function markAsVisited () {\n        was_visited = true;\n    }\n\n    function checkIfVisited () {\n        return was_visited;\n    }\n\n    function markAsBacktracked() {\n        was_backtracked = true;\n    }\n\n    function checkIfBacktracked() {\n        return was_backtracked;\n    }\n\n    function setPreviousCell (cell) {\n        previous_cell = cell;\n    }\n    function getPreviousCell () {\n        return previous_cell;\n    }\n\n    function removeWall (on_side) {\n        walls[on_side] = false;\n    }\n\n    function markForShortestPathWithDirection (is_shortest, dir) {\n        is_on_shortest_path = is_shortest;\n        arrow_direction = dir;\n    }\n\n    return {\n        row,\n        col,\n        size,\n        is_exit_cell,\n        walls,\n        draw,\n        markForShortestPathWithDirection,\n        removeWall,\n        clear,\n        markAsVisited,\n        checkIfVisited,\n        markAsBacktracked,\n        checkIfBacktracked,\n        setPreviousCell,\n        getPreviousCell\n    }\n}\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (createCell);\n\n//# sourceURL=webpack:///./src/Cell.js?");

/***/ }),

/***/ "./src/DFS.js":
/*!********************!*\
  !*** ./src/DFS.js ***!
  \********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\nfunction createDFS (app) {\n\n    const { maze, eventsBus } = app;\n    const my_stack = [];\n    let t = -1;\n    let max_delay = 10;\n    let delay = max_delay * 0.5;\n    let DFS_was_completed = false;\n    function recursive_backtracker(current_cell) {\n        maze.markAsVisited(current_cell);\n        if (maze.has_unvisited_cells() === true) {\n            let next_cell = maze.getRandomNeighborFor(current_cell);\n\n            if (next_cell !== null) {\n                // push the CURRENT CELL –\n                // NOT the /next/ cell\n                my_stack.push(current_cell); \n                maze.removeWalls(current_cell, next_cell);\n\n            } else if (my_stack.length > 0) {\n                next_cell = my_stack.pop();\n                maze.markAsBacktracked(next_cell);\n                delay = max_delay * 0.1;\n            }\n            maze.draw();\n\n            t = setTimeout(() => { recursive_backtracker(next_cell); }, delay);\n        } else {\n            maze.draw();\n            eventsBus.dispatch(\"MAZE_CREATED\");\n            DFS_was_completed = true;\n        }\n    }\n\n    function handleCreateMaze () {\n        if (DFS_was_completed === false) {\n            start();\n        } else {\n            eventsBus.dispatch(\"REINITIALIZE_ALL\");\n        }\n    }\n\n    function handleMazeInit () {\n        DFS_was_completed = false;\n    }\n\n    function start() {\n        recursive_backtracker(maze.getStartCell());\n    }\n\n    eventsBus.listenTo(\"MAZE_INITIALIZED\", handleMazeInit);\n    eventsBus.listenTo(\"CREATE_MAZE\", handleCreateMaze);\n\n    // API\n    return {\n        start\n    };\n}\n// https://en.wikipedia.org/wiki/Maze_generation_algorithm#Recursive_backtracker\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (createDFS);\n\n//# sourceURL=webpack:///./src/DFS.js?");

/***/ }),

/***/ "./src/EventsManager.js":
/*!******************************!*\
  !*** ./src/EventsManager.js ***!
  \******************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n\n//  or on it's own ... const Event_Manager = createEventsManager();\nfunction createEventsManager () {\n    const listeners = {};\n    // @evt_name - string\n    // @callback - function\n    function listenTo (evt_name, callback) {\n        const new_listener = {\n            callback\n        };\n        if (listeners[evt_name]) {\n            listeners[evt_name].push(new_listener);\n        } else {\n            listeners[evt_name] = [new_listener];\n        }\n    }\n    // @evt_name - string\n    // @callback - function\n    function stopListening (evt_name, callback) {\n        const current_listeners = listeners[evt_name];\n        const leftovers = [];\n        if (current_listeners != null) {\n            current_listeners.forEach( (listener) => {\n                if (listener.callback !== callback) {\n                    leftovers.push(listener);\n                }\n            });\n            listeners[evt_name] = leftovers;\n            // should I delete the [evt_name] property from listeners too?\n        }\n    }\n    // @evt_name - string\n    // @callback - function\n    function isListening (evt_name, callback) {\n        const current_listeners = listeners[evt_name];\n        let confirmed = [];\n        if (current_listeners != null) {\n            confirmed = current_listeners.filter(function (item) {\n                return item.callback === callback;\n            });\n        }\n        console.log(\"isListening\", listeners);\n        return confirmed.length > 0;\n    }\n    // @evt_name - string\n    // @params - pass as many arguments as you want\n    function dispatch(evt_name, ...params) {\n        const current_listeners = listeners[evt_name];\n        if (current_listeners != null) {\n            current_listeners.forEach( (lsnr) => {\n                if (params != null) { lsnr.callback(...params); }\n                else { lsnr.callback(); }\n            });\n        }\n    }\n\n    return {\n        listenTo,\n        stopListening,\n        isListening,\n        dispatch\n    }\n}\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (createEventsManager);\n\n//# sourceURL=webpack:///./src/EventsManager.js?");

/***/ }),

/***/ "./src/Maze.js":
/*!*********************!*\
  !*** ./src/Maze.js ***!
  \*********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _Cell_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Cell.js */ \"./src/Cell.js\");\n/* harmony import */ var _MazeManager_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./MazeManager.js */ \"./src/MazeManager.js\");\n\n\n\n// private\nconst width = 600;\nconst height = 600;\nconst cell_size = 60;\n\nfunction _createCells(cell_size, width) {\n    let grid_size = Math.floor(width / cell_size);\n    const cells = [];\n    for (let row = 0; row < grid_size; row += 1) {\n        let cur_row = [];\n        for (let col = 0; col < grid_size; col += 1) {\n            cur_row.push(Object(_Cell_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"])(row, col, cell_size, grid_size));\n        }\n        cells.push(cur_row);\n    }\n    return cells;\n}\n\n// Maze constructor\n// @config_obj - \nfunction createMaze (config_obj) {\n    const { canvas, eventsBus } = config_obj;\n    const ctx = canvas.getContext(\"2d\");\n    const middle = {\n        x: canvas.width * 0.5,\n        y: canvas.height * 0.5\n    }\n    const x = middle.x - width * 0.5;\n    const y = middle.y - height * 0.5;\n    const cells = _createCells(cell_size, width);\n    const manager = Object(_MazeManager_js__WEBPACK_IMPORTED_MODULE_1__[\"default\"])(cells);\n    \n    // set wall thinkness\n    // TODO: move to cell?\n    ctx.lineWidth = 4;\n    ctx.strokeStyle = \"#00CCFF\";\n\n    function draw () {\n        ctx.clearRect(x, y, width, height);\n        cells.forEach((row) => {\n\n            row.forEach((cell) => {\n                cell.draw({ x, y }, ctx);\n            });\n        });\n    }\n\n    function initialize () {\n        // move drawing point to proper pos\n        ctx.moveTo( x, y );\n        draw();\n        eventsBus.dispatch(\"MAZE_INITIALIZED\");\n    }\n\n    // clears cells for path finding only\n    function clear() {\n        cells.forEach((row) => {\n            row.forEach((c) => {\n                c.clear();\n            });\n        });\n        draw();\n    }\n\n    function has_unvisited_cells () {\n        return cells.some((row) => { \n            return row.some((cell) => { \n                return cell.checkIfVisited() === false; \n            }); \n        });\n    }\n\n    // cell management\n    function markAsVisited (cell) {\n        cell.markAsVisited();\n    }\n\n    function markAsBacktracked (cell) {\n        cell.markAsBacktracked();\n    }\n\n    function setPreviousCell (obj) {\n        const {for: cur_cell, with: other_cell} = obj;\n        cur_cell.setPreviousCell(other_cell);\n    }\n\n    function getPreviousCell (cell) {\n        return cell.getPreviousCell();\n    }\n\n    function getStartCell () {\n        return cells[0][0];\n    }\n\n    return {\n        clear,\n        draw,\n        initialize,\n        cells,\n        has_unvisited_cells,\n        getRandomNeighborFor: manager.getRandomNeighborFor,\n        getAdjacentsFor: manager.getAdjacentsFor,\n        removeWalls: manager.removeWalls,\n        markAsVisited,\n        markAsBacktracked,\n        setPreviousCell,\n        getPreviousCell,\n        getPathDirectionFor: manager.getPathDirectionFor,\n        getStartCell\n    };\n}\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (createMaze);\n\n//# sourceURL=webpack:///./src/Maze.js?");

/***/ }),

/***/ "./src/MazeManager.js":
/*!****************************!*\
  !*** ./src/MazeManager.js ***!
  \****************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\nfunction createMazeManager (cells) {\n\n    function getRandomNeighborFor(cell) {\n        let random_neighbor;\n        let randex = -1;\n        const c = cell.col;\n        const r = cell.row;\n        const r_max = cells.length - 1;\n        const neighbs = [];\n\n        function checkCell(cur_cell) {\n            if (cur_cell != null && cur_cell.checkIfVisited() === false) {\n                neighbs.push(cur_cell);\n            }\n        }\n        checkCell(cells[r][c + 1]);\n        checkCell(cells[r][c - 1]);\n        checkCell(cells[Math.min(r + 1, r_max)][c]);\n        checkCell(cells[Math.max(r - 1, 0)][c]);\n\n        if (neighbs.length > 1) {\n            randex = Math.floor(Math.random() * neighbs.length);\n            random_neighbor = neighbs[randex];\n        } else if (neighbs.length === 1) {\n            random_neighbor = neighbs[0];\n        } else {\n            random_neighbor = null;\n        }\n\n        return random_neighbor;\n    }\n\n    function getAdjacentsFor (cell) {\n        const neighbs = [];\n        const c = cell.col;\n        const r = cell.row;\n        const r_max = cells.length - 1;\n\n        function hasWallsBetween (cur_cell, next_cell) {\n            const row_diff = next_cell.row - cur_cell.row;\n            const col_diff = next_cell.col - cur_cell.col;\n            let has_walls = false;\n\n            if (row_diff === -1) {\n                has_walls = next_cell.walls.S === true\n                    || cur_cell.walls.N === true;\n            }\n            if (row_diff === 1) {\n                has_walls = next_cell.walls.N === true\n                    || cur_cell.walls.S === true;\n            }\n            if (col_diff === -1) {\n                has_walls = next_cell.walls.E === true\n                    || cur_cell.walls.W === true;\n            }\n            if (col_diff === 1) {\n                has_walls = next_cell.walls.W === true\n                    || cur_cell.walls.E === true;\n            }\n            return has_walls;\n        }\n\n        function checkCell(cur_cell) {\n            if (cur_cell != null && cur_cell.checkIfVisited() === false && cur_cell !== cell) {\n                if (hasWallsBetween(cell, cur_cell) === false) {\n                    neighbs.push(cur_cell);\n                }\n            }\n        }\n        checkCell(cells[r][c + 1]);\n        checkCell(cells[r][c - 1]);\n        checkCell(cells[Math.min(r + 1, r_max)][c]);\n        checkCell(cells[Math.max(r - 1, 0)][c]);\n        return neighbs;\n    }\n\n    function removeWalls(cur_cell, next_cell) {\n        // -1 = up / left | 0 = same | 1 = down / right\n        const row_diff = next_cell.row - cur_cell.row;\n        const col_diff = next_cell.col - cur_cell.col;\n        let on_side_next = \"\";\n        let on_side_current = \"\";\n        if (row_diff === -1) {\n            on_side_next = \"S\";\n            on_side_current = \"N\";\n        }\n        if (row_diff === 1) {\n            on_side_next = \"N\";\n            on_side_current = \"S\";\n        }\n        if (col_diff === -1) {\n            on_side_next = \"E\";\n            on_side_current = \"W\";\n        }\n        if (col_diff === 1) {\n            on_side_next = \"W\";\n            on_side_current = \"E\";\n        }\n        next_cell.removeWall(on_side_next);\n        cur_cell.removeWall(on_side_current);\n    }\n\n    function getPathDirectionFor(cell) {\n        let dir = \"E\";\n        let row_diff;\n        let col_diff;\n        const prev_cell = cell.getPreviousCell();\n        if (prev_cell != null) {\n            row_diff = cell.row - prev_cell.row;\n            col_diff = cell.col - prev_cell.col;\n            if (row_diff === -1) {\n                dir = \"N\"\n            }\n            if (row_diff === 1) {\n                dir = \"S\"\n            }\n            if (col_diff === -1) {\n                dir = \"W\"\n            }\n            if (col_diff === 1) {\n                dir = \"E\"\n            }\n        }\n        return dir;\n    }\n\n    return {\n        getRandomNeighborFor,\n        getAdjacentsFor,\n        removeWalls,\n        getPathDirectionFor\n    };\n}\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (createMazeManager);\n\n//# sourceURL=webpack:///./src/MazeManager.js?");

/***/ }),

/***/ "./src/Queue.js":
/*!**********************!*\
  !*** ./src/Queue.js ***!
  \**********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\nfunction createQueue () {\n    const _arr = [];\n    function enqueue (item) {\n        _arr.push(item);\n    }\n    function dequeue () {\n        return _arr.shift();\n    }\n    function isEmpty () {\n        return _arr.length === 0;\n    }\n\n    return {\n        enqueue,\n        dequeue,\n        isEmpty\n    };\n}\n/* harmony default export */ __webpack_exports__[\"default\"] = (createQueue);\n\n//# sourceURL=webpack:///./src/Queue.js?");

/***/ }),

/***/ "./src/UIManager.js":
/*!**************************!*\
  !*** ./src/UIManager.js ***!
  \**************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/*\n * manages button states and text\n */\n\nfunction createUIManager(eventsBus) {\n\n    const create_maze_btn = document.body.querySelector(\"#create_maze\");\n    const find_path_btn = document.body.querySelector(\"#find_path\");\n\n    function handleMazeInit () {\n        create_maze_btn.innerText = \"Create Maze\";\n        create_maze_btn.classList.remove(\"disabled\");\n    }\n    \n    function handleMazeCreated () {\n        create_maze_btn.innerText = \"Clear Maze\";\n        create_maze_btn.classList.remove(\"disabled\");\n        find_path_btn.classList.remove(\"disabled\");\n    }\n\n    function handleMazeSolved () {\n        create_maze_btn.innerText = \"Clear Maze\";\n        create_maze_btn.classList.remove(\"disabled\");\n    }\n\n    function disableButtons () {\n        create_maze_btn.classList.add(\"disabled\");\n        find_path_btn.classList.add(\"disabled\");\n    }\n\n    // Maze Event Messaging\n    eventsBus.listenTo(\"MAZE_INITIALIZED\", handleMazeInit);\n    eventsBus.listenTo(\"MAZE_CREATED\", handleMazeCreated);\n    eventsBus.listenTo(\"MAZE_SOLVED\", handleMazeSolved);\n\n    // Event Handlers\n    document.body.addEventListener(\"click\", (evt) => {\n        if (evt.target.classList.contains(\"disabled\") === false) {\n            if (evt.target.id === \"create_maze\") {\n                disableButtons();\n                eventsBus.dispatch(\"CREATE_MAZE\");\n            }\n            if (evt.target.id === \"find_path\") {\n                disableButtons();\n                eventsBus.dispatch(\"FIND_PATH\");\n            }\n        }\n    });\n\n    // API = 0;\n    return {};\n}\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (createUIManager);\n\n//# sourceURL=webpack:///./src/UIManager.js?");

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _Maze_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Maze.js */ \"./src/Maze.js\");\n/* harmony import */ var _DFS_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./DFS.js */ \"./src/DFS.js\");\n/* harmony import */ var _BFS_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./BFS.js */ \"./src/BFS.js\");\n/* harmony import */ var _EventsManager_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./EventsManager.js */ \"./src/EventsManager.js\");\n/* harmony import */ var _UIManager_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./UIManager.js */ \"./src/UIManager.js\");\n\n\n\n\n\n\n// move to Maze ?\nlet canvas = document.createElement(\"canvas\");\ncanvas.width = window.innerWidth;\ncanvas.height = window.innerHeight;\ndocument.body.appendChild(canvas);\n//\n\nconst eventsBus = Object(_EventsManager_js__WEBPACK_IMPORTED_MODULE_3__[\"default\"])();\nconst maze = Object(_Maze_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"])({ canvas, eventsBus });\nconst UI = Object(_UIManager_js__WEBPACK_IMPORTED_MODULE_4__[\"default\"])(eventsBus);\nconst searcher = Object(_DFS_js__WEBPACK_IMPORTED_MODULE_1__[\"default\"])({maze, eventsBus});\nconst solver = Object(_BFS_js__WEBPACK_IMPORTED_MODULE_2__[\"default\"])({maze, eventsBus});\nmaze.initialize();\n\n// debug\nwindow.maze = maze;\nwindow.eventsBus = eventsBus;\n\neventsBus.listenTo(\"REINITIALIZE_ALL\", () => {\n    window.location.reload();\n});\n\n//# sourceURL=webpack:///./src/index.js?");

/***/ })

/******/ });