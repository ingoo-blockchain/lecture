// let animal = {
//   eats: true,
//   walt() {
//     console.log("동물은 걷습니다.");
//   },
// };

// let rabbit = {
//   jumps: true,
//   __proto__: animal,
// };

// let longEar = {
//   earLength: 10,
//   __proto__: rabbit,
// };

// rabbit.walt();
// console.log(longEar.jumps);

// let animal = {
//   eats: true,
//   walt() {},
// };

// let rabbit = {
//   __proto__: animal,
// };

// rabbit.walt = function () {
//   console.log("토끼가 껑충껑충 뜁니다.");
// };

// rabbit.walt();

let user = {
  name: "goak",
  surname: "ingoo",

  set fullName(value) {
    [this.name, this.surname] = value.split(" ");
  },

  get fullName() {
    return `${this.name} ${this.surname}`;
  },
};

let admin = {
  __proto__: user,
  isAdmin: true,
};

console.log(admin.fullName);
admin.fullName = "ingoo ingoo";

console.log(admin.fullName);

let animal = {
  walk() {
    if (!this.isSleeping) {
      console.log("동물이 걸어갑니다.");
    }
  },

  sleep() {
    this.isSleeping = true;
  },
};

let rabbit = {
  name: "하얀 토끼",
  __proto__: animal,
};

rabbit.sleep();

console.log(rabbit.isSleeping);
console.log(animal.isSleeping);

console.log(Object.keys(rabbit)); // 자기 자신의 키만 반환
for (let prop in rabbit) console.log(prop); // 자기 자신 키와 상속 프로퍼티의 키를 모두 순회

for (let prop in rabbit) {
  if (rabbit.hasOwnProperty(prop)) {
    console.log(" 자신의 프로퍼티 : ", prop);
  } else {
    console.log(` 상속 프로퍼티 : ${prop} `);
  }
}


l