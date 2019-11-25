declare type StorageType = "local" | "session";
declare type ReturnVal = [boolean, any];
declare function useFetch<T>(url: string | URL, payload?: T, key?: string, type?: StorageType): ReturnVal;
export default useFetch;
//# sourceMappingURL=useFetch.d.ts.map