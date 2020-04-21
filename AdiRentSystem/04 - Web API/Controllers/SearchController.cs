using System;
using System.Collections.Generic;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Cors;

namespace JB
{
    [EnableCors("*", "*", "*")]
    [RoutePrefix("api/search")]
    public class SearchController : ApiController
    {
        private SearchLogic logic = new SearchLogic();


        [HttpGet]
        [Route("")]
        public HttpResponseMessage GetAllResults()
        {
            try
            {
                List<SearchDTO> searchCars = logic.SearchCar();
                return Request.CreateResponse(HttpStatusCode.OK, searchCars);
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

        [HttpGet]
        [Route("available-cars")]
        public HttpResponseMessage GetAllAvailableCars(string start, string end)
        {
            try
            {
                DateTime start1 = DateTime.Parse(start);
                DateTime end1 = DateTime.Parse(end);
                List<int> searchAvailableCars = logic.SearchAvailableCars(start1, end1);
                return Request.CreateResponse(HttpStatusCode.OK, searchAvailableCars);
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
