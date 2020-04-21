namespace JB
{
    public class SearchDTO
    {
        public int carID { get; set; }
        public int idCarType { get; set; }
        public int idBranch { get; set; }
        public string manufacturer { get; set; }
        public string model { get; set; }
        public string manufacturerYear { get; set; }
        public string carShiftGear { get; set; }
        public string carType { get; set; }
        public int mileage { get; set; }
        public string image { get; set; }
        public string branchName { get; set; }
        public bool isRentable { get; set; }
        public string plateNumber { get; set; }
        public decimal? dayPrice { get; set; }
        public decimal? dayOverduePrice { get; set; }
    }
}

