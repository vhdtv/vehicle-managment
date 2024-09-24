document.getElementById('veiculoForm').addEventListener('submit', function (e) {
    e.preventDefault();

    const veiculo = {
        marca: document.getElementById('marca').value,
        modelo: document.getElementById('modelo').value,
        ano: document.getElementById('ano').value,
        placa: document.getElementById('placa').value
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
                li.innerHTML = `
                ${veiculo.marca} - ${veiculo.modelo} - ${veiculo.ano} - ${veiculo.placa}
                <button onclick="editarVeiculo(${veiculo.id})">Editar</button>
                <button onclick="excluirVeiculo(${veiculo.id})">Excluir</button>
            `;
                veiculoList.appendChild(li);
            });
        })
        .catch(error => {
            console.error('Erro ao listar veículos:', error);
            alert('Erro ao listar veículos');
        });
}

var selectedVeiculoId = null;

function editarVeiculo(veiculoId) {
    selectedVeiculoId = veiculoId;
    fetch(`/api/veiculos/${veiculoId}`)
        .then(response => response.json())
        .then(veiculo => {
            document.getElementById('editMarca').value = veiculo.marca;

            // Carrega os modelos da marca selecionada
            carregarModelos(veiculo.marca, document.querySelector("#editModelo"), veiculo.modelo);

            // Carrega os anos no campo de edição
            carregarAnosEdit();
            document.getElementById('editAno').value = veiculo.ano;

            document.getElementById('editPlaca').value = veiculo.placa;
            document.getElementById('editPanel').style.display = 'block';
        })
        .catch(error => {
            console.error('Erro ao carregar veículo para edição:', error);
            alert('Erro ao carregar veículo');
        });
}

function salvarEdicao() {
    const veiculoAtualizado = {
        marca: document.getElementById('editMarca').value,
        modelo: document.getElementById('editModelo').value,
        ano: document.getElementById('editAno').value,
        placa: document.getElementById('editPlaca').value,
    };

    fetch(`/api/veiculos/${selectedVeiculoId}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(veiculoAtualizado),
    })
        .then(response => response.json())
        .then(data => {
            alert('Veículo atualizado com sucesso!');
            listarVeiculos();
            document.getElementById('editPanel').style.display = 'none';
        })
        .catch(error => {
            console.error('Erro ao atualizar veículo:', error);
            alert('Erro ao atualizar veículo');
        });
}

function excluirVeiculo(veiculoId) {
    if (confirm('Tem certeza que deseja excluir este veículo?')) {
        fetch(`/api/veiculos/${veiculoId}`, {
            method: 'DELETE',
        })
            .then(response => {
                if (response.ok) {
                    alert('Veículo excluído com sucesso!');
                    listarVeiculos();
                } else {
                    alert('Erro ao excluir veículo');
                }
            })
            .catch(error => {
                console.error('Erro ao excluir veículo:', error);
                alert('Erro ao excluir veículo');
            });
    }
}

function carregarModelos(marca, modeloSelect, modeloSelecionado = "") {
    modeloSelect.innerHTML = ''; // Limpa os modelos anteriores

    let modelos = [];

    if (marca === 'Ford') {
        modelos = ['Focus', 'Fiesta', 'Mustang'];
    } else if (marca === 'Chevrolet') {
        modelos = ['Onix', 'Cruze', 'Camaro'];
    } else if (marca === 'Toyota') {
        modelos = ['Corolla', 'Hilux', 'Yaris'];
    }

    modelos.forEach(modelo => {
        const option = document.createElement('option');
        option.value = modelo;
        option.textContent = modelo;
        modeloSelect.appendChild(option);
    });

    // Seleciona o modelo atual do veículo
    modeloSelect.value = modeloSelecionado;
}

function carregarAnosEdit() {
    const anoSelect = document.getElementById('editAno');
    anoSelect.innerHTML = ''; // Limpa o campo de anos

    for (let i = 2024; i >= 2000; i--) {
        const option = document.createElement('option');
        option.value = i;
        option.textContent = i;
        anoSelect.appendChild(option);
    }
}

// Inicializa o campo de anos no formulário de cadastro
function carregarAnosCadastro() {
    const anoSelect = document.getElementById('ano');
    for (let i = 2024; i >= 2000; i--) {
        const option = document.createElement('option');
        option.value = i;
        option.textContent = i;
        anoSelect.appendChild(option);
    }
}

carregarAnosCadastro();
listarVeiculos();

document.querySelector('[name="editMarca"]').addEventListener("change", function() {
    carregarModelos(this.value, document.querySelector("#editModelo"))
})

document.querySelector('[name="marca"]').addEventListener("change", function() {
    carregarModelos(this.value, document.querySelector("#modelo"))
})