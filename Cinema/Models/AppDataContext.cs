using Microsoft.EntityFrameworkCore;

namespace Cinema.Models;

public class AppDataContext : DbContext
{
    public DbSet<Filme> Filme { get; set; }
    public DbSet<Sessao> Sessao { get; set; }

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
    {
        optionsBuilder.UseSqlite("Data Source=Cinema.db");
    }
}