var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services
    .AddReverseProxy()
    .LoadFromConfig(builder.Configuration.GetSection("ReverseProxy"));
var app = builder.Build();

app.UseSwagger();
app.UseSwaggerUI(c =>
{
  
    c.SwaggerEndpoint(
        "/api/openapi.json",
        "Heart Attack Prediction API (FastAPI)"
    );

 
    c.RoutePrefix = "swagger";
});



app.MapReverseProxy();
app.Run();

 