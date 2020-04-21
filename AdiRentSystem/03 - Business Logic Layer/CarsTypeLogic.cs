using System.Collections.Generic;
using System.Linq;

namespace JB
{
    public class CarsTypeLogic : BaseLogic
    {
        public List<CarTypeDTO> GetAllCarsType()
        {
            var q = from ct in DB.CarsTypes
                    select new CarTypeDTO
                    {
                        id = ct.CarTypeID,
                        carManufacturer = ct.Manufacturer,
                        carModel = ct.Model,
                        dayPrice = ct.DailyPrice,
                        dayOverduePrice = ct.DailyOverduePrice,
                        carManufacturerYear = ct.ManufacturerYear,
                        carShiftGear = ct.ShiftGear
                    };
            return q.ToList();
        }


        public CarTypeDTO AddCarType(CarTypeDTO carType)
        {
            CarsType carTypeToAdd = new CarsType
            {
                Manufacturer = carType.carManufacturer,
                Model = carType.carModel,
                DailyPrice = (decimal)carType.dayPrice,
                DailyOverduePrice = (decimal)carType.dayOverduePrice,
                ManufacturerYear = carType.carManufacturerYear,
                ShiftGear = carType.carShiftGear
            };
            DB.CarsTypes.Add(carTypeToAdd);
            DB.SaveChanges();
            carType.id = carTypeToAdd.CarTypeID;
            return carType;
        }

        public CarTypeDTO UpdateCarType(CarTypeDTO carType)
        {
            CarsType carTypeToUpdate = DB.CarsTypes.Where(ct => ct.CarTypeID == carType.id).SingleOrDefault();
            if (carTypeToUpdate == null)
            {
                return null;
            }
            if (carType.dayPrice != null)
                carTypeToUpdate.DailyPrice = (decimal)carType.dayPrice;
            if (carType.dayOverduePrice != null)
                carTypeToUpdate.DailyOverduePrice = (decimal)carType.dayOverduePrice;

            DB.SaveChanges();
            return carType;
        }


        public bool DeleteCarType(int id)
        {
            Car findCarType = DB.Cars.Where(u => u.CarTypeID == id).FirstOrDefault();
            if (findCarType == null)
            {
                CarsType carTypeToDelete = DB.CarsTypes.Where(ct => ct.CarTypeID == id).SingleOrDefault();
                if (carTypeToDelete != null)
                {
                    DB.CarsTypes.Remove(carTypeToDelete);
                    DB.SaveChanges();
                }
                return true;
            }
            else
            {
                return false;
            }
        }
    }
}
