/*
1- cRIE UMA CLASE PARA REPRESENTAR CARRROS
OS CARROS POSSUEM UMA MARCA, UMA COR E UM GASTO MÉDIO DE COMBUSTIVEL POR KM RODADO.
CRIE UM MÉTODO QUE DADO A QUANTIDADE DE KM E O PREÇO DO COMBUSTIVEL NOS DE O VALOR GASTO
EM REAIS PARA REALIZAR ESTE PERCURSO.
*/

class Carro{
    marca;
    cor;
    gastoMedioCombustivel;

    constructor(marca, cor, gastoMedioCombustivel){
        this.marca = marca;
        this.cor = cor;
        this.gastoMedioCombustivel = gastoMedioCombustivel;
    }
    calcularGastoCombustivel(kmRodado, precoCombustivel){
        return kmRodado * precoCombustivel * this.gastoMedioCombustivel;
    }
}


const fiesta = new Carro ('ford','vermelho',1 / 11);
console.log(fiesta);
console.log('Você gastará de combustivel na viagem R$ ' + fiesta.calcularGastoCombustivel(40,4.90));