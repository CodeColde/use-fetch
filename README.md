# Use-Fetch

A very simple react hook. The goal is to fetch data from a url and optionally store it in the browser using local or session storage.

Want to read through the use case? [Click here to read the Medium Article](https://medium.com/@hayo.friese/execute-coding-projects-using-usefetch-b75aa7c5cd2).

## Usage
To execute this function, simply declare it in a functional react component. Only parameter necessary is the url.

```
import React from 'react';
import useFetch from '@codecolde/useFetch';

const Products = () => {
    const [data, loading] = useFetch(url, payload, key, yupe);

    return (
        <div>
            {loading
                ? <p>Loading</p>
                : <ComponentForData data={data} />
            }
        </div>
    );
};

export default Products;
```

### URL
This is pretty self-explanatory. The first and only required parameter is a url string directing you to the api endpoint you're looking for.

### Payload
The payload is equivalent to the javascript fetch request options. you can also add whatever payload in the object you feel you need. This is optional.

### Type
Type refers to the storage type you want to store it in. Should you not provide this, the data will not be cached in the local or session storage, and each time the component mounts it will fetch anew. You can choose:
- local
- session

This parameter is optional.

### Key
Key refers to the key you're storing the data under in the type of storage you defined prior. Should you provide a type and not a key, it won't store anything. This parameter expects a string, and is optional.

### isReady
isReady is a boolean that checks if the function is ready to execute. Sometimes a call must be made when something exists. By default, isReady is true, but pass a boolean through that will determine whether this will run or not;

### Return Values
The component returns your data and a boolean. By default, data is initially an empty array, but the loading boolean indicates whether the data is being collected or not.

Should you have stored your values earlier, loading will by default return false, and your data will be the stored data. The first time your component will endure three renders, the following times only 1.

## Retrieve
What if you have data you personally added to the browser's storage? You can make use of the retrieve function:

```
import React from 'react';
import { retrieve } from '@codecolde/useFetch';

const Products = () => {
    const data = retrieve(key, type);

    return (
        <div>
            {data && data.code
                ? <ErrorComponent data={data} />
                : <ComponentForData data={data} />
        </div>
    );
};

export default Products;
```

The parameters of the retrieve function are the same as the useFetch options.

### Return Values
Either it returns your JSON.parsed data, or it returns an error object.

The error object contains two key value pairs.

#### Code
For now, there are only two possible code combinations: 404 or 500.

404 means that the data was not stored under the key or in that storage type. A good way to debug is to see if you have your key in either storage type. Did you use a URL to fetch data from? This might mean your data was no longer cached. For this reason it's a good idea to make use of the `useFetch` hook instead.

500 means that the data could not be parsed. It is always recommended you JSON.stringify your data in the appropriate key. Should you not have done this then most likely your data is faulty. If you did store JSON.stringified data, then please post a bug report indicating the problem you have.
