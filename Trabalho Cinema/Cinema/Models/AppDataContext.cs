using Microsoft.EntityFrameworkCore;

namespace Cinema.Models;

public class AppDataContext : DbContext
{
    

    public DbSet<Filme> Filmes { get; set; }
    public DbSet<Sessao> Sessoes { get; set; }
    public DbSet<Venda> Vendas { get; set; }
    public DbSet<Acesso> Acessos {get; set;}
    public DbSet<Estoque> Estoques {get; set;}
   
   
   
    
    
    

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
    {
        optionsBuilder.UseSqlite("Data Source=Cinema.db");
    }

    protected override void OnModelCreating(ModelBuilder modelBuilder){
        modelBuilder.Entity<Sessao>().HasOne(s => s.Filme).WithMany().HasForeignKey(s => s.FilmeId);
    }
}