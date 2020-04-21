using System;
using System.ComponentModel.DataAnnotations;

namespace JB
{
    public class RentalOrderDTO
    {
        public int? id { get; set; }
        public DateTime? start { get; set; }
        public DateTime? end { get; set; }
        public DateTime? actualEnd { get; set; }
        public int? idUser { get; set; }
        public int? idCar { get; set; }
        public int? idCarType { get; set; }
        public string plate { get; set; }
        public string fName { get; set; }
        public string lName { get; set; }
        public string customerID { get; set; }
        public string carManufacturer { get; set; }
        public string carModel { get; set; }

        [RegularExpression(@"^(Open|Close)$")]
        public string statusOrder { get; set; }

        public string orderNum  {get; set; }
        public decimal? dayPrice { get; set; }
        public decimal? dayOverduePrice { get; set; }
    }
}
