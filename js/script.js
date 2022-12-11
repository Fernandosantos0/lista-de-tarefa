const btnCadastrar = document.querySelector('#btn-cadastrar');
const inputTarefas = document.querySelector('#input-tarefa');
const tarefa = document.querySelector('#tarefas');

const criaElementoHTML5 = tag => document.createElement(tag);

const limparCampo = function() {
	inputTarefas.value = '';
	inputTarefas.focus();
}

const btnApagar = (listItem) => {
	const btnApagar = criaElementoHTML5('button');
	btnApagar.textContent = 'Apagar';
	btnApagar.style.marginLeft = '15px';
	btnApagar.style.cursor = 'pointer';
	btnApagar.className = 'apagar';
	listItem.appendChild(btnApagar);
	salvarTarefas(); /* Função para remover uma tarefa salvar no arquivo JSON e localStorage */
};

tarefa.addEventListener('click', (e) => {
	const element = e.target;
	
	if(element.classList.contains('apagar')) {
		element.parentElement.remove();
	}
});

const novaTarefa = (text) => {
	const li = criaElementoHTML5('li');
	li.textContent = text;
	tarefa.appendChild(li);
	tarefa.style.display = 'block';
	
	limparCampo();
	btnApagar(li);
	salvarTarefas(); /* Função para salvar uma tarefa salvar no arquivo JSON e localStorage */
};

btnCadastrar.addEventListener('click', () => {
	
	if(!inputTarefas.value) {
		return alert('O campo está vazio!\nPor favor, preencha o campo');
	}
	novaTarefa(inputTarefas.value);
});

inputTarefas.addEventListener('keypress', function(e) {
	const codigoTecla = e.charCode;
	
	if(codigoTecla === 13) {
		if(!inputTarefas.value) return alert('O campo está vazio!\nPor favor, preencha o campo');
		novaTarefa(inputTarefas.value);
	}
});

const salvarTarefas = function() {
	const tarefas = document.querySelectorAll('#tarefas > li');
	const taskArray = new Array();
	
	for(let task of tarefas) {
		let textFormat = task.textContent;
		let text = textFormat.replace('Apagar', '');
		taskArray.push(text);
	}
	
	const registarJSON = JSON.stringify(taskArray);
	
	// Salvando as tarefas no localStorage
	window.localStorage.setItem('registroTarefas', registarJSON);
};

window.addEventListener('load', () => {
	const registro = window.localStorage.getItem('registroTarefas');
	const registroArray = JSON.parse(registro);
	
	for(let task of registroArray) {
		novaTarefa(task);
	}
});