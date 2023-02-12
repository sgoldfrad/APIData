using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MyProject.Repositories.Entities
{
    public enum EHMO { Macabi, Clalit, Meuchedet, Leumit }
    public class User
    {
        public int Id { get; set; }
        public int IdUser { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public DateTime DateBirth { get; set; }
        public bool Sex { get; set; }
        public EHMO HMO { get; set; }
        public int[] Children { get; set; }
        public bool IsParent { get; set; }

    }
}
