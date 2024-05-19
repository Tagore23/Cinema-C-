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
    // Verificar se a sessão existe
    var sessao = ctx.Sessoes.Find(vendaRequest.SessaoId);
    if (sessao == null)
    {
        return Results.NotFound("Sessão não encontrada!");
    }

    if (vendaRequest.QuantidadeIngressos <= 0)
    {
        return Results.BadRequest("Quantidade de ingressos deve ser maior que zero!");
    }

    if (sessao.IngressosDisponiveis < vendaRequest.QuantidadeIngressos)
    {
        return Results.BadRequest("Ingressos insuficientes disponíveis!");
    }

    if (vendaRequest.ValorPago < (sessao.PrecoIngresso * vendaRequest.QuantidadeIngressos))
    {
        return Results.BadRequest("Valor pago é insuficiente para o número de ingressos solicitados!");
    }

    // Inicializar a venda com os dados recebidos
    var venda = new Venda
    {
        SessaoId = vendaRequest.SessaoId,
        QuantidadeIngressos = vendaRequest.QuantidadeIngressos,
        ValorPago = vendaRequest.ValorPago,
        NomeCliente = vendaRequest.NomeCliente,
        DataVenda = vendaRequest.DataVenda,
        Titulo = "Venda de Ingressos"  // Exemplo de inicialização do título
        // Certifique-se de inicializar todas as propriedades obrigatórias conforme seu modelo de dados
    };

    ctx.Vendas.Add(venda);
    ctx.SaveChanges();

    var troco = vendaRequest.ValorPago - (sessao.PrecoIngresso * vendaRequest.QuantidadeIngressos);

    return Results.Ok(new { Mensagem = "Venda registrada com sucesso!", Troco = troco });
});


app.MapPost("/api/reserva", (VendaRequest vendaRequest, [FromServices] AppDataContext ctx) =>
{

    var sessao = ctx.Sessoes.Include(s => s.Filme).FirstOrDefault(s => s.Id == vendaRequest.SessaoId);
    if (sessao == null)
    {
        return Results.NotFound("Sessão não encontrada!");
    }


    if (sessao.IngressosDisponiveis < vendaRequest.QuantidadeIngressos)
    {
        return Results.BadRequest("Ingressos insuficientes disponíveis!");
    }


    if (sessao.IngressosDisponiveis == 0)
    {
        return Results.BadRequest("A sessão está lotada!");
    }

    sessao.IngressosDisponiveis -= vendaRequest.QuantidadeIngressos;
    ctx.SaveChanges();

    var troco = vendaRequest.ValorPago - (sessao.PrecoIngresso * vendaRequest.QuantidadeIngressos);

    return Results.Ok(new { Mensagem = "Ingressos reservados com sucesso!", Troco = troco });

    
});
app.MapGet("/api/vendas/relatorio", (DateTime inicio, DateTime fim, [FromServices] AppDataContext ctx) =>
{
    var vendas = ctx.Vendas
        .Include(v => v.Sessao) // Inclui a sessão associada à venda
        .Where(v => v.DataVenda >= inicio && v.DataVenda <= fim)
        .Select(v => new 
        {
            DataVenda = v.DataVenda,
            TituloFilme = v.Sessao.Filme.Titulo, // Acessa o título do filme através da sessão
            QuantidadeIngressos = v.QuantidadeIngressos,
            NomeCliente = v.NomeCliente
        })
        .ToList();

    return Results.Ok(vendas);
});


app.Run();


