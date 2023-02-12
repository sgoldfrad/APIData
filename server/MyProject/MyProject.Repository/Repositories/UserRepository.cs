using Microsoft.EntityFrameworkCore;
using MyProject.Repositories.Entities;
using MyProject.Repositories.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MyProject.Repositories.Repositories
{
    public class UserRepository : IUserRepository
    {
        private readonly IContext _context;

        public UserRepository(IContext context)
        {
            _context = context;
        }
        public async Task<User> AddAsync(User user)
        {
            var u = _context.Users.Add(user);
            await _context.SaveChangesAsync();
            return u.Entity;
        }

        public async Task DeleteAsync(int id)
        {
            _context.Users.Remove(await GetByIdAsync(id));
            await _context.SaveChangesAsync();
        }

        public async Task<List<User>> GetAllAsync()
        {
            return await _context.Users.ToListAsync();
        }

        public async Task<User> GetByIdAsync(int id)
        {
            return await _context.Users.FindAsync(id);
        }

        public async Task<User> UpdateAsync(User user)
        {
            var u1 = await GetByIdAsync(user.Id);
            if (u1 != null)
            {
                u1.FirstName = user.FirstName;
                u1.LastName = user.LastName;
                u1.HMO= user.HMO;
                u1.DateBirth = user.DateBirth;
                u1.Sex= user.Sex;
                u1.IsParent = user.IsParent;
                for (int i = 0; i < u1.Children.Length; i++)
                {
                    u1.Children[i] = user.Children[i];
                }
                await _context.SaveChangesAsync();
            }
            return u1;
        }
    }
}
