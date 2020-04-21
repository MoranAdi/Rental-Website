using System.Linq;
using System.Collections.Generic;
using System.IO;
using System.Web;

namespace JB
{
    public class CarsLogic : BaseLogic
    {
        public List<CarDTO> GetAllCars()
        {
            var q = from c in DB.Cars
                    select new CarDTO
                    {
                        id = c.CarID,
                        idCarType = c.CarTypeID,
                        idBranch = c.BranchID,
                        plateNumber = c.CarPlateNumber,
                        cType = c.CarType,
                        mileage = c.CurrentMileage,
                        image = c.Photo,
                        isRentable = c.Rentable
                    };
            return q.ToList();
        }

        public CarDTO AddCar(CarDTO car)
        {
            Car carToAdd = new Car
            {
                CarTypeID = (int)car.idCarType,
                BranchID = (int)car.idBranch,
                CarPlateNumber = car.plateNumber,
                CarType = car.cType,
                CurrentMileage = (int)car.mileage,
                Photo = car.image,
                Rentable = (bool)car.isRentable
            };
            DB.Cars.Add(carToAdd);
            DB.SaveChanges();
            car.id = carToAdd.CarID;
            return car;
        }

        public CarDTO UpdateCar(CarDTO car)
        {
            Car carToUpdate = DB.Cars.Where(c => c.CarID == car.id).SingleOrDefault();
            if (carToUpdate == null)
            {
                return null;
            }
            if (car.idBranch != null)
                carToUpdate.BranchID = (int)car.idBranch;
            if (car.mileage != null)
                carToUpdate.CurrentMileage = (int)car.mileage;
            if (car.isRentable != null)
                carToUpdate.Rentable = (bool)car.isRentable;
            if (car.image != null)
            {
                //Delete the older image from the server
                File.Delete(HttpContext.Current.Server.MapPath("~/Uploads/" + carToUpdate.Photo));
                carToUpdate.Photo = car.image;
            }

            DB.SaveChanges();
            return car;
        }

        public string DeleteCar(int id)
        {
            RentalOrder findCar = DB.RentalOrders.Where(u => u.CarID == id).FirstOrDefault();
            if (findCar == null)
            {
                Car carToDelete = DB.Cars.Where(c => c.CarID == id).SingleOrDefault();
                if (carToDelete != null)
                {
                    DB.Cars.Remove(carToDelete);
                    DB.SaveChanges();
                }
                //Retuen the image name so we could use it to delete image also from the server
                return carToDelete.Photo;
            }
            else
            {
                return null;
            }
        }
    }
}
