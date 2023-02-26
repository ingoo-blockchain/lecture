# Webpack Plugins

Webpack plugins 는
input 이후 output 나오기전에 실행됩니다.

이번에는 HTML 을 bundle 하는 것을 구현해봄.

> 그렇게 큰 효과가 있는것은 아닙니다.

1. 관련 패키지 설치하기

```sh
npm install webpack webpack-cli html-webpack-plugin
```

2. src 파일 작성하기

**src/index.js**

```js
console.log('hello world!!')
```

**src/index.html**

```html
<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="UTF-8" />
        <meta http-equiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Webpack Plugins Example</title>
    </head>
    <body>
        <div id="root"></div>
    </body>
</html>
```
