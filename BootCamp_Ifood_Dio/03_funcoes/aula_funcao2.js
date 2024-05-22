function escreverNome(nome){
    return('Meu nome é: ' + nome);
}

function verificarIdade(idade){
    if (idade >= 18){
        return('Você é maior de idade!')
    }else{
        return('Você é menor de idade')
    }
}

(function (){
    console.log(escreverNome('Renan'));
    console.log(verificarIdade(18));
})()