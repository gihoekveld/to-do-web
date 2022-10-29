import { Header } from './components/Header';

import styles from './App.module.css';

import './global.css';
import { ToDoList } from './components/ToDoList';
import { useEffect, useState } from 'react';
import { changeTaskStatusAPI, createTaskAPI, deleteTaskAPI, listTasksAPI } from './api/taskAPI';
import { ToastContainer } from 'react-toastify';
import { errorAlert } from './utils/alert';

export type TStatus = 'to-do' | 'doing' | 'done';
export interface ITask {
  id: string;
  title: string;
  created_at: string;
  status: TStatus;
}

function App() {
  const [tasks, setTasks] = useState<ITask[]>([]);

  function handleChangeTaskStatus(id: string, status: TStatus) {
    changeTaskStatusAPI({id, status}).then(task => {
      const newTasks = tasks.map(task => {
        if (task.id === id) {
          const status: TStatus = task.status === 'done' ? 'to-do' : 'done';
  
          return {
            ...task,
            status
          }
        }
  
        return task;
      });
  
      setTasks(newTasks);
    }).catch(() => {
      errorAlert('Erro ao mudar status! Verifique sua conexão com a internet e tente novamente.');
    })
  }

  function handleDeleteTask(id: string) {
    deleteTaskAPI(id).then(() => {
      const newTasks = tasks.filter(task => task.id !== id);

      setTasks(newTasks);
    }).catch(() => {
      errorAlert('Erro ao deletar tarefa! Verifique sua conexão com a internet e tente novamente.');
    })
  }

  function handleCreateNewTask(title: string) {
    createTaskAPI({title}).then((newTask) => {
      const newTasks = [...tasks, newTask];

      setTasks(newTasks);
    }).catch(() => {
      errorAlert('Erro ao criar tarefa! Verifique sua conexão com a internet e tente novamente.');
    }); 
  }

  useEffect(() => {
    listTasksAPI().then(tasks => {
      setTasks(tasks);
    }).catch(() => {
      errorAlert('Erro ao listar tarefas! Verifique sua conexão com a internet e tente novamente.');
    })
  }, []);

  return (
    <div>
      <Header onCreateNewTask={handleCreateNewTask} />
      <div className={styles.wrapper}>
        <main className={styles.main}>
          <ToDoList 
            tasks={tasks}
            onChangeTaskStatus={handleChangeTaskStatus}
            onDeleteTask={handleDeleteTask}
          />
        </main>
      </div>
      <ToastContainer /> 
    </div>
  )
}

export default App
