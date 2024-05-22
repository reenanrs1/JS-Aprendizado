/*
2)  O IMC - Indice de Massa corporal é um critério de Organização Mundial de saude para dar uma indicaçõ
sobre a condição de peso de uma pessoa adulta.

Formula do IMC:
IMC = peso / (altura * altura)

Elabore um algoritimo que dado o peso e a alura de um adulto mostre sua condição de acordo com a tabela abaixo.
IMC em adulto Condição
- Abaixo de 18.5 Abaixo do peso;
- Entre 18.5 e 25 Peso normal;
- Entre 25 e 30 Acima do peso;
- Entre 30 e 40 Obesidade;
- Acima de 40 Obesidade mórbida;

*/

let peso = 71;
let altura = 1.70;
let imc = peso / (altura * altura);

if(imc <= 18.5){
    console.log("Você está baixo do peso");
}else if(imc > 18.5 && imc <= 25){
    console.log("Você está no peso normal");
}else if(imc > 25 && imc <= 30){
    console.log("Você está acima do peso");
}else if (imc >30 && imc <=40){
    console.log("Você está obeso");
}else{
    console.log("Você está obeso mórbido");
}