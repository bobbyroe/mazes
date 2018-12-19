
function createQueue () {

    const _arr = [];
    function enqueue (item) {
        _arr.push(item);
    }

    function dequeue () {
        return _arr.shift();
    }

    function isEmpty () {
        // console.log(_arr);
        return _arr.length === 0;
    }

    return {
        enqueue,
        dequeue,
        isEmpty
    };
}

export default createQueue;