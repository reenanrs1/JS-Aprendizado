/*
Faça um programa para calcular o valor de uma viagem.
Você terá 3 variáveis. Sendo elas:
1 - Preço do etanol;
2 - Preço da gasolina;
3 - o Tipo de combustivel que está no carro;
4 - Gasto médio de combustivel do carro por KM
5 - Distancia em KM da viagem
Imprima no console o valor que será gasto para realizar esta viagem
*/

let precoEtanol = 1.99;
let precoGasolina = 4.99;
let distanciaKM = 40;
let kmPorLitro = 11;
let tipoCombustivel = 'gasolina';

if(tipoCombustivel != 'gasolina' && 'etanol') {
    console.log('Tipo de combustivel invalido');
} else if(tipoCombustivel === 'gasolina') {
    let valorGasto1 = (precoGasolina * distanciaKM)/ kmPorLitro
    console.log('O valor gasto na viagem será de R$: ',valorGasto1.toFixed(2))
}else{
    let valorGasto2 = (precoEtanol * distanciaKM) / kmPorLitro
    console.log('O valor gasto na viagem será de R$: ',valorGasto2.toFixed(2))
}
