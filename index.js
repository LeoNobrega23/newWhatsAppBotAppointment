const array = []

console.log(array)


for (let index = 0; index < 100; index++) {
    array.push({
        id: index,
        name: Math.random()
    })
    console.log({index, array})
}

console.log(array)