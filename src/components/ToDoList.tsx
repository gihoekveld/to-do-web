import styles from './ToDoList.module.css';

import clipboard from '../assets/clipboard.svg';

export function ToDoList () {
  return (
    <div>
      <header className={styles.header}>
        <div className={styles.info}>
          <strong>Tarefas criadas</strong>
          <span>0</span>
        </div>
        <div className={styles.info}>
          <strong>Concluídas</strong>
          <span>0</span>
        </div>
      </header>
      <main className={styles.main}>
        <div className={styles.emptyState}>
          <img src={clipboard} alt="clipboard" />
          <p>
            <strong>Você ainda não tem tarefas cadastradas</strong>
            <span>Crie uma tarefa para começar</span>
          </p>
        </div>
      </main>
    </div>
  )
}