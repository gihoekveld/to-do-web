import { Header } from './components/Header';

import styles from './App.module.css';

import './global.css';
import { ToDoList } from './components/ToDoList';
import { useState } from 'react';

const tasksList = [
  {
    id: 'bcb89cc4-6130-49d0-b39d-f1fd86db1779',
    title: 'Integer urna interdum massa libero auctor neque turpis turpis semper. Duis vel sed fames integer.',
    date: '2022-08-01T00:00:00.000Z',
    isComplete: false
  },
  {
    id: '764c7b98-c7c5-4362-a855-d79277bf71c2',
    title: 'Integer urna interdum massa libero auctor neque turpis turpis semper. Duis vel sed fames integer.',
    date: '2022-09-10T00:00:00.000Z',
    isComplete: false
  },
  {
    id: '28294ce0-0955-4550-806b-a00791abcdc2',
    title: 'Integer urna interdum massa libero auctor neque turpis turpis semper. Duis vel sed fames integer.',
    date: '2022-10-10T00:00:00.000Z',
    isComplete: false
  },
  {
    id: '10538f4a-722c-44a8-bbdf-bcd595e0c139',
    title: 'Integer urna interdum massa libero auctor neque turpis turpis semper. Duis vel sed fames integer.',
    date: '2022-10-11T00:00:00.000Z',
    isComplete: true
  },
  {
    id: '5718ab6f-8566-474e-980b-5d536bd534d5',
    title: 'Integer urna interdum massa libero auctor neque turpis turpis semper. Duis vel sed fames integer.',
    date: '2022-10-13T00:00:00.000Z',
    isComplete: true
  }
];

function App() {
  const [tasks, setTasks] = useState(tasksList);

  function handleChangeTaskStatus(id: string) {
    const newTasks = tasks.map(task => {
      if (task.id === id) {
        return {
          ...task,
          isComplete: !task.isComplete
        }
      }

      return task;
    });

    setTasks(newTasks);
  }

  function handleDeleteTask(id: string) {
    const newTasks = tasks.filter(task => task.id !== id);

    setTasks(newTasks);
  }

  function handleCreateNewTask(title: string) {
    const newTask = {
      id: Math.random().toString(36).substring(2, 9),
      title,
      date: new Date().toISOString(),
      isComplete: false
    }

    setTasks([...tasks, newTask]);
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
