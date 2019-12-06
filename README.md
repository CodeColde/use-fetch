# Use-Fetch

A very simple react hook. The goal is to fetch data from a url and optionally store it in the browser using local or session storage.

Want to read through the use case? [Click here to read the Medium Article](https://medium.com/@hayo.friese/execute-coding-projects-using-usefetch-b75aa7c5cd2).

## Usage
To execute this function, simply declare it in a functional react component. Only parameter necessary is the url.

```
import React from 'react';
import useFetch from '@codecolde/useFetch';

const Products = () => {
    const [data, loading] = useFetch(url, payload, key, type);

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

## CreateUrl
For those looking to create a URL object, I've found that I reuse a function a lot in projects I use this package in, so I added the createUrl utility. Essentially it creates a URL object with query parameters.

```
import useFetch, { createUrl } from '@codecolde/useFetch';

const Url = createUrl(
    "https://api.url.com/api",
    {
      query_param: "param value",
      query_array: ['Array', 'Value'],
      query_number: 42,
      query_boolean: true,
    }
); // https://api.url.com/api?query_param=param%20value&query_array=Array,Value&query_number=42&query_boolean=true
const [loading, data] = useFetch(Url, {}, "allGames", "local");
```

The first parameter expects a url string. Optionally, you can add any query param that would otherwise exist in the url as an object in the second param. The function loops through the data and appends each key value pair to the search params field of the URL object. No need to pass a massive URL through anymore!

This function is not dependant on useFetch. If you want to build any url with search params only, you can make use of this function. See it as free utility.

## Error Handling
As of 0.1.0, Error handling is supported in the project.

When a response returns the ok value as false (indicating it's not a 2xx response), an error gets returned and loading is false. The request is not stored and will retry upon page/component reload. The body that gets returned is as follows:

```
{
    isError: boolean,
    code: number,
    message: string | undefined,
    body: json
}
```

`isError` is a unique boolean prepared for use in the data object that you would return that you can use to distinguish between regular data and an error message.
`code` comes directly from the response code.
`message` is sometimes provided by the status, and you can access this here.
`body` is the response body. Some APIs provide an error message directly in the body, so you can access that here if it exists.