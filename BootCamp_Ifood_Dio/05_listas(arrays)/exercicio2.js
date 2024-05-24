// 2 - Crie um prograama que seja capaz de percorrer uma lista de numeros e imprima cada numero par encontrado




    const numerosPares = [];

    for (let i = 0; i < 10; i++) {
        const numeroPar = i % 2 === 0;
        if (numeroPar) {
            numerosPares.push(i);
        }
    }

    console.log(numerosPares);