export function throttle(cb, delay = 500) {
    let isThrottling;
    let savedArgs;
    let savedContext;

    function wrapper() {
        if (isThrottling) {
            savedArgs = arguments;
            savedContext = this;
            return;
        }

        isThrottling = true;
        cb.apply(this, arguments);

        setTimeout(() => {
            isThrottling = false;

            if (savedArgs) {
                wrapper.apply(savedContext, savedArgs);
                savedContext = null;
                savedArgs = null;
            }
        }, delay);
    }

    return wrapper;
}

export function debounce(callback, delay = 500) {
    let timeout;

    return function debounceInternal() {
        const funcCall = callback.bind(this, arguments);

        clearTimeout(timeout);
        timeout = setTimeout(funcCall, delay);
    };
}
