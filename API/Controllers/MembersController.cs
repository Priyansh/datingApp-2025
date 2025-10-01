using API.Data;
using API.Entities;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{
    // [ApiController]
    // [Route("api/[controller]")]
    public class MembersController (AppDbContext dbContext): BaseApiController //ControllerBase
    {
        // GET: api/members
        [HttpGet]
        public async Task<ActionResult<List<AppUser>>> GetMembers()
        {
            // Placeholder for getting members logic
            var members = await dbContext.Users.ToListAsync();
            return members;
        }

        // GET: api/members/{username}
        [HttpGet("{id}")]
        public async Task<ActionResult<AppUser>> GetMember(string id)
        {
            // Placeholder for getting a single member logic
            var member = await dbContext.Users.FindAsync(id);
            if (member == null) return NotFound();
            return member;
        }
    }
}