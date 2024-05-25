/*
3 - Faça um programa que calcule e imprima o salario a ser transferido para um funcionario
Para realizar o calculo receba o valor bruto do salário e o adicional dos beneficios
O salaário a ser transferido é calculado da seguinte maneira

Valor bruto do salarío - percentual de imposto mediante a faixa salarial + adicional

De R$ 0.00 a R$ 1100 = 5%
De $1100.01 a R$2500 = 10%
Maior que R$ 2500.00 = 15%

Exemplo :
Entrada 2000
250

Saida : 2050
*/

const{ gets, print } = require ('./funcoes3');

const salarioBruto = gets();
const valorAdicional = gets();

function calcularImporto(valor, percentual){
    return (valor * percentual) / 100;
}

function aliquota(salario){
    if(salario <= 1100){
        return 5;
        }else if(salario > 1100 && salario <= 2500){
            return 10;
            }else{
                return 15;
            }
}

const aliqutaImporto = aliquota(salarioBruto);
const imposto = calcularImporto(salarioBruto, aliqutaImporto);
const valorLiquido = salarioBruto - imposto + valorAdicional;

print(valorLiquido);