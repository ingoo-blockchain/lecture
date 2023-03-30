# Javascript 디자인 패턴



## 소개



디자인 패턴은 일반적으로 발생하는 소프트웨어 문제에 대한 고급 객체지향 솔루션.

패턴은 재사용 가능한 디자인과 객체의 상호 작용에 관한 것



각 패턴에는 이름이 있으며 복잡한 디자인 솔루션 논의할때 어휘의 일부가 됨.

23개의 GoF(Gang of Four) 패턴은 일반적으로 다른 모든 패턴의 기초로 간주됩니다. 그것들은 **생성패턴(Creational)**, **구조적 패턴(Structural)** 및

**행동 패턴(Behavioral)**의 세 그룹으로 분류 됨.





## 생성 패턴(Creational)



- **추상 팩토리 (Abstract Factory)**
  - Creates an instance of several families of classes
  - 여러 클래스 계열의 인스턴스를 만듭니다.
- **빌더 (builder)**
  - Separates object construction from its representation
  - 개체 구성을 해당 표현과 분리합니다.
- **팩토리 메서드(Factory method)**
  - Creates an instance of several derived classes
  - 여러 파생 클래스의 인스턴스를 만듭니다.
- **프로토타입(prototype)**
  -  A fully initialized instance to be copied or cloned
  - 복사 또는 복제할 완전히 초기화된 인스턴스
- **싱글톤 (Singleton)**
  - A class of which only a single instance can exist
  - 단일 인스턴스만 존재할 수 있는 클래스



## 구조적 패턴 (Structural)



- **어댑터(Adapter)**
- **브릿지(Bridge)**
- **합성(Composite)**
- **데코레이터(Decorator)**
- **페사이드(Facade)**
- **플라이웨이트(Flyweight)**
- **프록시(Proxy)**



## 행동 패턴(Behavioral)



- **책임 연쇄 (Chain of responsibility)**
- **커맨드(Command)**
- **인터프리터 (Interpreter)**
- **반복자 (iterator)**
- **중재자(mediator)**
- **메멘토(Memento)**
- **옵저버(Observer)**
- **상태(State)**
- **전략(Strategy)**
- **템플릿 메서드(Template method)**
- **비지터 패턴(Visitor)**





```javascript

// old interface

function Shipping() {
    this.request = function (zipStart, zipEnd, weight) {
        // ...
        return "$49.75";
    }
}

// new interface

function AdvancedShipping() {
    this.login = function (credentials) { /* ... */ };
    this.setStart = function (start) { /* ... */ };
    this.setDestination = function (destination) { /* ... */ };
    this.calculate = function (weight) { return "$39.50"; };
}

// adapter interface

function ShippingAdapter(credentials) {
    var shipping = new AdvancedShipping();

    shipping.login(credentials);

    return {
        request: function (zipStart, zipEnd, weight) {
            shipping.setStart(zipStart);
            shipping.setDestination(zipEnd);
            return shipping.calculate(weight);
        }
    };
}

function run() {

    var shipping = new Shipping();
    var credentials = { token: "30a8-6ee1" };
    var adapter = new ShippingAdapter(credentials);

    // original shipping object and interface

    var cost = shipping.request("78701", "10010", "2 lbs");
    console.log("Old cost: " + cost);

    // new shipping object with adapted interface

    cost = adapter.request("78701", "10010", "2 lbs");

    console.log("New cost: " + cost);
}

```

