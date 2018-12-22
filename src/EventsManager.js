
//  or on it's own ... const Event_Manager = createEventsManager();
function createEventsManager () {
    const listeners = {};
    // @evt_name - string
    // @callback - function
    function listenTo (evt_name, callback) {
        const new_listener = {
            callback
        };
        if (listeners[evt_name]) {
            listeners[evt_name].push(new_listener);
        } else {
            listeners[evt_name] = [new_listener];
        }
    }
    // @evt_name - string
    // @callback - function
    function stopListening (evt_name, callback) {
        const current_listeners = listeners[evt_name];
        const leftovers = [];
        if (current_listeners != null) {
            current_listeners.forEach( (listener) => {
                if (listener.callback !== callback) {
                    leftovers.push(listener);
                }
            });
            listeners[evt_name] = leftovers;
            // should I delete the [evt_name] property from listeners too?
        }
    }
    // @evt_name - string
    // @callback - function
    function isListening (evt_name, callback) {
        const current_listeners = listeners[evt_name];
        let confirmed = [];
        if (current_listeners != null) {
            confirmed = current_listeners.filter(function (item) {
                return item.callback === callback;
            });
        }
        console.log("isListening", listeners);
        return confirmed.length > 0;
    }
    // @evt_name - string
    // @params - pass as many arguments as you want
    function dispatch(evt_name, ...params) {
        const current_listeners = listeners[evt_name];
        if (current_listeners != null) {
            current_listeners.forEach( (lsnr) => {
                if (params != null) { lsnr.callback(...params); }
                else { lsnr.callback(); }
            });
        }
    }

    return {
        listenTo,
        stopListening,
        isListening,
        dispatch
    }
}

export default createEventsManager;