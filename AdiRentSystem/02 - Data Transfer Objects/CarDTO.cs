using System.ComponentModel.DataAnnotations;

namespace JB
{
    public class CarDTO
    {
        public int? id  { get; set; }
        public int? idCarType  { get; set; }
        public int? idBranch { get; set; }

        [Required(ErrorMessage = "plateNumber is a Required field")]
        [RegularExpression(@"^\d{7,8}$", ErrorMessage = "Plate number must contain 7 to 8 numbers")]
        public string plateNumber { get; set; }

        [Required(ErrorMessage = "Car Type is a Required field")]
        [RegularExpression(@"^(Standart|Compact|Premium|Luxury|Economy|Fullsize|Van)$")]
        public string cType { get; set; }

        [Required(ErrorMessage = "Current Mileage is a Required field")]
        [RegularExpression(@"^[5-9]|[1-9]\d+$", ErrorMessage = "Incorrect Mileage")]
        [MinLength(5)]
        public int? mileage { get; set; }

        public string image { get; set; }

        [Required(ErrorMessage = "Rentable is a Required field")]
        [RegularExpression(@"^(True|False)$")]
        public bool? isRentable { get; set; }
    }
}
