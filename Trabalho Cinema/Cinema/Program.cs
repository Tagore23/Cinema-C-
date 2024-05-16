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

app.MapGet("/api/filme/listar",
    ([FromServices] AppDataContext ctx) =>
{
    if (ctx.Filmes.Any())
    {
        return Results.Ok(ctx.Filmes.ToList());
    }
    return Results.NotFound("Tabela vazia!");
});

app.MapGet("/api/sessao/listar",
    ([FromServices] AppDataContext ctx) =>
{
    if (ctx.Sessoes.Any())
    {
        return Results.Ok(ctx.Sessoes.ToList());
    }
    return Results.NotFound("Tabela vazia!");
});

app.MapPost("/api/venda", (VendaRequest vendaRequest, [FromServices] AppDataContext ctx) =>
{
    var sessao = ctx.Sessoes.Include(s => s.Filme).FirstOrDefault(s => s.Id == vendaRequest.SessaoId);
    if (sessao == null)
    {
        return Results.NotFound("Sessão não encontrada!");
    }

    if (vendaRequest.ValorPago < sessao.PrecoIngresso)
    {
        return Results.BadRequest("Valor pago é insuficiente!");
    }

    var troco = vendaRequest.ValorPago - sessao.PrecoIngresso;
    return Results.Ok(new { Mensagem = "Ingresso comprado com sucesso!", Troco = troco });
});

app.Run();
