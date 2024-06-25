

const lista = [1,2,3,4,5,6,7,8,9,10]

const somaDeTodosOsNumeros = lista.reduce((previus, current) =>{
    return previus + current
},0)

console.log(somaDeTodosOsNumeros)