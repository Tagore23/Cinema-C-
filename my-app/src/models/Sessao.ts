// models/Sessao.ts
import { Filme } from "./Filme";

export interface Sessao {
  Id: number;
  FilmeId: number;
  Data: Date; 
  Horario: string;
  Sala: string;
  PrecoIngresso: number;
  IngressosDisponiveis: number;
  Filme?: Filme;
}