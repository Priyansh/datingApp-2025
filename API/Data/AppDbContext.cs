using API.Entities;
using Microsoft.EntityFrameworkCore;

namespace API.Data;
public class AppDbContext(DbContextOptions<AppDbContext> options) : DbContext(options)
{

    // Example DbSet for an entity called 'User'
    public DbSet<AppUser> Users { get; set; }

    // Add more DbSets for other entities as needed
}