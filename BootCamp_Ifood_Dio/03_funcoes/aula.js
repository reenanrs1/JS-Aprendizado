function sayMyName(name){
    console.log('Your name is:' + name);
}

sayMyName('Renan'); //Executa a funçãos
sayMyName('Aline');

function quadrado(valor){
    return valor * valor;
}
const quadradoDeDez = quadrado(10)
console.log('O quadrado do numero é:' + quadradoDeDez);

function incrementarJuros(valor, percentualJuros){
    const valorDeAcrecimo = (percentualJuros / 100) * valor;
    return valor + valorDeAcrecimo;
}

console.log(incrementarJuros(100, 10));

