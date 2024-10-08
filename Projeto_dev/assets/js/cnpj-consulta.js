document.addEventListener('DOMContentLoaded', function() {
    const cnpjForm = document.getElementById('cnpjForm');
    const cnpjResult = document.getElementById('cnpjResult');
    const ncmResult = document.getElementById('ncmResult');
    const cepResult = document.getElementById('cepResult');
    const codigoBarrasResult = document.getElementById('codigoBarrasResult');
    const cnpjModal = new bootstrap.Modal(document.getElementById('cnpjModal'));
    const loadingMessage = document.getElementById('loadingMessage');
    const cnpjInput = document.getElementById('cnpjInput');
    
    const openModalBtns = document.querySelectorAll('[data-bs-target="#cnpjModal"]');
    openModalBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            cnpjModal.show();
            ncmResult.innerHTML = '';
            cepResult.innerHTML = '';
            cnpjResult.innerHTML = '';
            codigoBarrasResult.innerHTML = '';
            setTimeout(() => {
                cnpjInput.focus();
            }, 500); 
        });
    });

    function limparCnpj(cnpj){
        return cnpj.replace(/[^0-9]/g, '');
    };

    function validarCnpj(cnpj){
        if (cnpj.length !==14){
            return false;
        }
        return true;
    };
    
    cnpjForm.addEventListener('submit', function(event) {
        event.preventDefault();

    

    
        const cnpj = limparCnpj(cnpjInput.value);
        if (!validarCnpj(cnpj)){
            cnpjResult.innerHTML = 'CNPJ inválido, Por favor insira um CNPJ válido';
            if (cnpjModal._isShown) {
                cnpjModal.hide();
            }
            limpezaCnpj()
            return;
        }

        loadingMessage.style.display = 'block';
        if (cnpjModal._element.classList.contains('show')) {
            cnpjModal.hide();
        }
        
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
                        
                        simplesNacional: `${jsonBody.simples !== null && jsonBody.simples.simples !== null && jsonBody.simples.simples !=='' ? jsonBody.simples.simples: 'Não se enquadra.'}`,

                        mei: `${jsonBody.simples !== null && jsonBody.simples.mei !== null && jsonBody.simples.mei !=='' ? jsonBody.simples.mei: 'Não se enquadra.'}`,

                        estado: estabelecimento.estado.nome,
                        
                        nomeFantasia: (estabelecimento.nome_fantasia !== null && estabelecimento.nome_fantasia !== '') ? estabelecimento.nome_fantasia : 'Não Possui nome fantasia',
                        
                        situacaoCadastral: (estabelecimento.situacao_cadastral !== null && estabelecimento.situacao_cadastral !== '') ? estabelecimento.situacao_cadastral: 'Não possui situação cadastral',
                        
                        logradouro: `${estabelecimento.tipo_logradouro !== null && estabelecimento.tipo_logradouro !=='' ? estabelecimento.tipo_logradouro: 'Não possui tipo de logradouro.'} ,
                        
                        ${estabelecimento.logradouro !== null && estabelecimento.logradouro !=='' ? estabelecimento.logradouro: 'Não possui um logradouro.'} , 
                        
                        ${estabelecimento.numero !== null & estabelecimento.numero !=='' ? estabelecimento.numero: 'Não possui numero.'}`,

                        bairro: estabelecimento.bairro !== null && estabelecimento.bairro !=='' ? estabelecimento.bairro : 'Não possui bairro',
                        cep: estabelecimento.cep !== null && estabelecimento.cep !== '' ? estabelecimento.cep :'Não possui CEP',

                        telefone: `(${estabelecimento.ddd1 !== null && estabelecimento.ddd1 !== '' ? estabelecimento.ddd1: 'Não possui DD.'}) 
                        ${estabelecimento.telefone1 !== null && estabelecimento.telefone1 !== '' ? estabelecimento.telefone1: 'Não possui telefone.'}`,

                        email: estabelecimento.email !== null && estabelecimento.email !== '' ? estabelecimento.email :'Nao possui email',
                        inscricoesEstaduais: 'N/A' 
                    };

                    if (estabelecimento.inscricoes_estaduais && estabelecimento.inscricoes_estaduais.length > 0) {
                        cnpjData.inscricoesEstaduais = estabelecimento.inscricoes_estaduais
                            .map((inscricao) => {
                                const ativoStyle = inscricao.ativo ? 'color: green;' : 'color: red;'; 
                                const ativoText = inscricao.ativo ? 'Ativo' : 'Não ativo';
                                return `
                                    <p style="margin-bottom: 10px;">
                                        <strong style="font-weight: bold;">Inscrição Estadual:</strong> ${inscricao.inscricao_estadual}<br>
                                        <strong style="font-weight: bold;">Estado:</strong> ${inscricao.estado.nome}<br>
                                        <strong style="font-weight: bold; ${ativoStyle}">Status:</strong> <span style="${ativoStyle}">${ativoText}</span>
                                    </p>
                                `;
                            })
                            .join(''); 
                    }

                    cnpjResult.innerHTML = `
                        <h3>Resultados da Consulta de CNPJ</h3>
                        <p><strong>CNPJ:</strong> ${cnpjData.cnpj}</p>
                        <p><strong>Razão Social:</strong> ${cnpjData.razaoSocial}</p>
                        <p><strong>Nome Fantasia:</strong> ${cnpjData.nomeFantasia}</p>
                        <p><strong>Porte:</strong> ${cnpjData.porte}</p>
                        <p><strong>Simples Nacional:</strong> ${cnpjData.simplesNacional}</p>
                        <p><strong>MEI:</strong> ${cnpjData.mei}</p>
                        <p><strong>Natureza Jurídica:</strong> ${cnpjData.naturezaJuridica}</p>
                        <p><strong>Situação Cadastral:</strong> ${cnpjData.situacaoCadastral}</p>
                        <p><strong>Logradouro:</strong> ${cnpjData.logradouro}</p>
                        <p><strong>Bairro:</strong> ${cnpjData.bairro}</p>
                        <p><strong>CEP:</strong> ${cnpjData.cep}</p>
                        <p><strong>Estado:</strong> ${cnpjData.estado}</p>
                        <p><strong>Telefone:</strong> ${cnpjData.telefone}</p>
                        <p><strong>Email:</strong> ${cnpjData.email}</p>
                        <p><strong>Inscrições Estaduais:</strong> ${cnpjData.inscricoesEstaduais}</p>
                    `;
                } else {
                    cnpjResult.innerHTML = '<p>Nenhum resultado encontrado.</p>';
                }
            })
            .catch((error) => {
                cnpjResult.innerHTML = `<p>Erro: ${error.message}</p>`;
            })
            .finally(() => {
                loadingMessage.style.display = 'none';
                cnpjModal.hide();
                limpezaCnpj();
   
            });
    });
    function limpezaCnpj(){
        cnpjInput.value = '';
    }

});
