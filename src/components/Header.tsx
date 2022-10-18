import styles from './Header.module.css';

import toDoListLogo from '../assets/to-do-list-logo.svg';
import { PlusCircle } from 'phosphor-react';

export function Header() {
  return (
    <header className={styles.header}>
      <div>
        <img src={toDoListLogo} alt="To Do List Logo" />
      </div>
      <div>
        <form className={styles.taskForm}>
          <input type="text" name="task" placeholder="Adicione uma nova tarefa" />
          <button type="submit"><span>Criar</span><PlusCircle size={20} weight="bold" /></button>
        </form>
      </div>
    </header>
  )
}