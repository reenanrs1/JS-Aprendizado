/*
boolean
null - ausencia de valor
undefined - não existe - ausencia de declarção
number
string
synbol




//object
true, false

new Boolean(true) //objeto - classe
*/
 
const nome = ' ';

if (nome){
    console.log('Preenchido');
}else{
    console.log('Não preenchido');
}

const x = {
    nome: 'João',
    idade: 20
}
x['nome'] = 'Renan'

console.log(x.nome)
console.log(x['nome'])