import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import { List, PencilSimple, Trash } from "phosphor-react";

import styles from "./TaskMenu.module.css";

interface TaskMenuProps {
  onDeleteTask: () => void;
  onEditingTask: () => void;
}

export function TaskMenu ({onDeleteTask, onEditingTask}: TaskMenuProps) {
  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger asChild>
        <button className={styles.menuIcon}>
          <List size={16} name="delete" className={styles.icon} />
        </button>
      </DropdownMenu.Trigger>
      <DropdownMenu.Portal>
        <DropdownMenu.Content className={styles.menu} sideOffset={5} align="end">
          <DropdownMenu.Item aria-label="Edit" className={styles.menuItem} onSelect={onEditingTask}>
            <PencilSimple size={16} name="edit" className={styles.edit} />
            <span className={styles.menuItemName}>Editar</span>
          </DropdownMenu.Item>
          <DropdownMenu.Item aria-label="Delete" className={styles.menuItem} onSelect={onDeleteTask}>
            <Trash size={16} name="delete" className={styles.icon} />
            <span className={styles.menuItemName}>Excluir</span>
          </DropdownMenu.Item>
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  )
}