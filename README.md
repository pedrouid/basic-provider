# basic-provider [![npm version](https://badge.fury.io/js/basic-provider.svg)](https://badge.fury.io/js/basic-provider)

Basic Provider Library

## Example

```javascript
import BasicProvider from 'basic-provider';

const connection: IRpcConnection

const provider = new BasicProvider(connection);

await provider.enable();
```
