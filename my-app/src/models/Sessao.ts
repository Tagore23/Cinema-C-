import { Filme } from './Filme';

export interface Sessao {
    Id: number;
    FilmeId: number;
    Data: Date; // Usando Date para representar a data
    Horario: string; // Usando string para representar o horário, mas pode ser ajustado conforme necessário
    Sala: string;
    PrecoIngresso: number;
    IngressosDisponiveis: number;
    Filme: Filme;
}