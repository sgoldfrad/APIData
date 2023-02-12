using MyProject.Common.DTOs;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MyProject.Services.Interfaces
{
    public interface IUserService
    {
        Task<UserDTO> AddAsync(UserDTO user);
        Task<UserDTO> GetByIdAsync(int id);
        Task DeleteAsync(int id);
        Task<List<UserDTO>> GetAllAsync();
        Task<UserDTO> UpdateAsync(UserDTO user);
    }
}
