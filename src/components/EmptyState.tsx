import styles from './EmptyState.module.css';

import clipboard from '../assets/clipboard.svg';

export function EmptyState() {
  return (
    <div className={styles.emptyState}>
      <img src={clipboard} alt="clipboard" />
      <p>
        <strong>Você ainda não tem tarefas cadastradas</strong>
        <span>Crie uma tarefa para começar</span>
      </p>
    </div>
  )
}