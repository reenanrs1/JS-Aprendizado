/*
1)Faça um algoritimo que dado as 3 notas tiradas por um aluno em um semestre da faculdade
calcule e imprima a sua média e a sua classificação conforme a tabela abaixo.
Média = (nota1 + nota2 + nota3) / 3
Classificação
- Média menor que 5, reprovado;
- Média entre 5 e 7, recuperação;
- Média maior que 7, aprovado.
*/

let nota1 = 10;
let nota2 = 10;
let nota3 = 10;
let media = (nota1 + nota2 + nota3) / 3

if (media < 5){
    console.log('Você foi Reprovado ')

}else if (media >= 5 && media <= 7 ){
    console.log('Você está em Recuperação')
}else {
    console.log('Você foi Aprovado')
}