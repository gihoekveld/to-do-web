import { Header } from './components/Header';

import styles from './App.module.css';

import './global.css';
import { ToDoList } from './components/ToDoList';

function App() {
  return (
    <div>
      <Header />

      <div className={styles.wrapper}>
        <main>
          <ToDoList />
        </main>
      </div>
      
    </div>
  )
}

export default App
