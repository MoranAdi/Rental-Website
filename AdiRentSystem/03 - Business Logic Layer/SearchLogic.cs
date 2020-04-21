using System;
using System.Collections.Generic;
using System.Linq;

namespace JB
{
    public class SearchLogic : BaseLogic
    {
        public List<SearchDTO> SearchCar()
        {
            var q = from ct in DB.CarsTypes
                    join c in DB.Cars on ct.CarTypeID equals c.CarTypeID
                    join b in DB.Branches on c.BranchID equals b.BranchID
                    select new SearchDTO
                    {
                        carID = c.CarID,
                        idCarType = c.CarTypeID,
                        idBranch = b.BranchID,
                        manufacturer = ct.Manufacturer,
                        model = ct.Model,
                        manufacturerYear = ct.ManufacturerYear,
                        carShiftGear = ct.ShiftGear,
                        carType = c.CarType,
                        mileage = c.CurrentMileage,
                        image = c.Photo,
                        branchName = b.BranchName,
                        isRentable = c.Rentable,
                        plateNumber = c.CarPlateNumber,
                        dayPrice = ct.DailyPrice,
                        dayOverduePrice = ct.DailyOverduePrice,

                    };
            return q.ToList();
        }

        public List<int> SearchAvailableCars(DateTime start, DateTime end)
        {
            List<int> availableCarsList = new List<int>();
            var availableCars = DB.GetAvailableCarsByDates(start, end);
            foreach (var item in availableCars)
            {
                availableCarsList.Add(item.CarID);
            }
            return availableCarsList;
        }
    }
}
