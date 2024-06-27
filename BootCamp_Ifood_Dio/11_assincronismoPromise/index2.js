const fs = require('fs')

const promesaDaLeitura = fs.promises.readFile('tarefas.csv')

promesaDaLeitura
.then((arquivo) => arquivo.toString('utf8'))
.then((texto) => (texto.split('\n').slice(1)))
.then((linhasSemCabecalho) => linhasSemCabecalho.map((linha) => {
    const [nome, feito] = linha.split(';')
    return {nome, feito: feito === 'true'}
}))
.then((listaDeTarefas) => console.log(listaDeTarefas))
.catch((erro) => console.log('Deu ruim',erro))