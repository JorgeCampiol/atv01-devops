import './App.css';
import { use, useEffect, useState } from 'react';

function App() {

  const [tarefa, setTarefa] = useState('');
  const [listaTarefas, setListaTarefas] = useState([]);


 useEffect(() => {
  setListaTarefas(JSON.parse(localStorage.getItem("LISTA_TAREFAS")));
 }, []);



 useEffect(() => {
      localStorage.setItem("LISTA_TAREFAS", JSON.stringify(listaTarefas));

 }, [listaTarefas]);



  const adicionarTarefa = () => {
     if (tarefa.trim() === '') { //trim remove espaços em branco jorge burro nao esqueça
      alert('Por favor, insira uma tarefa válida.');
      return;
     }


    const novaTarefa = {
      id: Date.now(), 
      nome : tarefa,
      completada: false,

    }


    setListaTarefas([...listaTarefas, novaTarefa]);

    localStorage.setItem("LISTA_TAREFAS", JSON.stringify([listaTarefas ]));
    alert('Adicionado com sucesso!');
    setTarefa('');  
  }




  const ecluirTarefa = (id) => {

    setListaTarefas(listaTarefas.filter((task) => task.id != id));
    alert('Tarefa excluída com sucesso!');
      localStorage.setItem("LISTA_TAREFAS", JSON.stringify([listaTarefas ]));
  }



  const alterarSituacao = (id) => {

  setListaTarefas(
  listaTarefas.map((task) =>(
    task.id === id ? { ...task, completada: !task.completada } : task
  ))
)
    localStorage.setItem("LISTA_TAREFAS", JSON.stringify([listaTarefas ]));

  }


  const totalConcluidas = listaTarefas.filter((task) => task.completada);

  
  return (

    <div className="todo-container">
      <h2>Lista de Tarefas </h2>

    <p>Total de Tarefas : { listaTarefas.length || 0} </p>
    <p>Total de Tarefas Concluidas : {totalConcluidas.length || 0 }</p>

      <div className="input-container">
        <input
          type="text"
          value={tarefa} 
          onChange={(e) => setTarefa(e.target.value)}
          placeholder="Adicione sua Tarefa"
        />
        

        <button onClick={adicionarTarefa}>Adicionar</button>
      </div>

      <ul>

        {
          listaTarefas.map((task) => (
          
            <li key={task.id}
              style={{textDecoration: task.completada ? 'line-through' : 'none'
              }}
            >

          {task.nome}
          <div>
            <button onClick={() => alterarSituacao(task.id)} className="complete-btn" >✔</button>
          <button disabled={task.completada} onClick={() => ecluirTarefa(task.id)} className="delete-btn">❌</button>
         
          </div>
        </li>

          ))}

        

        

      </ul>
    </div>
  );
}

export default App