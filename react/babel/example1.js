const fn = (message) => {
    const arr = [1, 2, 3, 4]
    const arr2 = [5, 6, 7, 8]

    const arr3 = [...arr, arr2]
    console.log(...arr3, message)
}

fn('hello world')
