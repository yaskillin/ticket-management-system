using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddDbContext<TicketDbContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection")));

builder.Services.AddControllers();
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowClient", policy =>
        policy.WithOrigins("http://localhost:3000")  // Allow requests from React
              .AllowAnyMethod()
              .AllowAnyHeader());
});

var app = builder.Build();

app.UseCors("AllowClient");
app.MapControllers();
app.Run();
