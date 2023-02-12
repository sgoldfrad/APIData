namespace MyProject.API.Models
{
    public enum EHMOModel { Macabi, Clalit, Meuchedet, Leumit }
    public class UserModel
    {
        public int Id { get; set; }
        public int IdUser { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public DateTime DateBirth { get; set; }
        public bool Sex { get; set; }
        public EHMOModel HMO { get; set; }
        public int[] Children { get; set; }
        public bool IsParent { get; set; }
    }
}
