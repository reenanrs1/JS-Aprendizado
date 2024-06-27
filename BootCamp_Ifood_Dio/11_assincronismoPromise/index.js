//Assincronismo


// new Promise((resolve, reject)=>{
//     //...
//     //...
//     resolve()
//     //...
//     reject()
// })

// Promise SEMPRE terá que ter o then, catch, finally, que seria basicamente o try/catch

const promessaDeUmNumeroQualquer = new Promise((resolve, reject)=>{
    setTimeout(() =>{
        const numero = parseInt(Math.random() *100)
        resolve(numero)
    },1000)//definir o tempo de execução do código

})

promessaDeUmNumeroQualquer
    .then((numero)=> {
    console.log(`O número é ${numero}`)
    })
    .catch((erro)=>{
    console.log(`O erro é ${erro}`)
    })
    .finally(()=>{
        console.log('Fim da execução')
    })  