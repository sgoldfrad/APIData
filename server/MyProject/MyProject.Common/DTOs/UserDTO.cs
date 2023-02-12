using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MyProject.Common.DTOs
{
    public enum EHMODTO { Macabi, Clalit, Meuchedet, Leumit }
    public class UserDTO
    {
        public int Id { get; set; }
        public int IdUser { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public DateTime DateBirth { get; set; }
        public bool Sex { get; set; }
        public EHMODTO HMO { get; set; }
        public int[] Children { get; set; }
        public bool IsParent { get; set; }
    }
}
