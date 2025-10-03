
using System.ComponentModel.DataAnnotations;

namespace API.DTOs;
public class UserDto
{
    [Required]
    public string Id { get; set; }
    [Required]
    public string Email { get; set; }
    [Required]
    public string DisplayName { get; set; }
    [Required]
    public string? ImageUrl { get; set; }
    public string Token { get; set; }
    
// Add other properties as needed
}