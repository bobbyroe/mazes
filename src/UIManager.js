/*
 * manages button states and text
 */

function createUIManager(eventsBus) {

    const create_maze_btn = document.body.querySelector("#create_maze");
    const find_path_btn = document.body.querySelector("#find_path");

    function handleMazeInit () {
        console.log("handleMazeInit!");
        // .create_maze is enabled, text is "Create Maze"
        // .find_path is disabled
        create_maze_btn.innerText = "Create Maze";
        create_maze_btn.classList.remove("disabled");
        // find_path_btn.classList.add("disabled");
    }
    
    function handleMazeCreated () {
        console.log("handleMazeCreated!");
        // .create_maze is enabled, text is "Recreate Maze"
        // .find_path is enabled
        create_maze_btn.innerText = "Clear Maze";
        create_maze_btn.classList.remove("disabled");
        find_path_btn.classList.remove("disabled");
    }

    function handleMazeSolved () {
        console.log("update!");
        // .create_maze is enabled, text is "Recreate Maze"
        // .find_path is disabled
        create_maze_btn.innerText = "Clear Maze";
        create_maze_btn.classList.remove("disabled");
        // find_path_btn.classList.add("disabled");
    }

    function disableButtons () {
        create_maze_btn.classList.add("disabled");
        find_path_btn.classList.add("disabled");
    }

    // Maze Event Messaging
    eventsBus.listenTo("MAZE_INITIALIZED", handleMazeInit);
    eventsBus.listenTo("MAZE_CREATED", handleMazeCreated);
    eventsBus.listenTo("MAZE_SOLVED", handleMazeSolved);

    // Event Handlers
    document.body.addEventListener("click", (evt) => {
        if (evt.target.classList.contains("disabled") === false) {
            if (evt.target.id === "create_maze") {
                disableButtons();
                eventsBus.dispatch("CREATE_MAZE");
            }
            if (evt.target.id === "find_path") {
                disableButtons();
                eventsBus.dispatch("FIND_PATH");
            }
        }
    });

    return {
    }
}

export default createUIManager;