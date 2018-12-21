function createUIManager () {
    function update () {
        console.log("update!");
    }
    
    return {
        update
    }
}

export default createUIManager;