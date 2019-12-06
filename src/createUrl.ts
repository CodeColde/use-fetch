function createUrl (urlString: string, urlParams?: any) {
    const urlObject = new URL(urlString);
    if (urlParams) {
        Object.keys(urlParams).forEach(key => urlObject.searchParams.append(key, urlParams[key]));
    }
    return urlObject;
}

export default createUrl;