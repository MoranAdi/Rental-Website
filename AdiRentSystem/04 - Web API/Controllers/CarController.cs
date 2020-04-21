using System;
using System.Collections.Generic;
using System.IO;
using System.Net;
using System.Net.Http;
using System.Web;
using System.Web.Http;
using System.Web.Http.Cors;
using System.Web.Script.Serialization;

namespace JB
{
    [EnableCors("*", "*", "*")]
    [RoutePrefix("api/cars")]
    public class CarController : ApiController
    {
        private CarsLogic logic = new CarsLogic();

        [HttpGet]
        [Route("")]
        public HttpResponseMessage GetAllCars()
        {
            try
            {
                List<CarDTO> cars = logic.GetAllCars();
                return Request.CreateResponse(HttpStatusCode.OK, cars);
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

        [HttpDelete]
        [Route("{id}")]
        public HttpResponseMessage DeleteCar(int id)
        {
            try
            {
                string deleteCar = logic.DeleteCar(id);
                if (deleteCar == null)
                    return Request.CreateResponse(HttpStatusCode.Conflict);

                //Delete also the image from the server
                File.Delete(HttpContext.Current.Server.MapPath("~/Uploads/" + deleteCar));

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


        [HttpPut]
        [Route("image/{id}")]
        public HttpResponseMessage UpdateCarWithImage()
        {
            try
            {
                //Deserialize JSON into an object of CarTDO 
                var car = new JavaScriptSerializer().Deserialize<CarDTO>(HttpContext.Current.Request["Car"]);
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
                    car.image = fileName;
                }

                CarDTO updateCar = logic.UpdateCar(car);
                if (updateCar == null)
                    return Request.CreateResponse(HttpStatusCode.NotFound);
                return Request.CreateResponse(HttpStatusCode.OK, updateCar);
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
        [Route("{id}")]
        public HttpResponseMessage UpdateCar(int id, CarDTO car)
        {
            try
            {
                car.id = id;
                CarDTO updateCar = logic.UpdateCar(car);
                if (updateCar == null)
                    return Request.CreateResponse(HttpStatusCode.NotFound);
                return Request.CreateResponse(HttpStatusCode.OK, updateCar);
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
        public HttpResponseMessage AddCar()
        {
            try
            {
                string image = HttpContext.Current.Request.Files["Image"].FileName;

                // Create a unique file name: 
                string fileName = Guid.NewGuid() + Path.GetExtension(image);

                // Find the entire path to the uploads directory on server: 
                string fullPath = HttpContext.Current.Server.MapPath("~/Uploads/" + fileName);

                //// Create a stream pointing to that location for creating a new file: 
                using (FileStream stream = new FileStream(fullPath, FileMode.Create))
                {
                    // Copy the uploaded file into the new stream: 
                    HttpContext.Current.Request.InputStream.CopyTo(stream); // This will save the file
                }
                HttpContext.Current.Request.Files["Image"].SaveAs(fullPath);

                //Deserialize JSON into an object of CarTDO type
                var car = new JavaScriptSerializer().Deserialize<CarDTO>(HttpContext.Current.Request["Car"]);
                car.image = fileName;
                CarDTO addedCar = logic.AddCar(car);
                return Request.CreateResponse(HttpStatusCode.Created, addedCar);
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
