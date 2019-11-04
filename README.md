# Use-Fetch

A very simple react hook. The goal is to fetch data from a url and optionally store it in the browser using local or session storage.

## Usage
To execute this function, simply declare it in a functional react component. Only parameter necessary is the url.

```
import React from 'react';
import useFetch from '@codecolde/useFetch';

const Products = () => {
    const [data, loading] = useFetch(url, payload, type, key);

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