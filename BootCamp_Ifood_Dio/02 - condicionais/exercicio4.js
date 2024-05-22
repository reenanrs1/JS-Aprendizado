/*
Elabore um algoritmo que calcule o que deve ser pago por um produto, considerando o preço normal de etiqueta
e a escolha da condição de pagamento
utilize os códigos da tablea a seguir para ler qual a condição de pagamento escolhida e efetuar o calculo adequado.

Código Condição de pagamento:
- A vista Débito, recebe 10% de desconto;
- A vista no dinheiro ou pix, recebe 15% de desconto;
- Em duas vezes, preço normal de etiqueta sem juros
- Acima de duas vezes, preço normal da etiqueta mais juros de 10%;
*/



let preco = 10;
let formaPagamento = 'dinheiro';
console.log('O preço do produto é R$', preco)
console.log('Formas de pagamento: debito recebe 10% Desc, dinheiro/pix recebe 15% desc, 2x preço normal, maior que 2x 10% juros')

if (formaPagamento === 'debito'){
    precoDebito = preco - (preco * 0.1)
    console.log('O valor a ser pago é R$', precoDebito)
}else if(formaPagamento === 'pix' || formaPagamento ==='dinheiro'){
    precoPix = preco - (preco * 0.15)
    console.log('O valor a ser pago é R$', precoPix)
}else if (formaPagamento === '2x'){
    console.log('O valor a ser pago é R$', preco)
}else{
    precoJuros = preco + (preco * 0.1)
    console.log('O valor a ser pago é R$', precoJuros)
}
