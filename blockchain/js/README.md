# Blockchain 구현


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

