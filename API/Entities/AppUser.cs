using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using Microsoft.AspNetCore.Authentication;

namespace API.Entities;

public class AppUser
{
    public string Id { get; set; } = Guid.NewGuid().ToString();
    [Required]
    public string DisplayName { get; set; }
    [Required]
    public string Email { get; set; }
    
    [Required]
    public  byte[] PasswordHash { get; set; } 
    [Required]
    public  byte[] PasswordSalt { get; set; }
}