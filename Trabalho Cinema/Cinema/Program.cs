using Cinema.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddDbContext<AppDataContext>();

builder.Services.AddCors(options =>
    options.AddPolicy("AcessoTotal",
        policy => policy
            .AllowAnyOrigin()
            .AllowAnyHeader()
            .AllowAnyMethod())
);

var app = builder.Build();



app.MapPost("/api/filme", async (Filme filme, [FromServices] AppDataContext ctx) =>
{
    ctx.Filmes.Add(filme);
    await ctx.SaveChangesAsync();
    return Results.Created($"/api/filme/{filme.Id}", filme);
});

app.MapPost("/api/sessao", async (Sessao sessao, [FromServices] AppDataContext ctx) =>
{
    try
    {
        if (sessao == null)
        {
            return Results.BadRequest("Dados da sessão não foram fornecidos corretamente.");
        }

        ctx.Sessoes.Add(sessao);
        await ctx.SaveChangesAsync(); // Use SaveChangesAsync para operações assíncronas

        return Results.Created($"/api/sessao/{sessao.Id}", sessao);
    }
    catch (Exception ex)
    {
        Console.Error.WriteLine($"Erro ao cadastrar sessão: {ex.Message}");
        return Results.Problem($"Erro interno ao cadastrar sessão: {ex.Message}", statusCode: 500);
    }
});

app.MapGet("/api/filme/listar", async ([FromServices] AppDataContext ctx) =>
{
    var filmes = await ctx.Filmes.ToListAsync();
    if (filmes.Any())
    {
        return Results.Ok(filmes);
    }
    return Results.NotFound("Tabela vazia!");
});

app.MapGet("/api/sessao/listar", async ([FromServices] AppDataContext ctx) =>
{
    var sessoes = await ctx.Sessoes
        .Include(s => s.Filme)  // Inclui o Filme relacionado com a Sessao
        .ToListAsync();

    if (sessoes.Any())
    {
        return Results.Ok(sessoes);
    }
    return Results.NotFound("Tabela vazia!");
});




app.MapPost("/api/venda", async (VendaRequest vendaRequest, [FromServices] AppDataContext ctx) =>
{
    var sessao = await ctx.Sessoes.FindAsync(vendaRequest.SessaoId);
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

    var venda = new Venda
    {
        SessaoId = vendaRequest.SessaoId,
        QuantidadeIngressos = vendaRequest.QuantidadeIngressos,
        ValorPago = vendaRequest.ValorPago,
        NomeCliente = vendaRequest.NomeCliente,
        DataVenda = vendaRequest.DataVenda,
        Titulo = "Venda de Ingressos"
    };

    ctx.Vendas.Add(venda);
    await ctx.SaveChangesAsync();

    var troco = vendaRequest.ValorPago - (sessao.PrecoIngresso * vendaRequest.QuantidadeIngressos);

    return Results.Ok(new { Mensagem = "Venda registrada com sucesso!", Troco = troco });
});

app.MapPost("/api/reserva", async (VendaRequest vendaRequest, [FromServices] AppDataContext ctx) =>
{
    var sessao = await ctx.Sessoes.Include(s => s.Filme).FirstOrDefaultAsync(s => s.Id == vendaRequest.SessaoId);
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
    await ctx.SaveChangesAsync();

    var troco = vendaRequest.ValorPago - (sessao.PrecoIngresso * vendaRequest.QuantidadeIngressos);

    return Results.Ok(new { Mensagem = "Ingressos reservados com sucesso!", Troco = troco });
});

app.MapGet("/api/vendas/relatorio", async (DateTime inicio, DateTime fim, [FromServices] AppDataContext ctx) =>
{
    var vendas = await ctx.Vendas
        .Include(v => v.Sessao) 
        .ThenInclude(s => s.Filme) 
        .Where(v => v.DataVenda >= inicio && v.DataVenda <= fim)
        .Select(v => new 
        {
            DataVenda = v.DataVenda,
            TituloFilme = v.Sessao.Filme.Titulo, 
            QuantidadeIngressos = v.QuantidadeIngressos,
            NomeCliente = v.NomeCliente
        })
        .ToListAsync();

    return Results.Ok(vendas);
});

app.MapPost("/api/acesso/cadastrar", async ([FromBody] Acesso acesso, [FromServices] AppDataContext ctx) =>
{
    ctx.Acessos.Add(acesso);
    await ctx.SaveChangesAsync();
    return Results.Created($"/acesso/{acesso.Id}", acesso);
});

app.MapPost("/api/estoque/cadastrar", async ([FromBody] Estoque estoque, [FromServices] AppDataContext ctx) =>
{
    ctx.Estoques.Add(estoque);
    await ctx.SaveChangesAsync();
    return Results.Created($"/estoque/{estoque.Id}", estoque);
});

app.MapGet("/api/estoque/listar", async ([FromServices] AppDataContext ctx) =>
{
    var estoques = await ctx.Estoques.ToListAsync();
    return Results.Ok(estoques);
});
app.UseCors("AcessoTotal");
app.Run();
