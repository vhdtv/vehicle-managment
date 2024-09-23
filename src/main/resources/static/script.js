document.getElementById('veiculoForm').addEventListener('submit', function (e) {
    e.preventDefault();

    const veiculo = {
        marca: document.getElementById('marca').value,
        modelo: document.getElementById('modelo').value,
        ano: document.getElementById('ano').value,
        placa: document.getElementById('placa').value,
    };

    fetch('/api/veiculos', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(veiculo),
    })
    .then(response => response.json())
    .then(data => {
        alert('Veículo cadastrado com sucesso!');
        listarVeiculos();
        limparFormulario();
    })
    .catch(error => {
        console.error('Erro ao cadastrar veículo:', error);
        alert('Erro ao cadastrar veículo');
    });
});

function listarVeiculos() {
    fetch('/api/veiculos')
    .then(response => response.json())
    .then(data => {
        const veiculoList = document.getElementById('veiculoList');
        veiculoList.innerHTML = '';
        data.forEach(veiculo => {
            const li = document.createElement('li');
            li.textContent = `${veiculo.marca} - ${veiculo.modelo} - ${veiculo.ano} - ${veiculo.placa}`;
            veiculoList.appendChild(li);
        });
    })
    .catch(error => {
        console.error('Erro ao listar veículos:', error);
        alert('Erro ao listar veículos');
    });
}

function limparFormulario() {
    document.getElementById('marca').value = '';
    document.getElementById('modelo').value = '';
    document.getElementById('ano').value = '';
    document.getElementById('placa').value = '';
}

// Inicializa a listagem de veículos ao carregar a página
listarVeiculos();
