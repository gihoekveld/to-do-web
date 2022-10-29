import { Checkbox } from "./Checkbox";
import { Check } from "phosphor-react";
import { TaskMenu } from "./TaskMenu";
import { ChangeEvent, useState } from "react";
import { updateTaskContentAPI } from "../api/taskAPI";

import styles from "./Task.module.css";
import { errorAlert, successAlert } from "../utils/alert";

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
    setIsEditing(true);
  }

  function handleOnChangeTitle(event: ChangeEvent<HTMLInputElement>) {
    setNewTitle(event.target.value);
  }

  function handleOnKeyDownInput(event: React.KeyboardEvent<HTMLInputElement>) {
    if (event.key === 'Enter') {
      handleUpdateTaskContent();
    }
  }

  function handleUpdateTaskContent() {
    setIsEditing(false);
    updateTaskContentAPI({id, title: newTitle})
    .then(() => {
      successAlert('Tarefa atualizada com sucesso');
    })
    .catch(() => {
      errorAlert('Erro ao atualizar tarefa! Verifique sua conexão com a internet e tente novamente.');
    })
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
          <input
            ref={ref => ref && ref.focus()} 
            className={styles.inputTitle}
            onBlur={handleUpdateTaskContent}
            onChange={handleOnChangeTitle}
            onKeyDown={handleOnKeyDownInput}
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
      {isEditing ? (
        <button 
          aria-label="Salvar tarefa"
          title="Salvar tarefa"
          className={styles.saveButton} 
          onClick={handleUpdateTaskContent}
        >
          <Check className={styles.saveIcon} weight="bold" size={14} />
        </button>
      ) : (
        <TaskMenu 
          onDeleteTask={handleDeleteTask}
          onEditingTask={handleEditingTask}
        />
      )}
    </div>
  )
}