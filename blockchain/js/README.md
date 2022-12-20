# Blockchain 구현

```sh
$ npm install merkle crypto-js hex-to-binary
```

## Jest 세팅

```sh
$ npm install -D jest supertest node-mocks-http
```

**package.json 설정**
```sh
"scripts":{
    "test:unit":"jest"
}
```

**jest.config.js 설정**

```js
module.exports = {
    testEnvironments:'node',
}
```

