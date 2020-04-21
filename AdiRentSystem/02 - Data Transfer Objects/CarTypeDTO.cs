using System.ComponentModel.DataAnnotations;

namespace JB
{
    public class CarTypeDTO
    {
        public int? id { get; set; }

        [Required(ErrorMessage = "Manufacturer is a Required field")]
        [EnumDataType(typeof(Manufacturer))]
        public string carManufacturer { get; set; }

        [Required(ErrorMessage = "Model is a Required field")]
        [EnumDataType(typeof(Model))]
        public string carModel { get; set; }

        [Required(ErrorMessage = "Daily Price is a Required field")]
        [RegularExpression(@"^([1-8]\d\d|900)$", ErrorMessage = "Illegal price")]
        [Range(100, 900, ErrorMessage = "Price must be 100 to 900")]
        public decimal? dayPrice { get; set; }

        [Required(ErrorMessage = "Overdue Daily Price is a Required field")]
        [RegularExpression(@"^([2-9]\d\d|1[0-4]\d\d|1500)$", ErrorMessage = "Illegal price")]
        [Range(200, 1500, ErrorMessage = "Price must be 200 to 1500")]
        public decimal? dayOverduePrice { get; set; }

        [Required(ErrorMessage = "Manufacturer Year is a Required field")]
        [RegularExpression(@"^(200[6-9]|201\d|2020)$", ErrorMessage = "Year must be between 2006-2020")]
        public string carManufacturerYear { get; set; }

        [Required(ErrorMessage = "Transmission is a Required field")]
        [RegularExpression(@"^(Automatic|Manual)$", ErrorMessage = "Transmission is either Automatic or Manual")]
        public string carShiftGear { get; set; }

    }
}
