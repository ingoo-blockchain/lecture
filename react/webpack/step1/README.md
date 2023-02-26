# Webpack 기본 실행

1. 관련 패키지 설치

```sh
$ npm install webpack webpack-cli
```

2. 프로젝트 구성

```sh
mkdir src
mkdir dist
```

향후 src 에 있는 모든 파일을
하나로 합쳐서 dist 폴더에 넣을 예정

3. webpack 설정 파일

**webpack.config.js**

```js
const path = require('path')

module.exports = {
    entry: './src/index.js',
    output: {
        filename: 'bundle.js',
        path: path.join('__dirname', 'dist'),
    },
}
```

4. 실행하기

```sh
npx webpack
```
