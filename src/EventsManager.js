
function createEventsManager (context) {
    const listeners = {};

    function listenTo (target, evt_name, callback, current_context) {

        const scope = current_context != null ? current_context : context;
        const new_listener = {
            target,
            callback,
            context: scope
        };

        if (listeners[evt_name]) {
            listeners[evt_name].push(new_listener);
        } else {
            listeners[evt_name] = [new_listener];
        }
    };

    function stopListening (target, evt_name, callback) {
        const current_listeners = listeners[evt_name];
        const leftovers = [];
        if (current_listeners != null) {
            current_listeners.forEach( (listener) => {
                if ((listener.target === target 
                    && listener.callback === callback) === false) {
                    leftovers.push(listener);
                }
            });
            listeners[evt_name] = leftovers;
        }
    }

    function isListening (target, evt_name, callback) {
        const current_listeners = listeners[evt_name];
        const confirmed = [];
        if (current_listeners != null) {
            confirmed = current_listeners.filter(function (item) {
                return item.target === target && item.callback === callback;
            });
            return confirmed !== [];
        }
    };

    function dispatch(evt_name, caller, params) {
        const [...args] = [caller, params];
        const current_listeners = listeners[evt_name];
      
        if (current_listeners != null) {
            current_listeners.forEach( (l) => {
                if (l.target === caller) { 
                    lsnr.callback.apply(lsnr.context, args);
                }
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