document.getElementById('cepForm').addEventListener('submit', function(event) {
    event.preventDefault();


    document.getElementById('cepResult').innerHTML = '';
    document.getElementById('cnpjResult').innerHTML = '';
    document.getElementById('ncmResult').innerHTML = '';

    const cep = document.getElementById('cepInput').value;
    const url = `https://viacep.com.br/ws/${cep}/json/`;

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
                throw new Error('CEP não encontrado');
            }

           
            const cepData = {
                cep: jsonBody.cep || 'N/A',
                logradouro: jsonBody.logradouro || 'N/A',
                bairro: jsonBody.bairro || 'N/A',
                localidade: jsonBody.localidade || 'N/A',
                uf: jsonBody.uf || 'N/A',
                ibge: jsonBody.ibge || 'N/A',
                ddd: jsonBody.ddd || 'N/A'
            };

           
            const resultContainer = document.getElementById('cepResult');
            resultContainer.innerHTML = `
                <h3>Resultados da Consulta de CEP</h3>
                <p><strong>CEP:</strong> ${cepData.cep}</p>
                <p><strong>Logradouro:</strong> ${cepData.logradouro}</p>
                <p><strong>Bairro:</strong> ${cepData.bairro}</p>
                <p><strong>Localidade:</strong> ${cepData.localidade}</p>
                <p><strong>UF:</strong> ${cepData.uf}</p>
                <p><strong>IBGE:</strong> ${cepData.ibge}</p>
                <p><strong>DDD:</strong> ${cepData.ddd}</p>
            `;
        })
        .catch((error) => {
            console.error(error);
            const resultContainer = document.getElementById('cepResult');
            resultContainer.innerHTML = `
                <h3>Erro na Consulta</h3>
                <p>${error.message}</p>
            `;
        });
});
