class ArrayStack {
    top
    itemArray
    stackSize

    constructor(stackSize) {
        /*...*/
        this.stackSize = stackSize
        this.itemArray = new Array(stackSize)
        this.top = 0
    }

    isEmpty() {
        /*...*/
    }
    isFull() {
        /*...*/
    }
    push(item) {
        /*...*/
    }
    pop() {
        /*...*/
    }
    peek() {
        /*...*/
    }
}

class Main {
    static start() {
        const st = new ArrayStack(10)
        st.itemArray[++st.top] = 20 // pop, push method를 이용하지 않고 직접 배열에 저장
        console.log(st.itemArray[st.top])
        console.log(st)
    }
}

Main.start()
