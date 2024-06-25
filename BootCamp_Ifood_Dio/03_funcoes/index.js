/*function falarMeuNome (){
    console.log('Meu nome é Renan')
}

function falarNomeCompleto(falarMeuNome){
    falarMeuNome()
    console.log('Rodrigues dos Santos')
}

falarNomeCompleto(falarMeuNome)*/

/*
function nomeDaFuncao(){ //FUNCTION DECLARATION

}

const nomeDeOutraFuncao =function(){ //Declara ela em uma variavel

}
Diferença = function nomeDaFuncao(){ -- posso puxar a função antes que dara certo, const nomeDeOutraFuncao =function() não pode puxar a função antes pois irá dar undefined
*/

/*function funcao1(){
    console.log(this)
}

const funcao2 = ()=>{
    console.log(this)
}
const renan = {
    nome: 'Renan',
    funcao1,
    funcao2
}

renan.funcao1()
renan.funcao2()

Diferença, a function deixa passar as informações então retornando ela irá passar a função do const, já a => não deixa
*/


/*
Clousures

function soma(x){
    return function(y){
        return x + y
    }
}

const somaParcial = soma(10)
console.log(somaParcial(20))
console.log(somaParcial(30))
console.log(somaParcial(40))

*/