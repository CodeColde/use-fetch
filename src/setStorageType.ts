function setStorageType(type: string, key: string, data: string) {
    switch (type) {
        case "local":
            localStorage.setItem(key, data);
            break;
        case "session":
            sessionStorage.setItem(key, data);
            break;
        default:
            throw new Error("Storage Type is undefined");
    }
}

export default setStorageType;