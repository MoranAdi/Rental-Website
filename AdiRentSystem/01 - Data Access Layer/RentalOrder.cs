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
    
    public partial class RentalOrder
    {
        public int OrderID { get; set; }
        public System.DateTime StartDate { get; set; }
        public System.DateTime EndDate { get; set; }
        public Nullable<System.DateTime> ActualEndDate { get; set; }
        public int UserID { get; set; }
        public int CarTypeID { get; set; }
        public int CarID { get; set; }
        public string PlateNumber { get; set; }
        public string OrderStatus { get; set; }
        public string OrderNumber { get; set; }
    
        public virtual Car Car { get; set; }
        public virtual CarsType CarsType { get; set; }
        public virtual User User { get; set; }
    }
}
