import axios from 'axios';

import { BASE_API_PATH } from '../../config';

type TStatus = 'to-do' | 'doing' | 'done';

interface ITask {
  id: string;
  title: string;
  status: TStatus;
  created_at: string;
}

export const listTasksAPI = async () => {
  const response = await axios<ITask[]>(
    `${BASE_API_PATH}/tasks/`
  );

  return response.data;
}

export const createTaskAPI = async (values: {
  title: string;
}) => {
  const response = await axios.post<ITask>(
    `${BASE_API_PATH}/tasks/`,
    values
  );

  return response.data;
}

export const changeTaskStatusAPI = async (values: {
  id: string;
  status: TStatus;
}) => {
  const response = await axios.patch<ITask>(
    `${BASE_API_PATH}/tasks/${values.id}/status`,
    {status: values.status}
  );

  return response.data;
}

export const updateTaskAPI = async (values: {
  id: string;
  title: string;
}) => {
  const response = await axios.put<ITask>(
    `${BASE_API_PATH}/tasks/${values.id}`,
    {title: values.title}
  );

  return response.data;
}

export const deleteTaskAPI = async (id: string) => {
  const response = await axios.delete(
    `${BASE_API_PATH}/tasks/${id}`
  );

  return response.data;
}


