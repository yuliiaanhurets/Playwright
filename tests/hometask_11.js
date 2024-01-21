async function getRandomInt(min, max) {
    return new Promise((resolve) => {
        setTimeout(() => {
            min = Math.ceil(min);
            max = Math.floor(max);
            resolve(Math.floor(Math.random() * (max - min) + min));
        }, 2000)
    })
}

async function getSumInt(randomValue) {
    return new Promise((resolve) => {
        setTimeout(() => {
            let sum = randomValue + 1000;
            resolve(sum);
        }, 3000)
    })
}

async function getMultiplicationInt(sum) {
    return new Promise((resolve) => {
        setTimeout(() => {
            let multiplication = sum * 6;
            resolve(multiplication);
        }, 3000)
    })
}

getRandomInt(10, 100).then((randomValue) => {
    getSumInt(randomValue);
    return randomValue;
}).then((sum) => {
    getMultiplicationInt(sum);
    return sum;
}).then((result) => {
    console.log(result);
});