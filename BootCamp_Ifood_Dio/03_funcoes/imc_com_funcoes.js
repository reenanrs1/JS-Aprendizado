function calcularImc (peso, altura){
    return peso /Math.pow(altura, 2);
    
}

function classificarImc(imc){
    if(imc <= 18.5){
        return("Você está baixo do peso");
    }else if(imc > 18.5 && imc <= 25){
       return("Você está no peso normal");
    }else if(imc > 25 && imc <= 30){
       return("Você está acima do peso");
    }else if (imc >30 && imc <=40){
       return("Você está obeso");
    }else{
        return("Você está obeso mórbido");
    }
}

//Main
(function (){
    const peso = 74;
    const altura = 1.74;
    
    const imc = calcularImc(peso, altura);
    console.log(classificarImc(imc));
})()

