
class Pessoa{
    constructor(nome){
        this.name = nome
    }
}

const lista = [new Pessoa('Renan'), new Pessoa('Aline'), new Pessoa('Kaynan'), new Pessoa('Ellyda'), new Pessoa('Claudemir'), new Pessoa('Andreia')]

const listaNomes = lista.map((element) => element.name)


console.log(listaNomes)