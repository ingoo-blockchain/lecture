# Babel을 사용해서 JSX를 해석하는 방법



JSX는 React에서 컴포넌트를 작성하기 위한 문법으로, 자바스크립트와 유사하지만 XML 형식을 사용합니다. Babel은 최신 자바스크립트 코드를 구형 브라우저에서도 동작할 수 있는 호환성 있는 코드로 변환해주는 도구입니다. `@babel/preset-react` 플러그인을 사용하면 Babel에서 JSX를 자바스크립트로 변환할 수 있습니다.

아래는 Babel을 사용해서 JSX를 해석하는 방법입니다.



## 1. Babel 및 `@babel/preset-react` 설치

먼저, Babel CLI와 `@babel/preset-react` 플러그인을 설치합니다.

```
scssCopy code
npm install --save-dev @babel/cli @babel/core @babel/preset-react
```

## 2. .babelrc 파일 생성

`.babelrc` 파일을 생성하고, 다음과 같이 `@babel/preset-react` 플러그인을 추가합니다.

```
{
  "presets": ["@babel/preset-react"]
}
```

## 3. JSX 코드 작성

JSX 코드를 작성합니다. 다음은 간단한 예제 코드입니다.

```
const element = <h1>Hello, world!</h1>;
```

## 4. Babel 실행

Babel CLI를 이용해 변환 명령어를 실행합니다. 다음은 변환 명령어입니다.

```
npx babel [변환할 파일 경로] -d [변환된 파일이 저장될 경로]
```

변환할 파일 경로에는 JSX 코드가 포함된 파일 경로를 지정하면 됩니다. `-d` 옵션으로 지정한 경로에 변환된 파일이 저장됩니다.

## 5. 변환된 파일 확인

변환된 파일을 확인합니다. 다음은 변환된 파일의 코드입니다.

```
const element = /*#__PURE__*/React.createElement("h1", null, "Hello, world!");
```

위 코드에서 `React.createElement` 함수를 이용해 JSX 코드가 자바스크립트 코드로 변환된 것을 확인할 수 있습니다.

따라서, 위 예제 코드를 이용해 Babel을 사용해서 JSX를 해석하는 방법을 학습할 수 있습니다.