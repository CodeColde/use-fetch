import { useState, useEffect } from "react";
import getStorageType from "./getStorageType";
import setStorageType from "./setStorageType";
import removeStorageType from "./removeStorageType";

type StorageType = "local" | "session";
type ReturnVal = [boolean, any];

function useFetch<T> (url: string | URL, payload?: T, key?: string, type?: StorageType): ReturnVal {
    const items = getStorageType(type, key);
    const [error, setError] = useState();
    const [data, setData] = useState(items ? JSON.parse(items) : []);
    const [loading, setloading] = useState(!items);

    async function fetchData () {
        try {
            const requestUrl = typeof url === 'string' ? url : url.toString();
            const response = await fetch(requestUrl, payload);
            const json = await response.json();
            if (response.ok) {
                setData(json);
                setloading(false);
                if(!!key && !!type) {
                    setStorageType(type, key, JSON.stringify(json));
                }
            } else {
                throw {
                    status: response.status,
                    message: response.statusText,
                    body: json,
                }
            }
        } catch (err) {
            const val = {
                isError: true,
                code: err.status,
                message: err.message,
                body: err.body
            };
            setloading(false);
            setError(val);
        } finally {
            if (error && !!type && !!key) {
                removeStorageType(type, key);
            }
        }
    }

    useEffect(() => {
        if(!items && !error) {
            fetchData();
        }
    }, [items, url, key, type, error]);

    return error ? [loading, error] : [loading, data];
}

export default useFetch;