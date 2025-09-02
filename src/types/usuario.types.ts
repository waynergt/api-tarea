export interface Usuario {
  id: number;
  nombre: string;
  email: string;
  rol: 'tecnico' | 'coordinador';
}

export interface PaginacionInfo {
  total: number;
  totalPages: number;
  currentPage: number;
  pageSize: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
}

export interface UsuariosResponse {
  ok: boolean;
  usuarios: Usuario[];
  paginacion: PaginacionInfo;
  error?: string;
}
