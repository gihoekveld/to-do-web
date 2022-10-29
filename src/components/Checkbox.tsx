import { InputHTMLAttributes, LabelHTMLAttributes, ReactNode } from "react";
import { Slot } from "@radix-ui/react-slot";

import styles from "./Checkbox.module.css";

export interface CheckboxRootProps {
  isComplete?: boolean;
  children: ReactNode;
  onClick: () => void;
}

function CheckboxRoot({isComplete, children, onClick}: CheckboxRootProps) {
  return (
    <div 
      className={isComplete ? styles.background : styles.border}
      onClick={onClick}
    >
      {children}
    </div>
  )
}

export interface CheckboxIconProps {
  children: ReactNode;
}

function CheckboxIcon(props: CheckboxIconProps) {
  return (
    <Slot className={styles.marker}>
      {props.children}
    </Slot>
  )
}

interface CheckboxLabelProps extends LabelHTMLAttributes<HTMLLabelElement> {
  isComplete?: boolean;
}

function CheckboxLabel({children, isComplete, ...props}: CheckboxLabelProps) {
  return (
    <label 
      className={isComplete ? styles.checkboxLabelLineTrough : styles.checkboxLabel} 
      {...props}
    >
      {children}
    </label>
  )
}

export interface CheckboxInputProps extends InputHTMLAttributes<HTMLInputElement> {}

function CheckboxInput(props: CheckboxInputProps) {
  return (
    <input 
      className={styles.checkboxInput}
      {...props}
    />
  )
}

export const Checkbox = {
  Root: CheckboxRoot,
  Input: CheckboxInput,
  Label: CheckboxLabel,
  Icon: CheckboxIcon
}