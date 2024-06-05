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
            const estabelecimento = jsonBody.estabelecimento;
            if (estabelecimento) {
                const cnpjData = {
                    razaoSocial: jsonBody.razao_social,
                    porte: jsonBody.porte.descricao,
                    naturezaJuridica: jsonBody.natureza_juridica.descricao,
                    cnpj: estabelecimento.cnpj,
                    nomeFantasia: estabelecimento.nome_fantasia,
                    situacaoCadastral: estabelecimento.situacao_cadastral,
                    logradouro: `${estabelecimento.tipo_logradouro} ${estabelecimento.logradouro}, ${estabelecimento.numero}`,
                    bairro: estabelecimento.bairro,
                    cep: estabelecimento.cep,
                    telefone: `(${estabelecimento.ddd1}) ${estabelecimento.telefone1}`,
                    email: estabelecimento.email,
                    inscricoesEstaduais: 'N/A' 
                };
                
                if (estabelecimento.inscricoes_estaduais && estabelecimento.inscricoes_estaduais.length > 0) {
                    cnpjData.inscricoesEstaduais = estabelecimento.inscricoes_estaduais
                        .map((inscricao) => {
                            const ativoStyle = inscricao.ativo ? 'color: green;' : 'color: red;'; // Define a cor verde para 'Ativo' e vermelho para 'Não ativo'
                            const ativoText = inscricao.ativo ? 'Ativo' : 'Não ativo';
                            return `
                                <p style="margin-bottom: 10px;">
                                    <strong style="font-weight: bold;">Inscrição Estadual:</strong> ${inscricao.inscricao_estadual}<br>
                                    <strong style="font-weight: bold;">Estado:</strong> ${inscricao.estado.nome}<br>
                                    <strong style="font-weight: bold; ${ativoStyle}">Ativo:</strong> <span style="${ativoStyle}">${ativoText}</span>
                                </p>
                            `;
                        })
                        .join(''); 
                }
                
                const resultContainer = document.getElementById('cnpjResult');
                resultContainer.innerHTML = `
                    <h3>Resultados da Consulta de CNPJ</h3>
                    <p><strong>CNPJ:</strong> ${cnpjData.cnpj}</p>
                    <p><strong>Razão Social:</strong> ${cnpjData.razaoSocial}</p>
                    <p><strong>Nome Fantasia:</strong> ${cnpjData.nomeFantasia} </p>
                    <p><strong>Porte:</strong> ${cnpjData.porte}</p>
                    <p><strong>Natureza Jurídica:</strong> ${cnpjData.naturezaJuridica}</p>
                    <p><strong>Situação Cadastral:</strong> ${cnpjData.situacaoCadastral}</p>
                    <p><strong>Logradouro:</strong> ${cnpjData.logradouro}</p>
                    <p><strong>Bairro:</strong> ${cnpjData.bairro}</p>
                    <p><strong>CEP:</strong> ${cnpjData.cep}</p>
                    <p><strong>Telefone:</strong> ${cnpjData.telefone}</p>
                    <p><strong>Email:</strong> ${cnpjData.email}</p>
                    <p><strong>Inscrições Estaduais:</strong><br>${cnpjData.inscricoesEstaduais}</p>

                `;
            } else {
                const resultContainer = document.getElementById('cnpjResult');
                resultContainer.innerHTML = `
                    <h3>Erro na Consulta</h3>
                    <p>Não foi possível encontrar informações sobre o estabelecimento.</p>
                `;
            }
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
