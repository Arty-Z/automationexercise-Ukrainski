import axios, { AxiosResponse } from 'axios';

const BASE_URL = process.env.BASE_URL || 'https://automationexercise.com';
const API_BASE_URL = `${BASE_URL}/api`;

interface APIResponse {
  status: number;
  data: any;
  headers: any;
}

export async function getAPI(endpoint: string): Promise<APIResponse> {
  try {
    const response: AxiosResponse = await axios.get(`${API_BASE_URL}${endpoint}`);
    return {
      status: response.status,
      data: response.data,
      headers: response.headers,
    };
  } catch (error: any) {
    if (error.response) {
      return {
        status: error.response.status,
        data: error.response.data,
        headers: error.response.headers,
      };
    }
    throw error;
  }
}

export async function postAPI(endpoint: string, data: any): Promise<APIResponse> {
  try {
    const response: AxiosResponse = await axios.post(`${API_BASE_URL}${endpoint}`, data);
    return {
      status: response.status,
      data: response.data,
      headers: response.headers,
    };
  } catch (error: any) {
    if (error.response) {
      return {
        status: error.response.status,
        data: error.response.data,
        headers: error.response.headers,
      };
    }
    throw error;
  }
}

export async function putAPI(endpoint: string, data: any): Promise<APIResponse> {
  try {
    const response: AxiosResponse = await axios.put(`${API_BASE_URL}${endpoint}`, data);
    return {
      status: response.status,
      data: response.data,
      headers: response.headers,
    };
  } catch (error: any) {
    if (error.response) {
      return {
        status: error.response.status,
        data: error.response.data,
        headers: error.response.headers,
      };
    }
    throw error;
  }
}

export async function deleteAPI(endpoint: string): Promise<APIResponse> {
  try {
    const response: AxiosResponse = await axios.delete(`${API_BASE_URL}${endpoint}`);
    return {
      status: response.status,
      data: response.data,
      headers: response.headers,
    };
  } catch (error: any) {
    if (error.response) {
      return {
        status: error.response.status,
        data: error.response.data,
        headers: error.response.headers,
      };
    }
    throw error;
  }
}
