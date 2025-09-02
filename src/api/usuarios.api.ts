import api from './axios';
import type { UsuariosResponse } from '../types/usuario.types';

export const usuariosAPI = {
  listar: async (page: number = 1, pageSize: number = 10): Promise<UsuariosResponse> => {
    const response = await api.get(`/usuarios?page=${page}&pageSize=${pageSize}`);
    return response.data;
  }
};
