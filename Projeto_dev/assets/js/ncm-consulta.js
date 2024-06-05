document.addEventListener('DOMContentLoaded', function() {
    const ncmForm = document.getElementById('ncmForm');
    const cnpjResult = document.getElementById('cnpjResult');
    const ncmResult = document.getElementById('ncmResult');
    const cepResult = document.getElementById('cepResult');
    const ncmModal = new bootstrap.Modal(document.getElementById('ncmModal'));

    ncmForm.addEventListener('submit', function(event) {
        event.preventDefault();

        
        cnpjResult.innerHTML = '';
        ncmResult.innerHTML = '';
        cepResult.innerHTML = '';

        const ncm = document.getElementById('ncmInput').value;
        const url = `https://brasilapi.com.br/api/ncm/v1/${ncm}`;

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

                const ncmData = {
                    codigo: jsonBody.codigo || 'N/A',
                    descricao: jsonBody.descricao || 'N/A',
                    inicio: jsonBody.data_inicio || 'N/A',

                };
                const resultContainer = document.getElementById('ncmResult');
                resultContainer.innerHTML = `
                    <h3>Resultados da Consulta de NCM</h3>
                    <p><strong>Código:</strong> ${ncmData.codigo}</p>
                    <p><strong>Descrição:</strong> ${ncmData.descricao}</p>
                    <p><strong>Inicio:</strong> ${ncmData.inicio}</p>
                
            `;
        })
        .catch((error) => {
            ncmResult.innerHTML = `<p>Erro: ${error.message}</p>`;
        })
        .finally(() => {
            ncmModal.hide();
        });
        
    });
});