using Microsoft.EntityFrameworkCore;

namespace Cinema.Models;

public class AppDataContext : DbContext
{
    public DbSet<Filme> Filmes { get; set; }
    public DbSet<Sessao> Sessoes { get; set; }

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
    {
        optionsBuilder.UseSqlite("Data Source=Cinema.db");
    }
}