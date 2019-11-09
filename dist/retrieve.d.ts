declare type StorageType = "local" | "session";
declare type ErrorType = false | {
    code: number;
    message: string;
};
declare function retrieve(key: string, type: StorageType): ErrorType | any;
export default retrieve;
//# sourceMappingURL=retrieve.d.ts.map