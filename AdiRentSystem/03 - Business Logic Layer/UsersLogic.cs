using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Web;

namespace JB
{
    public class UsersLogic : BaseLogic
    {
        public List<UserDTO> GetAllUsers()
        {
            var q = from u in DB.Users
                    select new UserDTO
                    {
                        uId = u.UserID,
                        fName = u.FirstName,
                        lName = u.LastName,
                        id = u.IDNumber,
                        uName = u.UserName,
                        bDate = u.Birthdate,
                        userGender = u.Gender,
                        userEmail = u.Email,
                        userRole = u.Role,
                        userPhoto = u.Photo
                    };
            return q.ToList();
        }

        public UserDTO GetOneUser(CredentialsDTO credentials)
        {
            var q = from u in DB.Users
                    where u.UserName == credentials.userName && u.Password == credentials.password
                    select new UserDTO
                    {
                        uId = u.UserID,
                        fName = u.FirstName,
                        lName = u.LastName,
                        uName = u.UserName,
                        userRole = u.Role,
                        userPhoto = u.Photo
                    };
            return q.SingleOrDefault();
        }

        public UserDTO AddUser(UserDTO user)
        {
            User userToAdd = new User
            {
                IDNumber = user.id,
                FirstName = user.fName,
                LastName = user.lName,
                UserName = user.uName,
                Birthdate = user.bDate,
                Gender = user.userGender,
                Email = user.userEmail,
                Password = user.userPassword,
                Role = user.userRole,
                Photo = user.userPhoto
            };
            DB.Users.Add(userToAdd);
            DB.SaveChanges();
            user.uId = userToAdd.UserID;
            return user;
        }

        public UserDTO UpdateUser(UserDTO user)
        {
            User userToUpdate = DB.Users.Where(u => u.IDNumber == user.id).SingleOrDefault();
            if (userToUpdate == null)
            {
                return null;
            }
            if (user.fName != null && user.fName != "")
                userToUpdate.FirstName = user.fName;
            if (user.lName != null && user.lName != "")
                userToUpdate.LastName = user.lName;
            if (user.userEmail != null && user.userEmail != "")
                userToUpdate.Email = user.userEmail;
            if (user.userRole != null && user.userRole != "")
                userToUpdate.Role = user.userRole;
            if (user.userPhoto != null && user.userPhoto != "")
            {
                //Delete the older image from the server
                File.Delete(HttpContext.Current.Server.MapPath("~/Uploads/" + userToUpdate.Photo));
                userToUpdate.Photo = user.userPhoto;
            }
            DB.SaveChanges();
            return user;
        }

        public bool DeleteUser(int uid)
        {
            RentalOrder findUser = DB.RentalOrders.Where(u => u.UserID == uid).FirstOrDefault();
            if (findUser == null)
            {
                User userToDelete = DB.Users.Where(u => u.UserID == uid).SingleOrDefault();

                DB.Users.Remove(userToDelete);
                DB.SaveChanges();

                //Delete also the image from the server
                if (userToDelete.Photo != null) {
                    var file = HttpContext.Current.Server.MapPath("~/Uploads/" + userToDelete.Photo);
                    File.Delete(file);
                }

                return true ;
            }
            else
            {
                return false;
            }
        }
    }
}
