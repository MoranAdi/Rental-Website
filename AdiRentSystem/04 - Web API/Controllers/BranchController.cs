using System;
using System.Collections.Generic;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Cors;

namespace JB
{
    [EnableCors("*", "*", "*")]
    [RoutePrefix("api/branches")]
    public class BranchController : ApiController
    {
        private BranchesLogic logic = new BranchesLogic();

        [HttpGet]
        [Route("")]
        public HttpResponseMessage GetAllBranches()
        {
            try
            {
                List<BranchDTO> Branches = logic.GetAllBranches();
                return Request.CreateResponse(HttpStatusCode.OK, Branches);
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
    }
}
