import getStorageType from "./getStorageType";

type StorageType = "local" | "session";
type ErrorType = false | {
    code: number;
    message: string;
};

function retrieve (key: string, type: StorageType): ErrorType | any {
    const store = getStorageType(type, key);
    if (!store) {
        return {
            code: 404,
            message: "Data not found. Either the key contains no data or the data was stored under a different key."
        };
    }
    const parsed = JSON.parse(store);
    if (!parsed) {
        return {
            code: 500,
            message: "Data could not be parsed. Check your data or add a bug report to the github repository."
        };
    }
    return parsed;
}


export default retrieve;