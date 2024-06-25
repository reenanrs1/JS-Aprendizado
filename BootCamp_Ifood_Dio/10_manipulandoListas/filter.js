const lista = [1,2,3,4,5,6,7,8,9,10]

const listaPares = lista.filter((element) =>{
    return (element % 2 === 0)
})

const listaImpar = lista.filter((element) =>{
    return (element % 3 === 0)
})

console.log(`Lista de numeros Pares ${listaPares}
Lista de numeros impar ${listaImpar}`)