using Microsoft.EntityFrameworkCore;

namespace Cinema.Models;


public class ReservaIngresso{
    private readonly AppDataContext _context;

    public ReservaIngresso(AppDataContext context)
    {
        _context = context;
    }

    public string ReservarIngressos(VendaRequest request)
    {
        var sessao = _context.Sessoes.Include(s => s.Filme).FirstOrDefault(s => s.Id == request.SessaoId);
        if (sessao == null)
        {
            return "Sessão não encontrada.";
        }

        if (sessao.IngressosDisponiveis >= request.QuantidadeIngressos)
        {
            sessao.IngressosDisponiveis -= request.QuantidadeIngressos;
            _context.SaveChanges();
            return $"{request.QuantidadeIngressos} ingressos reservados para {request.NomeCliente} na sessão {sessao.Id} do filme {sessao.Filme.Titulo}.";
        }
        else
        {
            return "Ingressos insuficientes disponíveis.";
        }
    }
}