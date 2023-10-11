# Class

Class 가 어려운 이유
분류라는 `사고방식` 이 없기 떄문이지.

`Javascript` 기준
객체라는 것을 사용하는데

하나의 변수에 어려개의 데이터를 담고싶을때
배열 또는 객체를 사용함.

전체 반에 학생 정보 리스트

```js
const Student = {
    name:'',
    age:'',
    phone:''
    grade:''
}
```

```js
const Students = []

Students.push({
    name: '김지현',
    age: '32',
    phone: '01057570506',
    grade: 'S',
})

console.log(Students) // [{}]
```

```js
function Person(_name, _age, _phone, _grade) {
    // this = {}
    this.name = _name // {name:"김지현"}
    this.age = _age // {name:"김지현", age:32}
    this.phone = _phone // ...
    this.grade = _grade // ...
    // return this
}

// const person = new Person('김지현', '32', '01057570506', 'S')
Students.push(new Person('김지현', '32', '01057570506', 'S'))
```

```js
const Person = (_name, _age, _phone, _grade) => {
    // this = {}
    this.name = _name // {name:"김지현"}
    this.age = _age // {name:"김지현", age:32}
    this.phone = _phone // ...
    this.grade = _grade // ...
    // return this
}
```

Method

```js
function Person() {
    this.name = 'ingoo'
    this.getName = () => {
        return this.name
    }
}

const person = new Person()
```

```js
function Person() {
    this.name = 'ingoo'
}

function getName() {
    return this.name
}

Person.prototype = {
    getName,
}

const person = new Person()
```

```js
class Person {
    constructor() {
        this.name = 'ingoo'
    }

    getName() {
        return this.name
    }
}

const person = new Person()
```

Prototype ... 

```
```

로봇 <-- 청소
        <-- 물걸레
        <-- 흡입
     <-- 요리
        <-- 한식
        <-- 중식 


로봇 <-- 청소, 요리

청소 <-- 물걸레, 흡입
요리 <-- 한식, 중식