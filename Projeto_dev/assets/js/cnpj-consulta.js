document.getElementById('cnpjForm').addEventListener('submit', function(event) {
    event.preventDefault();

    // Limpa os resultados anteriores
    document.getElementById('cnpjResult').innerHTML = '';
    document.getElementById('ncmResult').innerHTML = '';
    document.getElementById('cepResult').innerHTML = '';

    const cnpj = document.getElementById('cnpjInput').value;
    const url = `https://publica.cnpj.ws/cnpj/${cnpj}`;

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
            // Tratamento dos dados recebidos
            const cnpjData = {
                razaoSocial: jsonBody.razao_social,
                porte: jsonBody.porte.descricao,
                naturezaJuridica: jsonBody.natureza_juridica.descricao,
                cnpj: jsonBody.estabelecimento.cnpj,
                nomeFantasia: jsonBody.estabelecimento.nome_fantasia,
                situacaoCadastral: jsonBody.estabelecimento.situacao_cadastral,
                logradouro: `${jsonBody.estabelecimento.tipo_logradouro} ${jsonBody.estabelecimento.logradouro}, ${jsonBody.estabelecimento.numero}`,
                bairro: jsonBody.estabelecimento.bairro,
                cep: jsonBody.estabelecimento.cep,
                telefone: `(${jsonBody.estabelecimento.ddd1}) ${jsonBody.estabelecimento.telefone1}`,
                email: jsonBody.estabelecimento.email,
                inscricaoEstadual: jsonBody.estabelecimento.inscricoes_estaduais.length > 0 ? jsonBody.estabelecimento.inscricoes_estaduais[0].inscricao_estadual : 'N/A'
            };

            // Apresentação dos dados tratados
            const resultContainer = document.getElementById('cnpjResult');
            resultContainer.innerHTML = `
                <h3>Resultados da Consulta de CNPJ</h3>
                <p><strong>CNPJ:</strong> ${cnpjData.cnpj}</p>
                <p><strong>Razão Social:</strong> ${cnpjData.razaoSocial}</p>
                <p><strong>Nome Fantasia:</strong> ${cnpjData.nomeFantasia}</p>
                <p><strong>Porte:</strong> ${cnpjData.porte}</p>
                <p><strong>Natureza Jurídica:</strong> ${cnpjData.naturezaJuridica}</p>
                <p><strong>Situação Cadastral:</strong> ${cnpjData.situacaoCadastral}</p>
                <p><strong>Logradouro:</strong> ${cnpjData.logradouro}</p>
                <p><strong>Bairro:</strong> ${cnpjData.bairro}</p>
                <p><strong>CEP:</strong> ${cnpjData.cep}</p>
                <p><strong>Telefone:</strong> ${cnpjData.telefone}</p>
                <p><strong>Email:</strong> ${cnpjData.email}</p>
                <p><strong>Inscrição Estadual:</strong> ${cnpjData.inscricaoEstadual}</p>
            `;
        })
        .catch((error) => {
            console.error(error);
            const resultContainer = document.getElementById('cnpjResult');
            resultContainer.innerHTML = `
                <h3>Erro na Consulta</h3>
                <p>${error.message}</p>
            `;
        });
});
