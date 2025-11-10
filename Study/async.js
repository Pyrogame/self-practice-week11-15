function doSomething(hasResource) {
    return new Promise((resolve, reject) => {
        setTimeout(() => (hasResource ? resolve("done") : reject("fail")), 5000)
    })
}

//2. async-await
async function working2() {
    console.log("stating...")
    try {
        const workStatus = await doSomething(false)
        console.log(workStatus)
        console.log("ending...")
    } catch (error) {
        console.log(error)
    }
}
working2()


















// console.log("starting...")
// const workStatus = doSomething(true)
// console.log(workStatus)
// console.log("ending...")

// console.log('starting...')
// doSomething(false)
//   .then((result)=>{
//     console.log("working...")
//     console.log(`work status= ${result}`)
//     console.log("ending...")
// })
//   .catch((error)=>{
//     console.log(error)
// })