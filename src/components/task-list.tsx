"use client";
import React, { useState } from "react";
import { TaskItem } from "./task-item";
import styles from "./task-list.module.css";
import { set } from "zod";

export type Task = {
  id: string;
  title: string;
  state: "PINNED" | "COMPLETED" | "ACTIVE";
};

export function TaskList({ tasks }: { tasks: Task[] }) {

  const [taskLists, setTasks] = useState<Task[]>(tasks);
  const [newTask, setNewTask] = useState("");
  const addTask = () => {
    setTasks([
      ...taskLists,
      {
        id: Math.random().toString(),
        title: newTask,
        state: "ACTIVE",
      },
    ]);
    setNewTask("");
  }
  const activeTasksCount = () =>{
     return taskLists.filter(task => task.state === "ACTIVE").length;
  }
  const deleteTask = (id: string) => {
    setTasks(taskLists.filter((task) => task.id !== id));
  }
  const toggleCompleted = (id: string) => {
    const updatedTasks = taskLists.map((task) => {
      if (task.id === id) {
        return {
          ...task,
          state: task.state === "ACTIVE" ? "COMPLETED" : "ACTIVE"
        };
      }
      return task;
  });
  setTasks(updatedTasks as Task[]);
  }
  return (
    <>
      <div>
        <section className={styles.counter}>
          <div className={styles.taskLabel}> {activeTasksCount()} {activeTasksCount() ===1 ? `task` : `tasks`} </div>
        </section>
        <section className={styles.section}>
          {taskLists.map((task) => (
            <TaskItem 
            key={task.id} 
            task={task} 
            handleDelete ={deleteTask} 
            handleToggleCompleted={toggleCompleted} />
          ))}
        </section>
      </div>
      <section className={styles.inputContainer}>
        <input
          type="text"
          placeholder="What needs to be done?"
          className={styles.taskInput}
          value = {newTask}
          onChange = {(e) => setNewTask(e.target.value)}
        />
        <button className={styles.taskButton} onClick={addTask}>Add Task</button>
      </section>
    </>
  );
}
