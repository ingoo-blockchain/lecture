# 인증 서버 만들기

```sh
npm init -y
# npm install -g sequelize-cli
npm install express mysql2 sequelize
npm install -D jest supertest node-mocks-http dotenv
```

## dotenv

```
SERVER_PORT=3000
```

## app.js

기존과 다르게 app 만 export 해줌

```js
const express = require('express')
const app = express()

app.use(express.urlencoded({ extended: false }))
app.use(express.json())

module.exports = app
```

## server.js

app을 require 받은 다음에 app.listen 매서드를 호출하는
나중에 서버를 실행할때 `node server` 로 실행함.

```js
require('dotenv')
const app = require('./app')
const PORT = process.env.SERVER_PORT || 3000
app.listen(PORT, () => {
    console.log(`Running on http://localhost:${PORT}`)
})
```

이후 `node server` 를 실행하여 listen 메서드가 실행되여 서버 대기상태가 되는지 확인.

## 디렉토리 구조

```
/
|-- lib
|-- middlewares
|-- models
|-- routes
|-- auth
|-- user
|-- .env
|-- config.js
|-- app.js
|-- server.js
|-- package.json
```

## API Document

```
GET  /api/user/me
POST /api/user/signup
POST /api/oauth/token
```

CRUD 중
`POST /api/user/signup` 부분이 회원가입 즉 CREATE 부분이기에 먼저 구현하도록함.

`user` 테이블을 생성하도록 함.

```sh
+----------+-------------+------+-----+---------+----------------+
| Field    | Type        | Null | Key | Default | Extra          |
+----------+-------------+------+-----+---------+----------------+
| id       | int         | NO   | PRI | NULL    | auto_increment |
| userid   | varchar(30) | NO   | UNI | NULL    |                |
| userpw   | varchar(64) | NO   |     | NULL    |                |
| username | varchar(30) | NO   |     | NULL    |                |
| gender   | varchar(2)  | YES  |     | 남자    |                |
+----------+-------------+------+-----+---------+----------------+
```

## Sequelize (ORM)

### ORM

`ORM` 이란
**O**bject **R**elational **M**apping 이라는 뜻으로,
데이터의 저장은 `Table` 형태로 저장하는 `RDBMS`와 `실제 어플리케이션 레이어`에서
작업하여 요청 응답을 처리해주는 `Web Server` 일 경우 `Table` 형태의 데이터를 `Object` 형태로 사용하여
데이터 조작을 하게 됩니다.

이때 발상을 반대로 하게 됩니다. (저의 개인적인 생각)

table을 만들어서 object 로 담는것이아니라.
object로 table을 만들면서, 관리하면 편하지 않을까? 라는 생각으로요
`RDBMS`는 `SQL` 이라는 문법으로 `Table` 생성, `Record` 추가 조회 수정 삭제를 처리하는데,

이것 또한 `Object`로 관리하면 편하지 않을까 라는 생각입니다.

그럼 `Object` 의 내용으로 `SQL` 문법으로 변환만 해준다면, 가능하지 않을까요 ?

실제로 저도 `PHP` 로 작업하던 시절, 결국 SQL 길이만 길어지고, 내용이 비슷하게 난무 하던 시절
저만의 SQL 생성하는 구조를 만든적이 있는데, 이게 결국 `ORM` 이더라구요, 물론 그시절 수준에 저급하긴하나, `ORM`을 배우기엔 너무 적절해서 쉽게 배웠던 기억이 납니다.

하지만 착각하면 안될것이, `ORM`이 마치 상위 개념처럼 느껴져서 `SQL` 에 소홀해 지는 경향이
생길수도 있는데, 개인적으로 저는 근본은 `SQL` 이라고 생각합니다.

그리고 `ORM` 이라는 것도 문제점은 존재합니다.
당연히 SQL 그대로 보내서 하는 것보다,
변환작업이 있는 ORM은 컴퓨터의 resource를 좀더 사용하지 않을까요?
또 대표적인 `N+1` 문제라는 것도 존재합니다.

이를 해결하기 위해 다양한 방법론으로 해결하는데, 면접질문 당골 질문입니다.

> 지금 당장 검색해서 알아 보는 것은 좋긴하나, 있다는 사실만 알아두는 것이 좋습니다.

### 실습

DB 테이블(스키마) 만들기 위해 Sequelize를 사용하도록함.
사용방법은 기존 Pool 과 비슷함.

먼저 `Server` 를 돌리기 위한 변수들 설정변수들을 모아놓는 `config.js` 파일 생성

**config.js**

```js
module.exports = {
    db: {
        development: {
            username: 'ingoo',
            password: 'ingoo',
            database: 'backend',
            host: '127.0.0.1',
            dialect: 'mysql',
        },
        test: {
            username: 'ingoo',
            password: 'ingoo',
            database: 'backend',
            host: '127.0.0.1',
            dialect: 'mysql',
            logging: false,
        },
    },
}
```

**models/index.js**

```js
require('dotenv')
const path = require('path')
const Sequelize = require('sequelize')

const env = process.env.NODE_NEV || 'development'
const config = require(path.join(__dirname, '..', 'config.js'))['db'][env]

const sequelize = new Sequelize(config.database, config.username, config.password, config)

require('./user.model')(sequelize, Sequelize)

console.log(sequelize.models.User)
console.log(typeof sequelize.models.User)
const user = new sequelize.models.User({
    userid: 'web7722',
    username: 'ingoo',
    userpw: '1234',
})

sequelize.models.User.create({
    userid: 'web7722',
    username: 'ingoo',
    userpw: '1234',
}).then((result) => console.log(result))

console.log(user)

module.exports = {
    sequelize,
    Sequelize,
}
```

지금까지는 단순하게, sequelize connection 할수있게 환경설정 해준 코드.
만약 실행을위해서는 `sequelize.sync()` 등 함수를 호출해줘야함. (기본적으로 pool을 사용함.)

### user model 생성

model 이라고 해서 생소하겠지만, 테이블(스키마) 를 객체로 담을 공간을 미리 만든다 라고 생각하면 편함.

#### 1. 기본형태

**models/user.model.js**

```js
module.exports = (sequelize, DataTypes) => {
    return sequelize.define()
}
```

`module.exports` 에 `Arrow function` 값을 넣어줌,
이후 `return` 값에 `sequelize.define()` 함수를 실행함.

`클로저` 를 사용한것이라고 볼수있음.
이때 많이 헷갈리는것이
`Arrow function` 의 첫번째 인자값
sequelize에 무엇을 넣을지를 잘모름 (Sequelize를 **인스턴스**값을 넣어줌.)

이후 두번째 인자값
`DataTypes` 에는
Sequelize 값을 넣어줌.

나중에 사용 사례 (보기만하세요.)

```js
const User = require('./user.model') // 함수값 가져옴
const user = User(sequelize, Sequelize)

// 이모양을 이해하셨으면, 한줄로 처리가능

const User = require('./user.model')(sequelize, Sequelize)
```

다시 `model` 작성으로 이어서 작업 진행함.

```js
module.exports = (sequelize, DataTypes) => {
    return sequelize.define()
}
```

해당 함수값의 내용을 `sequelize`, `DataTypes` 부분이어떤 내용이 들어갈지 확인 되었길 바람.
이부분 해소하고 진행되어야함.

이젠 `sequelize.define()` method의 인자내용을 어떤걸 넣어야할지 알아야하는데
총 3가지가있음.

1. JS 속성이름 (String)
2. Table field 정보 (Object)
3. Table option 값 (Object)

구문

```js
sequelize.define('속성이름', { 테이블필드 }, { 테이블정보 })
```

#### 2. 완성본

```js
module.exports = (sequelize, DataTypes) => {
    return sequelize.define(
        'User',
        {
            userid: {
                type: DataTypes.STRING(30),
                allowNull: false,
                unique: true,
            },
            userpw: {
                type: DataTypes.STRING(64),
                allowNull: false,
            },
            username: {
                type: DataTypes.STRING(30),
                allowNull: false,
            },
            gender: {
                type: DataTypes.STRING(2),
                defaultValue: '남자',
            },
        },
        {
            freezeTableName: true, //
            timestamps: false,
        },
    )
}
```

간략설명
**models/index.js**

```js
// ... 생략

require('./user.model')(sequelize, Sequelize)

console.log(sequelize.models.User) // User
console.log(typeof sequelize.models.User) // Function
const user = new sequelize.models.User({
    userid: 'web7722',
    username: 'ingoo',
    userpw: '1234',
})

sequelize.models.User.create({
    userid: 'web7722',
    username: 'ingoo',
    userpw: '1234',
}).then((result) => console.log(result))

console.log(user)

module.exports = {
    sequelize,
    Sequelize,
}
```

sequelize.define() 호출되면,

define 메서드안에 있던 첫번째 인자값이.

sequelize.models.[첫번째 인자값] 내용을 생성됩니다.
저는 `User` 라고 했으니 `sequelize.models.User` 이겠죠 ?

console.log 를 찍어보니 User라고 달랑 뜹니다.
순간 원시타입인 `String` 인가 싶었죠 ?

하지만 `console.log(typeof sequelize.models.User)` 를 쳐보니.
`Function`이 반환되는 것을 보고.

아 함수구나 싶었습니다.

> Javascript 이기 때문에 **일반함수** 또는 **생성자 함수(Class)** 이겠죠 ?

그래서 호출 하고보니
`new` 키워드 붙혀달라고 error message 를 친절하게 보내주더라구요

이때 이것은 생성자 함수(Class)구나 싶었습니다.

하지만 정적메서드가 있다는 것을 _공식문서_ 를 통해 찾아보았고,
실행 해봤더니 진행 되었습니다.

```js
sequelize.models.User.create({
    userid: 'web7722',
    username: 'ingoo',
    userpw: '1234',
}).then((result) => console.log(result))
```

User 객체에 내용을 채워주더라구요, 그리고 **console** 에
SQL 구문도 생기는 것을 확인 할 수 있었습니다.

### models/index.js 완성본

```js
require('dotenv')
const path = require('path')
const Sequelize = require('sequelize')

const env = process.env.NODE_NEV || 'development'
const config = require(path.join(__dirname, '..', 'config.js'))['db'][env]

const sequelize = new Sequelize(config.database, config.username, config.password, config)

require('./user.model')(sequelize, Sequelize)

module.exports = {
    sequelize,
    Sequelize,
}
```

이렇게 완성되긴 했지만..
models directory 에 xxx.model.js 가 생성 될 때마다 코드를 작성하면 귀찮아 질거 같습니다.

왜냐하면 모델 즉 테이블이 추가될때마다, 저메서드를 호출해야 해서 `fs`를 활용하여 구현해보도록 하죠.

**models/index.js**

```js
fs.readdirSync(__dirname)
    .filter((v) => v.indexOf('model') !== -1)
    .forEach((file) => {
        require(path.join(__dirname, file))(sequelize, Sequelize)
    })
```

저는 파일명에 model 이있는 경우에만 require 하도록 작성했습니다.

### sync 하기

마지막으로 `RDBMS`와 `Object`를 같은 값으로 하기위해, Sync를 하도록 하겠습니다.
Sync를 할려면, 최초에 한번만 실행하면 되기 때문에,

서버를 시작하는 `Server.js` 에서 `listen` 안에 작성하도록 하겠습니다.

**server.js**

```js
require('dotenv')
const app = require('./app')
const PORT = process.env.SERVER_PORT || 3000
const { sequelize } = require('./models')

app.listen(PORT, async () => {
    await sequelize.sync({ force: false })
    console.log(`Running on http://localhost:${PORT}`)
})
```

이후 `node server` 를 실행하면

```sh
Executing (default): SELECT TABLE_NAME FROM INFORMATION_SCHEMA.TABLES WHERE TABLE_TYPE = 'BASE TABLE' AND TABLE_NAME = 'User' AND TABLE_SCHEMA = 'backend'
Executing (default): CREATE TABLE IF NOT EXISTS `User` (`id` INTEGER NOT NULL auto_increment , `userid` VARCHAR(30) NOT NULL UNIQUE, `userpw` VARCHAR(64) NOT NULL, `username` VARCHAR(30) NOT NULL, `gender` VARCHAR(2) DEFAULT '남자', PRIMARY KEY (`id`)) ENGINE=InnoDB;
Executing (default): SHOW INDEX FROM `User` FROM `backend`
Running on http://localhost:3000
```

이러한 console 을 확인 할 수 있습니다.

이제 DataBase 설정은 완료 되었습니다.

## Auth directory

이번에는 `controller`, `services`, `repository` 디렉토리를 따로 빼지않고.
`router` 별로 디렉토리를 생성해서 해봄.

```js

```
