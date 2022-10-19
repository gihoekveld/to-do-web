import { EmptyState } from './EmptyState';
import { Task } from './Task';
import styles from './ToDoList.module.css';

const tasks = [
  {
    id: 1,
    title: 'Integer urna interdum massa libero auctor neque turpis turpis semper. Duis vel sed fames integer.',
    isComplete: false
  },
  {
    id: 2,
    title: 'Integer urna interdum massa libero auctor neque turpis turpis semper. Duis vel sed fames integer.',
    isComplete: false
  },
  {
    id: 3,
    title: 'Integer urna interdum massa libero auctor neque turpis turpis semper. Duis vel sed fames integer.',
    isComplete: false
  },
  {
    id: 4,
    title: 'Integer urna interdum massa libero auctor neque turpis turpis semper. Duis vel sed fames integer.',
    isComplete: true
  },
  {
    id: 5,
    title: 'Integer urna interdum massa libero auctor neque turpis turpis semper. Duis vel sed fames integer.',
    isComplete: true
  }
];

export function ToDoList () {
  const countTasks = tasks.length;

  const isEmtpyList = countTasks === 0;

  const completesTasks = tasks.filter(task => task.isComplete);

  const countCompleteTasks = completesTasks.length;

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
        {isEmtpyList ? <EmptyState /> : <Task />}
      </main>
    </div>
  )
}