const lista = [{nome: 'Renan'},{nome: 'Aline'},{nome: 'Kaynan'},{nome: 'Ellyda'} ];

console.log(lista.map((e) =>e.nome).join('-'))


const elementosEmHtml = lista
    .map((e) => `<li>${e.nome}</li>`)
    .join('');

console.log(elementosEmHtml)