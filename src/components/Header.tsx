import { ChangeEvent, FormEvent, useState } from 'react';
import { PlusCircle } from 'phosphor-react';

import styles from './Header.module.css';

import codeLearnLogo from '../assets/code-learn-logo.svg';

interface HeaderProps {
  onCreateNewTask: (title: string) => void;
}

export function Header({onCreateNewTask}: HeaderProps) {
  const [newTask, setNewTask] = useState('');

  function handleNewTaskChange(event: ChangeEvent<HTMLInputElement>) {
    setNewTask(event.target.value);
  }

  function handleCreateNewTask(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    onCreateNewTask(newTask);
    setNewTask('');
  }

  return (
    <header className={styles.header}>
      <div>
        <img src={codeLearnLogo} alt="To Do List Logo" />
      </div>
      <div>
        <form onSubmit={handleCreateNewTask} className={styles.taskForm}>
          <input 
            type="text" 
            name="task" 
            placeholder="Adicione uma nova tarefa" 
            onChange={handleNewTaskChange} 
            value={newTask}
          />
          <button type="submit">
            <span>Criar</span>
            <PlusCircle size={20} weight="bold" />
          </button>
        </form>
      </div>
    </header>
  )
}