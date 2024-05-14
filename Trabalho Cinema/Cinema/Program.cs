using System.Security.Cryptography;
using Cinema.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddDbContext<AppDataContext>();

var app = builder.Build();

app.MapPost("/api/filme", (Filme filme, [FromServices] AppDataContext ctx) =>
{
    ctx.Filmes.Add(filme);
    ctx.SaveChanges();
    return Results.Created($"/api/filme/{filme.Id}", filme);
});

app.MapPost("/api/sessao", (Sessao sessao, [FromServices] AppDataContext ctx) =>
{
    ctx.Sessoes.Add(sessao);
    ctx.SaveChanges();
    return Results.Created($"/api/sessao/{sessao.Id}", sessao);
});

app.Run();
