# 전략패턴

```js
class Character {
    name
    constructor(_name) {
        this.name = _name
    }

    attack() {}
    move() {}
}

class BonoBono extends Character {
    constructor(_name) {
        super(_name)
    }

    attack() {
        console.log(`${this.name} 공격`)
    }

    move() {
        console.log(`${this.name} 이동`)
    }
}

class Hani extends Character {
    constructor(_name) {
        super(_name)
    }

    attack() {
        console.log(`${this.name} 공격`)
    }

    move() {
        console.log(`${this.name} 이동`)
    }
}

class Main {
    static start() {
        const bonobono = new BonoBono('bonobono')
        const hani = new Hani('hani')

        bonobono.attack()
        bonobono.move()

        console.log(`-------`)

        hani.attack()
        hani.move()
    }
}

Main.start()
```

위 코드는 문제가 많다.

-   기존 캐릭터의 공격 or 이동 을 수정하려면 어떤 작업을 해야하는가?
    -   ex ) 보노보노는 걷기만 되고, 하니는 달리기도 만들고 싶다면?
-   새로운 캐릭터를 만들어 기존의 공격 또는 이동 방법을 추가하거나 수정할려면?
    -   ex ) 새로운 캐릭터를 만들어서 스킬을 추가하려면?

> -   기존의 코드 내용을 수정 발생 (OCP 위배)
> -   각각 캐릭터의 move, attack 메서드 기능 중복.

## 새로운 캐릭터에 공격/이동 방법을 추가/수정 하는 경우

-   새로운 캐릭터에 기존의 공격 또는 이동 방법을 추가하거나 변경하려고 하면 문제발생
-   다른 클래스와의 특정 메서드 중복 사용
-   시스템 변경에 따른 기존 모든 코드 수정

## 해결책

-   무엇이 변화되었는가? 에 중점
-   변화된 것을 찾은 후 **캡슐화**
    -   이동 방식 : move()
    -   공격 방식 : attack()
-   외부에서 구체적인 이동 방식, 공격 방식을 담은 클래스 은닉화
-   공격, 이동을 위한 인터베이스 생성, 실현할 클래스를 만듬

> **인터페이스란?**
> 인터페이스는 변수나 함수, 그리고 클래스가 만족해야하는 최소 규격을 지정할 수 있게 해주는 도구이다.
> 그래서 사용자 정의 자료형으로도 사용할 수 있다.
