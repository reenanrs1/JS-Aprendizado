function pagamento(preco, formaPagamento){

    if (formaPagamento === 'debito'){
        precoDebito = preco - (preco * 0.1);
        return('O valor a ser pago é R$', precoDebito);
    }else if(formaPagamento === 'pix' || formaPagamento ==='dinheiro'){
        precoPix = preco - (preco * 0.15);
        return('O valor a ser pago é R$', precoPix);
    }else if (formaPagamento === '2x'){
        return('O valor a ser pago é R$', preco);
    }else{
        precoJuros = preco + (preco * 0.1)
        return('O valor a ser pago é R$', precoJuros);
    }
}

let preco = 10;
let formaPagamento = '2x';

console.log(pagamento(preco, formaPagamento))