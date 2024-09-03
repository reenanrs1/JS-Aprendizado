document.addEventListener('DOMContentLoaded', function() {
    const cepForm = document.getElementById('cepForm');
    const cnpjResult = document.getElementById('cnpjResult');
    const ncmResult = document.getElementById('ncmResult');
    const cepResult = document.getElementById('cepResult');
    const codigoBarrasResult = document.getElementById('codigoBarrasResult');
    const cepModal = new bootstrap.Modal(document.getElementById('cepModal'));
    const loadingMessage = document.getElementById('loadingMessage');
    const cepInput = document.getElementById('cepInput');

    const openModalBtns = document.querySelectorAll('[data-bs-target="#cepModal"]');
    openModalBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            cepModal.show();
            ncmResult.innerHTML = '';
            cepResult.innerHTML = '';
            cnpjResult.innerHTML = '';
            codigoBarrasResult.innerHTML = '';
            setTimeout(() => {
                cepInput.focus();
            }, 500); 
        });
    });

    function limparCep(cep){
        return cep.replace(/[^0-9]/g, '');
    };

    function validarCep(cep){
        if (cep.length !==8){
            return false;
        }
        return true;
    };
    
    function generatePDF() {
        const element = document.getElementById('cepResult');
        const savePdfBtn = document.getElementById('savePdfBtn');
    
        // Oculta o botão de salvar antes de gerar o PDF
        savePdfBtn.style.display = 'none';
    
        const opt = {
            margin:       1,
            filename:     'consultacep.pdf',
            image:        { type: 'jpeg', quality: 1.0 },
            html2canvas:  { scale: 2 },
            jsPDF:        { unit: 'in', format: 'letter', orientation: 'portrait' }
        };
    
        html2pdf().from(element).set(opt).save().then(function() {
            // Mostra o botão novamente após o PDF ser salvo
            savePdfBtn.style.display = 'block';
        });
    }
    
    cepForm.addEventListener('submit', function(event) {
        event.preventDefault();
        


    const cep = limparCep(cepInput.value);
    if (!validarCep(cep)){
        cepResult.innerHTML = 'CEP inválido, Por favor insira um CEP válido';
        if (cepModal._isShown) {
            cepModal.hide();
        }
        limpezaCEP();
        return;
    }
    loadingMessage.style.display = 'block';
        if (cepModal._element.classList.contains('show')) {
            cepModal.hide();
        }
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
            const savePdfBtn = document.createElement('button');
            savePdfBtn.id = 'savePdfBtn';
            savePdfBtn.className = 'btn btn-primary mt-3';
            savePdfBtn.textContent = 'Salvar em PDF';
            resultContainer.appendChild(savePdfBtn);

            // Adiciona o event listener após o botão ser adicionado ao DOM
            savePdfBtn.addEventListener('click', generatePDF);
            
        })
        
        .catch((error) => {
            cepResult.innerHTML = `<p>Erro: ${error.message}</p>`;
        })
        .finally(() => {
            loadingMessage.style.display = 'none';
            cepModal.hide();
            limpezaCEP();
            
        });
    });
    function limpezaCEP(){
        cepInput.value = '';
    }
});