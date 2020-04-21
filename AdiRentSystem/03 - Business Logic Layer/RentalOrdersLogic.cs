using System;
using System.Collections.Generic;
using System.Linq;

namespace JB
{
    public class RentalOrdersLogic : BaseLogic
    {
        public List<RentalOrderDTO> GetAllOrder()
        {
            var q = from o in DB.RentalOrders
                    join ct in DB.CarsTypes on o.CarTypeID equals ct.CarTypeID
                    join u in DB.Users on o.UserID equals u.UserID
                    select new RentalOrderDTO
                    {
                        id = o.OrderID,
                        start = o.StartDate,
                        end = o.EndDate,
                        actualEnd = o.ActualEndDate,
                        idUser = o.UserID,
                        idCar = o.CarID,
                        idCarType = o.CarTypeID,
                        plate = o.PlateNumber,
                        carManufacturer = ct.Manufacturer,
                        carModel = ct.Model,
                        fName = u.FirstName,
                        lName = u.LastName,
                        orderNum = o.OrderNumber,
                        dayPrice = ct.DailyPrice,
                        dayOverduePrice = ct.DailyOverduePrice,
                        statusOrder = o.OrderStatus
                    };
            return q.ToList();
        }

        public RentalOrderDTO GetOneorder(string orderNumber)
        {
            var q = from o in DB.RentalOrders
                    where o.OrderNumber == orderNumber
                    join ct in DB.CarsTypes on o.CarTypeID equals ct.CarTypeID
                    join u in DB.Users on o.UserID equals u.UserID
                    select new RentalOrderDTO
                    {
                        id = o.OrderID,
                        start = o.StartDate,
                        end = o.EndDate,
                        actualEnd = o.ActualEndDate,
                        idUser = o.UserID,
                        idCar = o.CarID,
                        idCarType = o.CarTypeID,
                        plate = o.PlateNumber,
                        carManufacturer = ct.Manufacturer,
                        carModel = ct.Model,
                        fName = u.FirstName,
                        lName = u.LastName,
                        customerID = u.IDNumber,
                        orderNum = o.OrderNumber,
                        dayPrice = ct.DailyPrice,
                        dayOverduePrice = ct.DailyOverduePrice
                    };
            return q.SingleOrDefault();
        }

        public List<RentalOrderDTO> GetCustomerorder(int userID)
        {
            var q = from o in DB.RentalOrders
                    where o.UserID == userID
                    join ct in DB.CarsTypes on o.CarTypeID equals ct.CarTypeID
                    join u in DB.Users on o.UserID equals u.UserID
                    select new RentalOrderDTO
                    {
                        id = o.OrderID,
                        start = o.StartDate,
                        end = o.EndDate,
                        actualEnd = o.ActualEndDate,
                        idUser = o.UserID,
                        idCar = o.CarID,
                        idCarType = o.CarTypeID,
                        plate = o.PlateNumber,
                        carManufacturer = ct.Manufacturer,
                        carModel = ct.Model,
                        fName = u.FirstName,
                        lName = u.LastName,
                        customerID = u.IDNumber,
                        orderNum = o.OrderNumber,
                        dayPrice = ct.DailyPrice,
                        dayOverduePrice = ct.DailyOverduePrice,
                        statusOrder = o.OrderStatus
                    };
            return q.ToList();
        }

        public List<RentalOrderDTO> GetAllOrderdates()
        {
            var q = from o in DB.RentalOrders
                    where o.EndDate >= DateTime.Now
                    select new RentalOrderDTO
                    {
                        idCar = o.CarID,
                        start = o.StartDate,
                        end = o.EndDate,

                    };
            return q.ToList();
        }

        public RentalOrderDTO AddOrder(RentalOrderDTO order)
        {
            RentalOrder orderToAdd = new RentalOrder
            {
                StartDate = (DateTime)order.start,
                EndDate = (DateTime)order.end,
                PlateNumber = order.plate,
                UserID = (int)order.idUser,
                CarTypeID = (int)order.idCarType,
                CarID = (int)order.idCar,
                OrderStatus = "Open",
                OrderNumber = "ADI-" + DateTime.Now.ToString("yy-M-dTHH-mm-ss")
            };
            DB.RentalOrders.Add(orderToAdd);
            DB.SaveChanges();
            order.id = orderToAdd.OrderID;
            return order;
        }

        public RentalOrderDTO UpdateOrder(RentalOrderDTO order)
        {
            RentalOrder orderToUpdate = DB.RentalOrders.Where(o => o.OrderID == order.id).SingleOrDefault();
            if (orderToUpdate == null)
            {
                return null;
            }
            if (order.start != null)
                orderToUpdate.StartDate = (DateTime)order.start;
            if (order.end != null)
                orderToUpdate.EndDate = (DateTime)order.end;
            if (order.actualEnd != null)
                orderToUpdate.ActualEndDate = order.actualEnd;
            if (order.plate != null)
            {
                orderToUpdate.PlateNumber = order.plate;
                orderToUpdate.CarID = (int)order.idCar;
                orderToUpdate.CarTypeID = (int)order.idCarType;
            }
            if (order.statusOrder != null)
            {
                orderToUpdate.OrderStatus = order.statusOrder;
            }
            DB.SaveChanges();
            return order;
        }

        public void DeleteOrder(int id)
        {
            RentalOrder orderToDelete = DB.RentalOrders.Where(order => order.OrderID == id).SingleOrDefault();
            if (orderToDelete != null)
            {
                DB.RentalOrders.Remove(orderToDelete);
                DB.SaveChanges();
            }
        }
    }
}
