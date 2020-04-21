using System;
using System.Collections.Generic;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Cors;

namespace JB
{
    [EnableCors("*", "*", "*")]
    [RoutePrefix("api/orders")]

    public class RantalOrderController : ApiController
    {
        private RentalOrdersLogic logic = new RentalOrdersLogic();

        [HttpGet]
        [Route("")]
        public HttpResponseMessage GetAllOrders()
        {
            try
            {
                List<RentalOrderDTO> orders = logic.GetAllOrder();
                return Request.CreateResponse(HttpStatusCode.OK, orders);
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

        [HttpGet]
        [Route("{orderNumber}")]
        public HttpResponseMessage GetOneOrder(string orderNumber)
        {
            try
            {
                RentalOrderDTO order = logic.GetOneorder(orderNumber);
                if (order == null)
                    return Request.CreateResponse(HttpStatusCode.NotFound, order);

                return Request.CreateResponse(HttpStatusCode.OK, order);
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

        [HttpGet]
        [Route("orders/{userID}")]
        public HttpResponseMessage GetUserOrder(int userID)
        {
            try
            {
                List<RentalOrderDTO> userOrder = logic.GetCustomerorder(userID);
                if (userOrder == null)
                    return Request.CreateResponse(HttpStatusCode.NotFound, userOrder);

                return Request.CreateResponse(HttpStatusCode.OK, userOrder);
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

        [HttpGet]
        [Route("dates")]
        public HttpResponseMessage GetAllOrdersDates()
        {
            try
            {
                List<RentalOrderDTO> orders = logic.GetAllOrderdates();
                return Request.CreateResponse(HttpStatusCode.OK, orders);
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
        public HttpResponseMessage AddOrder(RentalOrderDTO order)
        {
            try
            {
                order.start = order.start?.AddDays(1);
                TimeSpan startTs = new TimeSpan(00, 00, 0);
                order.start = order.start?.Date + startTs;

                order.end = order.end?.AddDays(1);
                TimeSpan endTs = new TimeSpan(00, 00, 0);
                order.end = order.end?.Date + endTs;

                RentalOrderDTO addedOrder = logic.AddOrder(order);
                return Request.CreateResponse(HttpStatusCode.Created, addedOrder);
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
        public HttpResponseMessage orderUser(int id, RentalOrderDTO order)
        {
            try
            {
                order.id = id;
                if (order.start != null)
                {
                    order.start = order.start?.AddDays(1);
                    TimeSpan startTs = new TimeSpan(00, 00, 0);
                    order.start = order.start?.Date + startTs;
                }
                if(order.end != null) { 
                order.end = order.end?.AddDays(1);
                TimeSpan endTs = new TimeSpan(00, 00, 0);
                order.end = order.end?.Date + endTs;
                }

                if(order.actualEnd != null)
                {
                    order.actualEnd = order.actualEnd?.AddDays(1);
                    TimeSpan actualEnd = new TimeSpan(00, 00, 0);
                    order.actualEnd = order.actualEnd?.Date + actualEnd;
                }

                RentalOrderDTO updateOrder = logic.UpdateOrder(order);
                if (updateOrder == null)
                    return Request.CreateResponse(HttpStatusCode.NotFound);
                return Request.CreateResponse(HttpStatusCode.OK, updateOrder);
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
                logic.DeleteOrder(id);
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
