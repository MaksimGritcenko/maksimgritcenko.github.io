function BrowserDatabase() {
    const WEEK_IN_SECONDS = 604800;

    function getItem(key) {
        try {
            const entryObject = JSON.parse(localStorage.getItem(key));
            const { data, expiration, createdAt } = entryObject;
            const MILLISECONDS_TO_SECONDS = 1000;

            if (expiration && Date.now() - createdAt > expiration * MILLISECONDS_TO_SECONDS) {
                localStorage.removeItem(key);
                return null;
            }

            return data || entryObject;
        } catch {
            return null;
        }
    }

    function setItem(key, data, expiration = WEEK_IN_SECONDS) {
        localStorage.setItem(key, JSON.stringify({
            data,
            expiration,
            createdAt: Date.now(),
        }));
    }

    function deleteItem(key) {
        localStorage.removeItem(key);
    }

    return {
        getItem,
        setItem,
        deleteItem,
    };
}

export default BrowserDatabase();
