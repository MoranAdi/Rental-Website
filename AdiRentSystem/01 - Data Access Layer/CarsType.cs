//------------------------------------------------------------------------------
// <auto-generated>
//     This code was generated from a template.
//
//     Manual changes to this file may cause unexpected behavior in your application.
//     Manual changes to this file will be overwritten if the code is regenerated.
// </auto-generated>
//------------------------------------------------------------------------------

namespace JB
{
    using System;
    using System.Collections.Generic;
    
    public partial class CarsType
    {
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2214:DoNotCallOverridableMethodsInConstructors")]
        public CarsType()
        {
            this.Cars = new HashSet<Car>();
            this.RentalOrders = new HashSet<RentalOrder>();
        }
    
        public int CarTypeID { get; set; }
        public string Manufacturer { get; set; }
        public string Model { get; set; }
        public decimal DailyPrice { get; set; }
        public decimal DailyOverduePrice { get; set; }
        public string ManufacturerYear { get; set; }
        public string ShiftGear { get; set; }
    
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<Car> Cars { get; set; }
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<RentalOrder> RentalOrders { get; set; }
    }
}
