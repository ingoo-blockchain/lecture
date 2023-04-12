# BlockChain

## Typescript 설정

```sh
npm init -y
npm install typescript
```

## .prettierrc

```json
{
    "tabWidth": 4,
    "semi": false,
    "singleQuote": true,
    "trailingComma": "all",
    "printWidth": 140
}
```

## .eslintrc

```sh
npm install -D eslint eslint-plugin-prettier prettier eslint-config-prettier @typescript-eslint/eslint-plugin
```

## Jest 설정

```sh
npm install -D babel-jest @babel/core @babel/preset-env @types/jest
```

Jest 기본으로 작동할수 있지만 Typescript 로 실행 그리고 작업하기 위해서는 몇가지 설정과
개념을 확실하게 알아야 할 필요성이 있어보인다.

1. babel 설정

바벨설정은 `React` 수업에서도 진행하였습니다. 그때 파일은 `.babelrc` 로 진행했는데,
똑같이 진행하면 되겠습니다. 일단 프로젝트 루트 디렉토리에 파일을 생성합니다.

`.babelrc`

```js
{
    "presets": [
        ["@babel/preset-env", { "targets": { "node": "current" } }],
        [
            "@babel/preset-typescript",
            {
                "useBuiltIns": true
            }
        ]
    ]
}
```

_babel preset_ 설정하는데 기본적인 preset-env 와 typescript 설정을 합니다.
jest는 실행 하기 위해선 TS 로 작업된 코드를 실행을 `babel` 을 통해 `transpiler` 혹은 `compile` 을 진행하고
`jest` 를 실행합니다.
단. `.babelrc` 파일이 존재하지 않는다면 이 내용을 생략합니다.

하지만 이설정만 으로는 실행되지 않습니다.
별칭을 사용하고 있는경우는, 별칭내용을 변경해주지 않기 때문에.

별칭을 바꿔주는 플러그인을 설정 해주면 가능합니다

```sh
npm install -D tsconfig-paths-module-resolver
```

.babelrc 부분을 수정해줍니다.

```json
{
    "presets": [
        ["@babel/preset-env", { "targets": { "node": "current" } }],
        [
            "@babel/preset-typescript",
            {
                "useBuiltIns": true
            }
        ]
    ],
    "plugins": ["tsconfig-paths-module-resolver"]
}
```

