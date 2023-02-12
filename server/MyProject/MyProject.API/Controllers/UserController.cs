using Microsoft.AspNetCore.Mvc;
using MyProject.API.Models;
using MyProject.Common.DTOs;
using MyProject.Services.Interfaces;

namespace MyProject.API.Controllers
{
    [ApiController]
    [Route("[controller]")]

    public class UserController : ControllerBase
    {
        private readonly IUserService _userServise;


        public UserController(IUserService userServise)
        {
            _userServise = userServise;
        }
        [HttpGet]
        public async Task<List<UserDTO>> Get()
        {
            return await _userServise.GetAllAsync();
        }
        [HttpGet("{id}")]
        public async Task<UserDTO> Get(int id)
        {
            return await _userServise.GetByIdAsync(id);
        }

        [HttpPost]
        public async Task<UserDTO> Add([FromBody] UserModel model)
        {
            int[] c = new int[model.Children.Length];
            for (int i = 0; i < c.Length; i++)
            {
                c[i] = model.Children[i];
            }
            return await _userServise.AddAsync(new UserDTO
            {
                IdUser= model.IdUser,
                FirstName = model.FirstName,
                LastName = model.LastName,
                DateBirth = model.DateBirth,
                Sex = model.Sex,
                HMO = (EHMODTO)model.HMO,
                IsParent = model.IsParent,
                Children = c
            });
        }

        [HttpDelete("{id}")]
        public async Task Delete(int id)
        {
            await _userServise.DeleteAsync(id);
        }
        [HttpPut("{user}")]
        public async Task<UserDTO> Update([FromBody] UserDTO user)
        {
            return await _userServise.UpdateAsync(user);
        }
    }
}
