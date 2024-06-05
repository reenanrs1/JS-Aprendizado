document.getElementById('ncmForm').addEventListener('submit', function(event) {
    event.preventDefault();

    // Limpa os resultados anteriores
    document.getElementById('ncmResult').innerHTML = '';
    document.getElementById('cnpjResult').innerHTML = '';
    document.getElementById('cepResult').innerHTML = '';

    const ncm = document.getElementById('ncmInput').value;
    const url = `https://brasilapi.com.br/api/ncm/v1/${ncm}`; // Substitua pela URL correta para consultar o NCM

    fetch(url)
        .then((response) => {
            if (!response.ok) {
                if (response.status === 429) {
                    return response.json().then((errorBody) => {
                        throw new Error(`Muitas requisições: ${errorBody.detalhes}`);
                    });
                } else {
                    throw new Error('Erro na consulta');
                }
            }
            return response.json();
        })
        .then((jsonBody) => {
            if (jsonBody.erro) {
                throw new Error('NCM Invalido ou Vencido');
            }

            // Tratamento dos dados recebidos
            const ncmData = {
                codigo: jsonBody.codigo || 'N/A',
                descricao: jsonBody.descricao || 'N/A',
                inicio: jsonBody.data_inicio || 'N/A',

            };
            // Apresentação dos dados tratados
            const resultContainer = document.getElementById('ncmResult');
            resultContainer.innerHTML = `
                <h3>Resultados da Consulta de NCM</h3>
                <p><strong>Código:</strong> ${ncmData.codigo}</p>
                <p><strong>Descrição:</strong> ${ncmData.descricao}</p>
                <p><strong>Inicio:</strong> ${ncmData.inicio}</p>
            
        `;
    })
        .catch((error) => {
            console.error(error);
            const resultContainer = document.getElementById('ncmResult');
            resultContainer.innerHTML = `
                <h3>Erro na Consulta</h3>
                <p>${error.message}</p>
            `;
    });
});