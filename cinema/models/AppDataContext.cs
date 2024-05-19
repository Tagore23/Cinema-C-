using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;

namespace cinema.models;

public class AppDataContext : DbContext{

    public DbSet<Acesso> Acessos {get; set;}
    public DbSet<Estoque> Estoques {get; set;}

 protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
    {
        optionsBuilder.UseSqlite("Data Source=nomeDoSeuBanco.db");
    }
}
