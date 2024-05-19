namespace cinema.models;

public class Estoque{

  public Estoque(){
        Id = Guid.NewGuid().ToString();
    }
    public string Id {get; set;}
    public string filme {get; set;}
    public int quantidade {get; set;}
    
}