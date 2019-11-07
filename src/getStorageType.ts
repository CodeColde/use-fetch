function getStorageType(type?: string, key?: string) {
    if (!key) return false;

    switch (type) {
        case "local":
            return localStorage.getItem(key);
        case "session":
            return sessionStorage.getItem(key);
        default:
            return false;
    }
}

export default getStorageType;