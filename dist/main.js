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

/***/ "./src/Cell.js":
/*!*********************!*\
  !*** ./src/Cell.js ***!
  \*********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n\n// Cell constructor\nfunction createCell(row, col, size, grid_size) {\n    let was_visited = false;\n    let was_backtracked = false;\n    const walls = {\n        N: row === 0,\n        E: row !== grid_size - 1 || col !== grid_size - 1,\n        S: true,\n        W: col === 0 && row !== 0 // for \"entrance\"\n    };\n    \n    function draw (maze_pos, ctx) {\n\n        let { x: maze_x, y: maze_y } = maze_pos;\n        let cell_x = col * size;\n        let cell_y = row * size;\n        ctx.beginPath();\n        ctx.rect(\n            maze_x + cell_x,\n            maze_y + cell_y,\n            size,\n            size\n        );\n        ctx.fill();\n\n        // stroke\n        if (walls.N === true) {\n            // ctx.strokeStyle = \"#FF0000\";\n            ctx.beginPath();\n            ctx.moveTo(\n                maze_x + cell_x,\n                maze_y + cell_y\n            );\n            ctx.lineTo(\n                maze_x + cell_x + size,\n                maze_y + cell_y\n            );\n            ctx.stroke();\n        }\n        if (walls.W === true) {\n            // ctx.strokeStyle = \"#FFFF00\";\n            ctx.beginPath();\n            ctx.moveTo(\n                maze_x + cell_x,\n                maze_y + cell_y\n            );\n            ctx.lineTo(\n                maze_x + cell_x,\n                maze_y + cell_y + size\n            );\n            ctx.stroke();\n        }\n        if (walls.E === true) {\n            // ctx.strokeStyle = \"#00FF00\";\n            ctx.beginPath();\n            ctx.moveTo(\n                maze_x + cell_x + size,\n                maze_y + cell_y + size\n            );\n            ctx.lineTo(\n                maze_x + cell_x + size,\n                maze_y + cell_y\n            );\n            ctx.stroke();\n        }\n        if (walls.S === true) {\n            // ctx.strokeStyle = \"#0000FF\";\n            ctx.beginPath();\n            ctx.moveTo(\n                maze_x + cell_x + size,\n                maze_y + cell_y + size\n            );\n            ctx.lineTo(\n                maze_x + cell_x,\n                maze_y + cell_y + size\n            );\n            ctx.stroke();\n        }\n    }\n    return {\n        row,\n        col,\n        size,\n        was_visited,\n        was_backtracked,\n        walls,\n        draw\n    }\n}\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (createCell);\n\n//# sourceURL=webpack:///./src/Cell.js?");

/***/ }),

/***/ "./src/Maze.js":
/*!*********************!*\
  !*** ./src/Maze.js ***!
  \*********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _Cell_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Cell.js */ \"./src/Cell.js\");\n\n\n// private\nfunction _createCells(cell_size, width) {\n    let grid_size = Math.floor(width / cell_size);\n    const cells = [];\n    for (let row = 0; row < grid_size; row += 1) {\n        let cur_row = [];\n        for (let col = 0; col < grid_size; col += 1) {\n            cur_row.push(Object(_Cell_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"])(row, col, cell_size, grid_size));\n        }\n        cells.push(cur_row);\n    }\n    return cells;\n}\n\n// Maze constructor\nfunction createMaze(width, height, canvas, ctx) {\n\n    const cell_size = 40;\n    const middle = {\n        x: canvas.width * 0.5,\n        y: canvas.height * 0.5\n    }\n    const x = middle.x - width * 0.5;\n    const y = middle.y - height * 0.5;\n    const cells = _createCells(cell_size, width);\n\n    // set wall thinkness\n    // TODO: move to cell?\n    ctx.lineWidth = 4;\n    ctx.strokeStyle = \"#00CCFF\";\n\n    function draw () {\n        ctx.clearRect(x, y, width, height);\n        cells.forEach((row) => {\n\n            row.forEach((cell) => {\n                // fill style\n                ctx.fillStyle = \"#000000\";\n                if (cell.was_visited === true) {\n                    ctx.fillStyle = \"#202020\";    \n                } \n                if (cell.was_backtracked === true) {\n                    ctx.fillStyle = \"#202040\";\n                }\n\n                cell.draw({ x, y }, ctx);\n            });\n        });\n    }\n\n    function has_unvisited_cells () {\n        return cells.some((row) => { \n            return row.some((cell) => { \n                return cell.was_visited === false; \n            }); \n        });\n    }\n\n    function getRandomNeighborFor (cell) {\n\n        let random_neighbor;\n        let randex = -1;\n        const c = cell.col;\n        const r = cell.row;\n        const r_max = cells.length - 1;\n        const neighbs = [];\n\n        function checkCell (cur_cell) {\n            if (cur_cell != null && cur_cell.was_visited === false) {\n                neighbs.push(cur_cell);\n            }\n        }\n\n        checkCell(cells[r][c + 1]);\n        checkCell(cells[r][c - 1]);\n        checkCell(cells[Math.min(r + 1, r_max)][c]);\n        checkCell(cells[Math.max(r - 1, 0)][c]);\n        \n        if (neighbs.length > 1) { \n            randex = Math.floor(Math.random() * neighbs.length);\n            random_neighbor = neighbs[randex];\n        } else if (neighbs.length === 1) {\n            random_neighbor = neighbs[0];\n        } else {\n            random_neighbor = null;\n        }\n\n        return random_neighbor;\n    }\n\n    function removeWalls(cur_cell, next_cell) {\n        // -1 = up / left | 0 = same | 1 = down / right\n        const row_diff = next_cell.row - cur_cell.row;\n        const col_diff = next_cell.col - cur_cell.col;\n\n        if (row_diff === -1) {\n            next_cell.walls.S = false;\n            cur_cell.walls.N = false;\n        }\n        if (row_diff === 1) {\n            next_cell.walls.N = false;\n            cur_cell.walls.S = false;\n        }\n        if (col_diff === -1) {\n            next_cell.walls.E = false;\n            cur_cell.walls.W = false;\n        }\n        if (col_diff === 1) {\n            next_cell.walls.W = false;\n            cur_cell.walls.E = false;\n        }\n    }\n\n    return {\n        draw,\n        initialize: draw,\n        width,\n        height,\n        x,\n        y,\n        cells,\n        has_unvisited_cells,\n        getRandomNeighborFor,\n        removeWalls\n    };\n}\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (createMaze);\n\n//# sourceURL=webpack:///./src/Maze.js?");

/***/ }),

/***/ "./src/Solver.js":
/*!***********************!*\
  !*** ./src/Solver.js ***!
  \***********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\nfunction createSolver (maze) {\n\n    const my_stack = [];\n    let t = -1;\n    let delay = 100;\n    function recursive_backtracker(current_cell) {\n        current_cell.was_visited = true;\n        if (maze.has_unvisited_cells() === true) {\n            let next_cell = maze.getRandomNeighborFor(current_cell);\n\n            if (next_cell !== null) {\n                my_stack.push(current_cell);\n                maze.removeWalls(current_cell, next_cell);\n                delay = 50;\n\n            } else if (my_stack.length > 0) {\n                next_cell = my_stack.pop();\n                next_cell.was_backtracked = true;\n                delay = 10;\n            }\n            maze.draw();\n\n            clearTimeout(t);\n            t = setTimeout(() => { recursive_backtracker(next_cell); }, delay);\n        } else {\n            maze.draw();\n            console.log(\"done!\");\n        }\n    }\n\n    function start() {\n        recursive_backtracker(maze.cells[0][0]);\n    }\n\n    return {\n        start\n    };\n}\n// https://en.wikipedia.org/wiki/Maze_generation_algorithm#Recursive_backtracker\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (createSolver);\n\n//# sourceURL=webpack:///./src/Solver.js?");

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _Maze_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Maze.js */ \"./src/Maze.js\");\n/* harmony import */ var _Solver_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Solver.js */ \"./src/Solver.js\");\n\n\n\nlet canvas = document.createElement(\"canvas\");\ncanvas.width = window.innerWidth;\ncanvas.height = window.innerHeight;\ndocument.body.appendChild(canvas);\n\nlet ctx = canvas.getContext(\"2d\");\n\nconst maze = Object(_Maze_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"])(600, 600, canvas, ctx);\nconst solver = Object(_Solver_js__WEBPACK_IMPORTED_MODULE_1__[\"default\"])(maze);\n\n// move drawing point to proper pos\nctx.moveTo(\n    maze.x,\n    maze.y\n);\n\nmaze.initialize();\nsolver.start();\n\n//# sourceURL=webpack:///./src/index.js?");

/***/ })

/******/ });