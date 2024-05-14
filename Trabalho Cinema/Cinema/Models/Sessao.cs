using System.ComponentModel.DataAnnotations;
namespace Cinema.Models;

public class Sessao
{
    public int Id { get; set; }
    public int FilmeId { get; set; }
    public DateTime Data { get; set; }
    public string Horario { get; set; }
    public string Sala { get; set; }
    public decimal PrecoIngresso { get; set; }
}