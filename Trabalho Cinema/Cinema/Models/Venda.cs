
namespace Cinema.Models
{
    public class Venda
    {
        public DateTime DataVenda{ get; set; }
        public int FilmeId { get; set; }
        public int QuantidadeIngressos { get; set; }
        public string NomeCliente { get; set; }
        public int Filme { get;  set; }
         public int VendaId { get; set; }
        public string Titulo{ get; set; }
        public decimal ValorPago{ get; set; }
        public int SessaoId{ get; set; }
        public Sessao Sessao { get; set; }
        
    }
}
