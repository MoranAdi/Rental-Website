using System;
using System.Collections.Generic;
using System.IO;
using System.Net;
using System.Net.Http;
using System.Web;
using System.Web.Http;
using System.Web.Http.Cors;
using System.Web.Script.Serialization;
using System.Web.Security;

namespace JB
{
    [EnableCors("*", "*", "*")]
    [RoutePrefix("api/users")]
    public class UserController : ApiController
    {
        private UsersLogic logic = new UsersLogic();

        [HttpGet]
        [Route("")]
        public HttpResponseMessage GetAllUsers()
        {
            try
            {
                List<UserDTO> users = logic.GetAllUsers();
                return Request.CreateResponse(HttpStatusCode.OK, users);
            }
            catch (Exception ex)
            {
                return Request.CreateErrorResponse(HttpStatusCode.InternalServerError, ex.Message);
            }
            finally
            {
                logic.Dispose();
            }
        }

        [HttpPut]
        [Route("{id}")]
        public HttpResponseMessage UpdateUser(string id, UserDTO user)
        {
            try
            {
                user.id = id;
                UserDTO updateUser = logic.UpdateUser(user);
                if (updateUser == null)
                    return Request.CreateResponse(HttpStatusCode.NotFound);
                return Request.CreateResponse(HttpStatusCode.OK, updateUser);
            }
            catch (Exception ex)
            {
                return Request.CreateErrorResponse(HttpStatusCode.InternalServerError,
             ErrorsManager.GetInnerMessage(ex));
            }
            finally
            {
                logic.Dispose();
            }
        }

        [HttpPut]
        [Route("image/{id}")]
        public HttpResponseMessage UpdateUserWithImage()
        {
            try
            {
                //Deserialize JSON into an object of CarTDO 
                var user = new JavaScriptSerializer().Deserialize<UserDTO>(HttpContext.Current.Request["User"]);
                string fileName = null;

                string image = HttpContext.Current.Request.Files["Image"].FileName;
                if (image != null)
                {
                    // Create a unique file name: 
                    fileName = Guid.NewGuid() + Path.GetExtension(image);

                    // Find the entire path to the uploads directory on server: 
                    string fullPath = HttpContext.Current.Server.MapPath("~/Uploads/" + fileName);

                    //// Create a stream pointing to that location for creating a new file: 
                    using (FileStream stream = new FileStream(fullPath, FileMode.Create))
                    {
                        // Copy the uploaded file into the new stream: 
                        HttpContext.Current.Request.InputStream.CopyTo(stream); // This will save the file
                    }
                    HttpContext.Current.Request.Files["Image"].SaveAs(fullPath);
                    user.userPhoto = fileName;
                }

                UserDTO updateUser = logic.UpdateUser(user);
                if (updateUser == null)
                    return Request.CreateResponse(HttpStatusCode.NotFound);
                return Request.CreateResponse(HttpStatusCode.OK, updateUser);
            }
            catch (Exception ex)
            {
                return Request.CreateErrorResponse(HttpStatusCode.InternalServerError,
             ErrorsManager.GetInnerMessage(ex));
            }
            finally
            {
                logic.Dispose();
            }
        }


        [HttpPost]
        [Route("log-in")]
        public HttpResponseMessage GetOneUser(CredentialsDTO credentials)
        {
            try
            {
                // Using hash to encode password
                string hashPassword = FormsAuthentication.HashPasswordForStoringInConfigFile(credentials.password, "md5");
                credentials.password = hashPassword;
                UserDTO user = logic.GetOneUser(credentials);
                return Request.CreateResponse(HttpStatusCode.OK, user);
            }
            catch (Exception ex)
            {
                return Request.CreateErrorResponse(HttpStatusCode.InternalServerError,
                    ErrorsManager.GetInnerMessage(ex));
            }
            finally
            {
                logic.Dispose();
            }
        }

        [HttpPost]
        [Route("image")]
        public HttpResponseMessage AddUser()
        {
            try
            {
                string fileName = null;

                //Deserialize JSON into an object of CarTDO type
                var user = new JavaScriptSerializer().Deserialize<UserDTO>(HttpContext.Current.Request["User"]);
                if (user.userRole == null)
                {
                    user.userRole = "Customer";
                }

                if (user.bDate != null)
                {
                    user.bDate = user.bDate?.AddDays(1);
                    TimeSpan bDateTs = new TimeSpan(00, 00, 0);
                    user.bDate = user.bDate?.Date + bDateTs;
                }

                string image = HttpContext.Current.Request.Files["Image"].FileName;
                if (image != null)
                {
                    // Create a unique file name: 
                    fileName = Guid.NewGuid() + Path.GetExtension(image);

                    // Find the entire path to the uploads directory on server: 
                    string fullPath = HttpContext.Current.Server.MapPath("~/Uploads/" + fileName);

                    //// Create a stream pointing to that location for creating a new file: 
                    using (FileStream stream = new FileStream(fullPath, FileMode.Create))
                    {
                        // Copy the uploaded file into the new stream: 
                        HttpContext.Current.Request.InputStream.CopyTo(stream); // This will save the file
                    }
                    HttpContext.Current.Request.Files["Image"].SaveAs(fullPath);
                    user.userPhoto = fileName;
                }
                string hashPassword = FormsAuthentication.HashPasswordForStoringInConfigFile(user.userPassword, "md5");
                user.userPassword = hashPassword;
                UserDTO addedUser = logic.AddUser(user);

                // Return response to the client: 
                return Request.CreateResponse(HttpStatusCode.Created, addedUser);
            }
            catch (Exception ex)
            {
                return Request.CreateErrorResponse(HttpStatusCode.InternalServerError,
              ErrorsManager.GetInnerMessage(ex));
            }
            finally
            {
                logic.Dispose();
            }
        }

        [HttpPost]
        [Route("")]
        public HttpResponseMessage AddUser(UserDTO user)
        {
            try
            {
                string hashPassword = FormsAuthentication.HashPasswordForStoringInConfigFile(user.userPassword, "md5");
                user.userPassword = hashPassword;

                if (user.bDate != null)
                {
                    user.bDate = user.bDate?.AddDays(1);
                    TimeSpan bDateTs = new TimeSpan(00, 00, 0);
                    user.bDate = user.bDate?.Date + bDateTs;
                }

                if (user.userRole == null)
                {
                    user.userRole = "Customer";
                }
                UserDTO addeUser = logic.AddUser(user);
                return Request.CreateResponse(HttpStatusCode.Created, addeUser);
            }
            catch (Exception ex)
            {
                return Request.CreateErrorResponse(HttpStatusCode.InternalServerError,
              ErrorsManager.GetInnerMessage(ex));
            }
            finally
            {
                logic.Dispose();
            }
        }

        [HttpDelete]
        [Route("{uid}")]
        public HttpResponseMessage DeleteUser(int uid)
        {
            try
            {
                bool deletUser = logic.DeleteUser(uid);
                if (deletUser == false)
                    return Request.CreateResponse(HttpStatusCode.Conflict);

                return Request.CreateResponse(HttpStatusCode.NoContent);
            }
            catch (Exception ex)
            {
                return Request.CreateErrorResponse(HttpStatusCode.InternalServerError,
             ErrorsManager.GetInnerMessage(ex));
            }
            finally
            {
                logic.Dispose();
            }
        }
    }
}
