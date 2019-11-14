import { useState, useEffect } from "react";
import getStorageType from "./getStorageType";
import setStorageType from "./setStorageType";

type StorageType = "local" | "session";
type ReturnVal = [boolean, any];

function useFetch<T> (url: string | URL, payload?: T, key?: string, type?: StorageType): ReturnVal {
    const items = getStorageType(type, key);
    const [data, setData] = useState(items ? JSON.parse(items) : []);
    const [loading, setloading] = useState(!items);

    async function fetchData () {
        const requestUrl = typeof url === 'string' ? url : url.toString();
        const response = await fetch(requestUrl, payload);
        const json = await response.json();

        setData(json);
        setloading(false);
        if(!!key && !!type) {
            setStorageType(type, key, JSON.stringify(json));
        }
    }

    useEffect(() => {
        if(!items) {
            fetchData();
        }
    }, [items, url, key, type]);

    return [loading, data];
}

export default useFetch;