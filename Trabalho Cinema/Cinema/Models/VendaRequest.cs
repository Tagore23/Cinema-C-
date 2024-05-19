namespace Cinema.Models;

public class VendaRequest
{
    

    public int QuantidadeIngressos{ get; set; }
    public int SessaoId { get; set; }
    public decimal ValorPago { get; set; }
    public string NomeCliente{ get; set; }
      public DateTime DataVenda{ get; set; }
    
    
   
}