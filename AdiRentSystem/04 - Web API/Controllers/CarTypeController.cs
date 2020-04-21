using System;
using System.Collections.Generic;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Cors;

namespace JB
{
    [EnableCors("*", "*", "*")]
    [RoutePrefix("api/cars-type")]

    public class CarTypeController : ApiController
    {
        private CarsTypeLogic logic = new CarsTypeLogic();

        [HttpGet]
        [Route("")]
        public HttpResponseMessage GetAllCarsType()
        {
            try
            {
                List<CarTypeDTO> carsType = logic.GetAllCarsType();
                return Request.CreateResponse(HttpStatusCode.OK, carsType);
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


        [HttpPost]
        [Route("")]
        public HttpResponseMessage AddCarType(CarTypeDTO carType)
        {
            try
            {
                if (!ModelState.IsValid)
                {
                    return Request.CreateResponse(HttpStatusCode.BadRequest, ErrorsManager.GetErrors(ModelState));
                }

                CarTypeDTO addedCarType = logic.AddCarType(carType);
                return Request.CreateResponse(HttpStatusCode.Created, addedCarType);
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
        public HttpResponseMessage updateCarType(int id, CarTypeDTO carType)
        {
            try
            {
                carType.id = id;
                CarTypeDTO updateCarType = logic.UpdateCarType(carType);
                if (updateCarType == null)
                    return Request.CreateResponse(HttpStatusCode.NotFound);
                return Request.CreateResponse(HttpStatusCode.OK, updateCarType);
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
        [Route("{id}")]
        public HttpResponseMessage DeleteUser(int id)
        {
            try
            {
                bool deleteCarType = logic.DeleteCarType(id);
                if (deleteCarType == false)
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


