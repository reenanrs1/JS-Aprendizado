document.addEventListener('DOMContentLoaded', function() {
    const codigoBarrasForm = document.getElementById('codigoBarrasForm');
    const cnpjResult = document.getElementById('cnpjResult');
    const ncmResult = document.getElementById('ncmResult');
    const cepResult = document.getElementById('cepResult');
    const codigoBarrasResult = document.getElementById('codigoBarrasResult');
    const codigoBarrasModal = new bootstrap.Modal(document.getElementById('codigoBarrasModal'));
    const codigoBarrasInput = document.getElementById('codigoBarrasInput');

    const openModalBtns = document.querySelectorAll('[data-bs-target="#codigoBarrasModal"]');
    openModalBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            codigoBarrasModal.show();
            ncmResult.innerHTML = '';
            cepResult.innerHTML = '';
            cnpjResult.innerHTML = '';
            codigoBarrasResult.innerHTML = '';

            setTimeout(() => {
                codigoBarrasInput.focus();
            }, 500); 
        });
    });

    function limparInputCodigoBarras() {
        codigoBarrasInput.value = '';
    }

    function limparCodigoBarras(codigoBarras) {
        return codigoBarras.replace(/[^0-9]/g, '');
    }

    function validarEAN13(codigo) {
        return new Promise((resolve, reject) => {
            if (codigo.length !== 13 || !/^\d+$/.test(codigo)) {
                return reject(new Error("Código de barras inválido."));
            }

            const codigoSemDigito = codigo.slice(0, 12);
            const digitoVerificador = parseInt(codigo[12]);

            let somaImpares = 0;
            let somaPares = 0;

            for (let i = 0; i < codigoSemDigito.length; i++) {
                const digito = parseInt(codigoSemDigito[i]);
                if (i % 2 === 0) {
                    somaImpares += digito;
                } else {
                    somaPares += digito;
                }
            }

            somaPares *= 3;
            const somaTotal = somaImpares + somaPares;
            const digitoCalculado = (10 - (somaTotal % 10)) % 10;

            if (digitoCalculado === digitoVerificador) {
                resolve(`O Código de barras  <strong>${codigo}</strong>  é válido.`);
            } else {
                reject(new Error(`O Código de barras <strong>${codigo}</strong> inválido.`));
            }
        });
    }

    codigoBarrasForm.addEventListener('submit', function(event) {
        event.preventDefault();

        const codigoBarras = codigoBarrasInput.value.trim();
        const codigo = limparCodigoBarras(codigoBarras);

        validarEAN13(codigo)
            .then((message) => {
                console.log(message);
                codigoBarrasResult.innerHTML = message;
            })
            .catch((error) => {
                console.error(`Erro: ${error.message}`);
                codigoBarrasResult.innerHTML = <p>${error.message}</p>;
            })
            .finally(() => {
                // Verifica se o modal está aberto antes de tentar fechá-lo
                if (codigoBarrasModal._isShown) {
                    codigoBarrasModal.hide();
                }
                limparInputCodigoBarras();
            });
    });
});