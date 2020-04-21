using System;
using System.ComponentModel.DataAnnotations;


namespace JB
{
    public class UserDTO
    {
        public int? uId { get; set; }

        [Required(ErrorMessage = "ID number is a Required field")]
        [RegularExpression(@"^\d+$")]
        [MinLength(9, ErrorMessage = "ID must be 9 digit")]
        [MaxLength(9, ErrorMessage = "ID must be 9 digit")]
        public string id { get; set; }

        [Required(ErrorMessage = "Missing First Name")]
        [RegularExpression(@"^([A-Za-z|[א-ת])+$", ErrorMessage = "First Name must contain only Hebrew/English letters")]
        [MinLength(2, ErrorMessage = "First Name too short")]
        public string fName { get; set; }

        [Required(ErrorMessage = "Missing Last Name")]
        [RegularExpression(@"^([A-Za-z|[א-ת])+$", ErrorMessage = "Last Name must contain only Hebrew/English letters")]
        [MinLength(2, ErrorMessage = "Last Name too short")]
        public string lName { get; set; }

        [Required(ErrorMessage = "User Name is a Required field")]
        [RegularExpression(@"^[A-Z]([A-Z|a-z|\d])+$", ErrorMessage = "User name must start with Capital letter and can contain only English letters and digit")]
        [MinLength(3, ErrorMessage = "User Name must be minimum 3 chars")]
        public string uName { get; set; }

        public DateTime? bDate { get; set; }

        [Required(ErrorMessage = "Gender is a Required field")]
        [RegularExpression(@"^(Female|Male)$")]
        public string userGender { get; set; }

        [Required(ErrorMessage = "Email is a Required field")]
        [RegularExpression(@"^[\w.]+@[\w.]+\.[A-Za-z.]{2,5}$", ErrorMessage = "Invaild Email")]
        public string userEmail { get; set; }

        [Required(ErrorMessage = "Password is a Required field")]
        [RegularExpression(@"^[A-Z].{5,9}$", ErrorMessage = "Invaild password, Password must start with Capital letter & conatain between 6-10 letters")]
        [MaxLength(10)]
        public string userPassword { get; set; }

        [Required(ErrorMessage = "Role is a Required field")]
        [RegularExpression(@"^(Admin|Customer|Employee)$", ErrorMessage = "Role must be Admin or Customer or Employee")]
        public string userRole { get; set; }

        public string userPhoto { get; set; }
    }
}
