using cinema.models;
using Microsoft.AspNetCore.Mvc;

var builder = WebApplication.CreateBuilder(args);
builder.Services.AddDbContext<AppDataContext>();

var app = builder.Build();

//http://localhost:5181/api/acesso/cadastrar
app.MapPost("/api/acesso/cadastrar",  ([FromBody]Acesso acesso,[FromServices] AppDataContext ctx) =>
{
    ctx.Acessos.Add(acesso);
    ctx.SaveChanges();
    return Results.Created($"/acesso/{acesso.Id}", acesso);
});


//http://localhost:5181/api/Estoque/cadastrar
app.MapPost("/api/estoque/cadastrar",  ([FromBody]Estoque estoque,[FromServices] AppDataContext ctx) =>
{
    ctx.Estoques.Add(estoque);
    ctx.SaveChanges();
    return Results.Created($"/estoque/{estoque.Id}", estoque);
});
//http://localhost:5181/api/Estoque/listar
app.MapGet("api/estoque/listar", ([FromServices]AppDataContext ctx) =>
{
    
    return Results.Ok(ctx.Estoques.ToList());
});

app.Run();
