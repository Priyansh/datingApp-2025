using System.Security.Cryptography;
using System.Text;
using API.Controllers;
using API.Data;
using API.DTOs;
using API.Entities;
using API.Extensions;
using API.Interfaces;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace DatingRealApp.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AccountController(AppDbContext dbContext, ITokenService tokenService) : BaseApiController
    {
        [HttpPost("register")]
        public async Task<ActionResult<UserDto>> Register(RegisterDto registerDto)
        {
            if(await EmailExists(registerDto.Email)) 
                return BadRequest("Email is already in use");
            using var hmac = new HMACSHA512();
            var user = new AppUser
            {
                Email = registerDto.Email,
                DisplayName = registerDto.DisplayName,
                PasswordHash = hmac.ComputeHash(System.Text.Encoding.UTF8.GetBytes(registerDto.Password)),
                PasswordSalt = hmac.Key
            };
            dbContext.Users.Add(user);
            await dbContext.SaveChangesAsync();
            await Task.CompletedTask;

            return user.ToUserDto(tokenService);
        }

        [HttpPost("login")]
        public async Task<ActionResult<UserDto>> Login(LoginDto loginDto) {
            var user = await dbContext.Users.FirstOrDefaultAsync(x => x.Email == loginDto.Email);
            if(user == null) return Unauthorized("Invalid email");

            using var hmac = new HMACSHA512(user.PasswordSalt);
            var computedHash = hmac.ComputeHash(Encoding.UTF8.GetBytes(loginDto.Password));
            for(int i = 0; i < computedHash.Length; i++) {
                if(computedHash[i] != user.PasswordHash[i]) return Unauthorized("Invalid password");
            }
            return user.ToUserDto(tokenService);
        }
        public async Task<bool> EmailExists(string email)
        {
            return await dbContext.Users.AnyAsync(x => x.Email.ToLower() == email.ToLower());
        }   
    }

  
}