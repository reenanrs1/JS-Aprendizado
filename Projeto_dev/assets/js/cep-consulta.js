document.addEventListener('DOMContentLoaded', function() {
    const cepForm = document.getElementById('cepForm');
    const cnpjResult = document.getElementById('cnpjResult');
    const ncmResult = document.getElementById('ncmResult');
    const cepResult = document.getElementById('cepResult');
    const cepModal = new bootstrap.Modal(document.getElementById('cepModal'));

    cepForm.addEventListener('submit', function(event) {
        event.preventDefault();

        cnpjResult.innerHTML = '';
        ncmResult.innerHTML = '';
        cepResult.innerHTML = '';

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
            cepResult.innerHTML = `<p>Erro: ${error.message}</p>`;
        })
        .finally(() => {
            cepModal.hide();
        });
});
});