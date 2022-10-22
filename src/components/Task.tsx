import { Checkbox } from "./Checkbox";
import { Check, Trash } from "phosphor-react";

import styles from "./Task.module.css";

interface TaskProps {
  id: string;
  title: string;
  isComplete: boolean;
  onChangeTaskStatus: (id: string) => void;
  onDeleteTask: (id: string) => void;
}

export function Task({id, title, isComplete, onChangeTaskStatus, onDeleteTask}: TaskProps) {
  function handleChangeTaskStatus() {
    onChangeTaskStatus(id);
  }

  function handleDeleteTask() {
    onDeleteTask(id);
  }
    
  return (
    <div className={isComplete ? styles.task : styles.taskCompleted}>
      <div className={styles.checkboxContainer}>
        <Checkbox.Root isComplete={isComplete}>
          <Checkbox.Input 
            type="checkbox" 
            id={`task-${id}`} 
            name="task"
            checked={isComplete} 
            onChange={handleChangeTaskStatus}
            readOnly
          />
          {isComplete && (<Checkbox.Icon><Check weight="bold" size={14} /></Checkbox.Icon>)}
        </Checkbox.Root>
        <Checkbox.Label isComplete={isComplete} htmlFor={`task-${id}`}>
          {title}
        </Checkbox.Label>
      </div>
      <button className={styles.trash} onClick={handleDeleteTask}>
        <Trash size={16} name="delete" className={styles.icon} />
      </button>
    </div>
  )
}