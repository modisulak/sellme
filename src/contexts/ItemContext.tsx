import React, { createContext, useState, useEffect } from 'react';

export const TasksContext = createContext({} as TasksContextProps);

export interface TaskProps {
  itemId: string;
  userId: string;
  itemDesc: string;
  itemLocation: [];
  itemPrice: number;
}

interface TasksContextProps {
  tasks: TaskProps[];
  addTask: (newTask: TaskProps) => void;
  removeTask: (id: string) => void;
  updateCheckedStatus: (updatedTask: TaskProps, checked: boolean) => void;
  updateDate: (updatedTask: TaskProps, date: string) => void;
  updateTaskColor: (slugBeingUpdated: string, color: string) => void;
  changeTasksOrder: (result: TaskProps[]) => void;
}
