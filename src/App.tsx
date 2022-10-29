import { Header } from './components/Header';

import styles from './App.module.css';

import './global.css';
import { ToDoList } from './components/ToDoList';
import { useEffect, useState } from 'react';
import { changeTaskStatusAPI, createTaskAPI, deleteTaskAPI, listTasksAPI } from './api/taskAPI';
import axios from 'axios';
import { BASE_API_PATH } from '../config';

export type TStatus = 'to-do' | 'doing' | 'done';
export interface ITask {
  id: string;
  title: string;
  created_at: string;
  status: TStatus;
}

function App() {
  const [tasks, setTasks] = useState<ITask[]>([]);

  useEffect(() => {
    listTasksAPI().then(tasks => {
      setTasks(tasks);
    }).catch(error => {
      alert('Erro ao listar tarefas');
    })
  }, []);

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
    }).catch(error => {
      alert('Erro ao alterar status da tarefa');
    })
  }

  function handleDeleteTask(id: string) {
    deleteTaskAPI(id).then(() => {
      const newTasks = tasks.filter(task => task.id !== id);

      setTasks(newTasks);
    }).catch(error => {
      alert('Erro ao deletar tarefa');
    })
  }

  function handleCreateNewTask(title: string) {
    createTaskAPI({title}).then((newTask) => {
      const newTasks = [...tasks, newTask];

      setTasks(newTasks);
    }).catch(() => {
      alert('Erro ao criar tarefa');
    }); 
  }

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
    </div>
  )
}

export default App
