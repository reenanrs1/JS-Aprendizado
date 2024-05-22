// % = RESTO

const numero = 2;

const numeroPar = (numero % 2) === 0;

if (numero == 0){
    console.log("Numero digitado é 0 e não é divisivel");
} else if (numeroPar){
    console.log('O numero digitado é Par')
} else {
    console.log('O numero digitado é Impar')
}
