# Babel 을 통해 JSX 문법 컴파일 해보기

```
npm install @babel/preset-react
```

**.babelrc**

```json
{
    "presets": ["@babel/preset-react"]
}
```

npx babel app.js --out-file dist/app.js
