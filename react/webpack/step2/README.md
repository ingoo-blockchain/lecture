# Webpack Loaders 사용해보기

Webpack 설정파일에 있는
Loaders 는 다양한 유형의 파일을
모듈로 변환할수있다

우리가 자주 만나게 될것은..
아마 Image 또는 Css 파일이 될 확률이 높다.

CSS 모듈을 해보면서 Loaders 개념을 이해해보도록 하자

1. webpack loaders 관련 패키지 설치

```sh
npm install webpack webpack-cli css-loader style-loader
```

-   css-loader : CSS 파일을 모듈로 변환하는 로더
-   style-loader : `<style>` 태그 삽입하는 로더

2. 디렉토리 구성하기

**src/index.js**

```js
import './index.css'

console.log('hello world!')
```

**src/index.css**

```css
* {
    margin: 0;
    padding: 0;
    font-size: 12px;
}
```
