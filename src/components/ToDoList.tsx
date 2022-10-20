import { EmptyState } from './EmptyState';
import { Task } from './Task';
import styles from './ToDoList.module.css';

interface ToDoListProps {
  tasks: {
    id: string;
    title: string;
    date: string;
    isComplete: boolean;
  }[];
  onChangeTaskStatus: (id: string) => void;
  onDeleteTask: (id: string) => void;
}

export function ToDoList ({tasks, onChangeTaskStatus, onDeleteTask}: ToDoListProps) {
  const countTasks = tasks.length;

  const isEmtpyList = countTasks === 0;

  const countCompleteTasks = tasks.filter(task => task.isComplete).length;

  function handleChangeTaskStatus(id: string) {
    onChangeTaskStatus(id);
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
              return (
                <Task 
                  key={task.id} 
                  id={task.id}
                  title={task.title} 
                  isComplete={task.isComplete}
                  onChangeTaskStatus={() => handleChangeTaskStatus(task.id)}
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