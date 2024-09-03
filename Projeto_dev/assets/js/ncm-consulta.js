document.addEventListener('DOMContentLoaded', function() {
    const ncmForm = document.getElementById('ncmForm');
    const cnpjResult = document.getElementById('cnpjResult');
    const ncmResult = document.getElementById('ncmResult');
    const cepResult = document.getElementById('cepResult');
    const codigoBarrasResult = document.getElementById('codigoBarrasResult');
    const ncmModal = new bootstrap.Modal(document.getElementById('ncmModal'));
    const loadingMessage = document.getElementById('loadingMessage');
    const ncmInput = document.getElementById('ncmInput');


    const openModalBtns = document.querySelectorAll('[data-bs-target="#ncmModal"]');
    openModalBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            ncmModal.show();
            ncmResult.innerHTML = '';
            cepResult.innerHTML = '';
            cnpjResult.innerHTML = '';
            codigoBarrasResult.innerHTML = '';
            setTimeout(() => {
                ncmInput.focus();
            }, 500); 
        });
    });


        
    function limparNcm(ncm){
        return ncm.replace(/[^0-9]/g, '');
    }
    function validarNcm(ncm){
        if (ncm.length !== 8){       
            return false;
        }
        return true;
        
    }


    ncmForm.addEventListener('submit', function(event) {
        event.preventDefault();


        const ncm = limparNcm(ncmInput.value);
        if (!validarNcm(ncm)){
            ncmResult.innerHTML = 'NCM inválido, Por favor insira um NCM válido';
            if (ncmModal._isShown) {
                ncmModal.hide();
            }
            limpezaNcm()
            return;
        }
        loadingMessage.style.display = 'block';
        if (ncmModal._element.classList.contains('show')) {
            ncmModal.hide();
        }
        const url = `https://brasilapi.com.br/api/ncm/v1/${ncm}`;

        fetch(url)
            .then((response) => {
                if (!response.ok) {
                    if (response.status === 429) {
                        return response.json().then((errorBody) => {
                            throw new Error(`Muitas requisições: ${errorBody.detalhes}`);
                        });
                    } else {
                        throw new Error('NCM Invalido ou Vencido');
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
            if (error.message === 'Failed to fetch') {
                ncmResult.innerHTML = '<p>Erro: Site de consulta está OFF-LINE.</p>';
            }
        })
        .finally(() => {
            loadingMessage.style.display = 'none';
            ncmModal.hide();
            limpezaNcm();
        });
        
    });
    function limpezaNcm(){
        ncmInput.value = '';
    }
});