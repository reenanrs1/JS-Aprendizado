function teste(){
    console.log('Teste')
}

teste()

const pessoa ={
    nome: 'João',
    idade: 30,
}

function gritar(prefixo){
    console.log(prefixo, this.nome)
}

gritar.apply(pessoa, ['Olaaaa '])
gritar.call(pessoa, 'Olaaaa ') //outra forma de fazer


new pessoa