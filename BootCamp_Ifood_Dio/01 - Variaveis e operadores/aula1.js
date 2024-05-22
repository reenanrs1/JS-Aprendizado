/*Faça um Programa para calcular o valor de uma viagem.
3 variaveis:
preço do combustivel
Gasto médio de combustivel do carro por km
distancia em km da viagem;

*/
let preco = 5.98;
let kmPorLitro = 11;
let distancia = 40; 
let gastomedio = (distancia/kmPorLitro) * preco ;

console.log('O gasto de combustivel é de R$ : ',gastomedio.toFixed(2))
