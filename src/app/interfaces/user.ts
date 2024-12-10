export interface User {
  userId: string;
  firebaseId?: string;
  name: string;
  cpf: string;
  endereco: string;
  telefone: number;
  email: string;
  sector: string;
  role: string;
  healthPlan?: string;
  dentalPlan?: string;
}
export interface Processo {
  processoId?: string;
  userId: string;
  numeroProcesso: string;
  tipo: string;
  status: string;
  descricao: string;
  dataAbertura: string;
}
export interface movimentacao {
  data: string;
  descricao: string;
}
export interface ProcessosResponse {
  user: User | null; // Permite que o usuário seja nulo
  processos: Processo[];
}
