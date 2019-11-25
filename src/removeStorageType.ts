function removeStorageType(type: string, key: string) {
    switch (type) {
        case "local":
            localStorage.removeItem(key);
            break;
        case "session":
            sessionStorage.removeItem(key);
            break;
        default:
            throw new Error("Storage Type is undefined");
    }
}

export default removeStorageType;