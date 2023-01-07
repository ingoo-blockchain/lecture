function showName() {
    // arrow function
    console.log(this)
}

function Person(name, age) {
    // class
    // this = {}
    console.log(this)
    this.name = name
    this.age = age
    // return this
}

const obj = {
    a: showName,
}

console.log(obj.a()) // this 동적바인딩 
console.log(showName()) // this 동적바인딩 

// bind call apply function 키워드 

const person = new Person('name', 32) // this 동적 바인딩

// class Person2 {
//     constructor(name, age) {
//         // this = {}
//         this.name = name
//         this.age = age
//         // return this
//     }

//     getName() {
//         return this.name
//     }
// }

// const person2 = new Person2('ingoo', 32)
// console.log(person2)

// ES6 문법은 function
