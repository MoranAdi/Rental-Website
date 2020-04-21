export class SearchCar {
    public constructor(

        public carID? : number,
        public idCarType?: number,
        public idBranch?: number,
        public manufacturer? : string,
        public model? : string,
        public manufacturerYear? : string,
        public carShiftGear? : string,
        public carType? : string,
        public mileage? : number,
        public image? : string,
        public branchName? : string,
        public isRentable? : boolean,
        public plateNumber? : string,
        public dayPrice?: number,
        public dayOverduePrice?: number){}
}