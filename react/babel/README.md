# Babel

Javascript 코드를 변환 해주는 도구 입니다.

Javascript 를 사용하는 우리로써
`Babel` 을 모르고 넘어가기가 힘들어요,

더욱더 실력이 쌓이면 쌓일수록 Babel을 지나갈수 없습니다.
이유는 간단해요

1. Javascript 문법은 꾸준히 진화합니다.

우리는 ES6 ES7.. 등등 계속적으로 자바스크립트 문법은 진화하고있습니다.

하지만 브라우저는 그 속도에 맞춰서 브라우저의 자바스크립트 런타임이 발전되지 않아요.

그러다보니 IE 에서는 `let` 이라던가 `const` 라는 키워드로 변수를 선언할수도 없고,
스프레드 연산자 같은것도 사용할수 없죠

이러한 문제를 해결하기 위해 **Babel** 이라는 것이 생겨났습니다.

2. Javascript 런타임은 두개입니다.

우리는 Javascript 에서 Runtime 2 개라는 것을 배웠죠,
`브라우저` 에서 실행하는 경우,
`NodeJS` 에서 실행하는 경우

그래서 브라우저에서는 Window API 라고 해서,
전역객체 this 가 `window` 가 존재하며,

`Nodejs` 환경에서는 this가 global 이 존재하죠,
이것도 표준을 정해서, 둘다 전역객체를
globalThis로 맞추는 작업까지 진행했습니다.

아무튼 런타임 두개다보니 문제가 생겼습니다,
기존에 Javascript 에 없었던 모듈시스템을 NodeJS 에서 먼저
만들었죠 흔히 우리가 아는 `require` 메서드입니다.

하지만 우리가 브라우저에서 파일을 불러올때,
`import` 로 가져오죠 ? 각가 이러한 모듈 시스템의 이름이

-   **commonjs**(require)
-   **es6**(import)

만약 nodejs 환경에서 require 를 사용하고있는데,
import 문법을 사용이 가능할까요?

가능합니다 `babel` 을 사용해서, 구현이 가능해요,
이러한 부분을 직접 구현해서, 배우는 목적을 이해해보도록 하죠

## Babel 기본 사용하기

babel 은 기본적으로 JS 로 구현되어있고,
npm 을 통해 쉽게 설치가 가능

```sh
npm install @babel/core @babel/cli @babel/preset-env
```

**.babelrc**

```json
{
    "presets": ["@babel/preset-env"]
}
```

> rc의 의미..
> **Run Commands** 의 약자
> 또는 Run Controll 의 약자라고 하기도함

ES6+ 문법을 사용한 Javascript 문법코드

```js
const fn = (message) => {
    const arr = [1, 2, 3, 4]
    const arr2 = [5, 6, 7, 8]

    const arr3 = [...arr, arr2]
    console.log(...arr3, message)
}

fn('hello world')
```

명령어를 작성해서 실행해보도록 합니다

```sh
$ npx babel example1.js --out-file dist/example1.js
```

## es6 에서 commonjs로 변경하기

**.babelrc**

```json
{
    "plugins": ["@babel/plugin-transform-modules-commonjs"]
}
```

```sh
$ npx babel exports.js --out-file dist/exports.js
$ npx babel example2.js --out-file dist/example2.js
```


## presets 과 plugins 차이

쉽게 풀어서 쓰면

여러개의 plugin 이 모이면
하나의 presets 이 만들어집니다.

plugin은 
Arrow Function 을 Function 표현식으로 바꾸는 이름이

trasnform-arrow-functions 라는 플러그인을 사용하는데,

우리는 하나의 프리셋으로 퉁쳤죠,

ES6 -> ES5 로 다운그레이드 하는 프리셋을 사용했습니다 .

