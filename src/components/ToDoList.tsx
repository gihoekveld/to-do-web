import { ITask, TStatus } from '../App';
import { EmptyState } from './EmptyState';
import { Task } from './Task';

import styles from './ToDoList.module.css';

interface ToDoListProps {
  tasks: ITask[];
  onChangeTaskStatus: (id: string, status: TStatus) => void;
  onDeleteTask: (id: string) => void;
}

export function ToDoList ({tasks, onChangeTaskStatus, onDeleteTask}: ToDoListProps) {
  const countTasks = tasks.length;

  const isEmtpyList = countTasks === 0;

  const countCompleteTasks = tasks.filter(task => task.status === 'done').length;

  function handleChangeTaskStatus(id: string, status: TStatus) {
    const newStatus = status === 'done' ? 'to-do' : 'done';
    onChangeTaskStatus(id, newStatus);
  }

  function handleDeleteTask(id: string) {
    onDeleteTask(id);
  }

  return (
    <div>
      <header className={styles.header}>
        <div className={styles.info}>
          <strong>Tarefas criadas</strong>
          <span>{countTasks}</span>
        </div>
        <div className={styles.info}>
          <strong>Concluídas</strong>
          <span>{countCompleteTasks} de {countTasks}</span>
        </div>
      </header>
      <main className={styles.main}>
        {
          isEmtpyList
          ? <EmptyState /> 
          : (tasks.map(task => {
              const isComplete = task.status === 'done';

              return (
                <Task 
                  key={task.id} 
                  id={task.id}
                  title={task.title} 
                  isComplete={isComplete}
                  onChangeTaskStatus={() => handleChangeTaskStatus(task.id, task.status)}
                  onDeleteTask={() => handleDeleteTask(task.id)}
                />
              )
            })
          )
        }
      </main>
    </div>
  )
}