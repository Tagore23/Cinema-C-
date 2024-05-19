namespace cinema.models;

public class Acesso{
    public Acesso(){
        Id = Guid.NewGuid().ToString();
    }
    public string Id {get; set;}
    public string Nome {get; set;}
    public string Senha {get; set;}
}