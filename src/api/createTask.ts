import axios from 'axios';

import { BASE_API_PATH } from '../../config';

interface createTaskResponse {
  id: string;
  title: string;
  status: string;
  created_at: string;
}

export const createTask = async (values: {
  title: string;
}) => {
  const response = await axios.post<createTaskResponse>(
    `${BASE_API_PATH}/tasks/`,
    values
  );

  return response.data;
}
