import { Checkbox } from "./Checkbox";
import { Check } from "phosphor-react";

import styles from "./Task.module.css";
import { TaskMenu } from "./TaskMenu";
import { ChangeEvent, useState } from "react";
import { updateTaskContentAPI } from "../api/taskAPI";

interface TaskProps {
  id: string;
  title: string;
  isComplete: boolean;
  onChangeTaskStatus: () => void;
  onDeleteTask: () => void;
}

export function Task({id, title, isComplete, onChangeTaskStatus, onDeleteTask}: TaskProps) {
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [newTitle, setNewTitle] = useState<string>(title);

  function handleChangeTaskStatus() {
    onChangeTaskStatus();
  }

  function handleDeleteTask() {
    onDeleteTask();
  }

  function handleEditingTask() {
    setIsEditing(!isEditing);
  }

  function handleOnChangeTitle(event: ChangeEvent<HTMLTextAreaElement>) {
    setNewTitle(event.target.value);
  }

  function handleOnBlurTextArea(event: ChangeEvent<HTMLTextAreaElement>) {
    updateTaskContentAPI({id, title: newTitle}).then(() => {
      setIsEditing(false);
    });
  }
    
  return (
    <div className={isComplete ? styles.task : styles.taskCompleted}>
      <div className={styles.checkboxContainer}>
        <Checkbox.Root 
          isComplete={isComplete} 
          onClick={handleChangeTaskStatus}
        >
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
        {isEditing ? (
          <textarea 
            className={styles.textarea}
            onBlur={handleOnBlurTextArea}
            onChange={handleOnChangeTitle}
            defaultValue={newTitle}
          />
        ):(
          <Checkbox.Label 
            isComplete={isComplete}
            htmlFor={`task-${id}`}
          >
            {newTitle}
          </Checkbox.Label>
        )}
        
      </div>
      <TaskMenu 
        onDeleteTask={handleDeleteTask}
        onEditingTask={handleEditingTask}
      />
    </div>
  )
}