class Pessoa{
    nome;
    idade;
    profissao;
    anoDeNascimento;

    constructor(nome, idade, profissao){
        this.nome = nome;
        this.idade = idade;
        this.profissao = profissao;
        this.anoDeNascimento = 2024 - idade
    }
    descrever(){
        console.log(`Meu nome é ${this.nome}, minha idade é ${this.idade} e eu trabalho como ${this.profissao}`);
    }
}

function compararPessoas (p1,p2){
    if(p1.idade > p2.idade){
        console.log(`${p1.nome} é mais velho(a) que ${p2.nome}`);
    } else if(p2.idade > p1.idade){
        console.log(`${p2.nome} é mais velho(a) que ${p1.nome}`);
    }else{
        console.log(`${p2.nome} e ${p1.nome} tem a mesma idade`)
    }
}

const renan = new Pessoa ('Renan', 25, 'Programador');
const aline = new Pessoa ('Aline', 28, 'Vendedora');

compararPessoas(renan, aline);