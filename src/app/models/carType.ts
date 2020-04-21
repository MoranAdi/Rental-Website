export class CarType {
    public constructor(
        public id?: number,
        public carManufacturer? : string,
        public carModel? : string,
        public dayPrice? : number,
        public dayOverduePrice? : number,
        public carManufacturerYear? : string,
        public carShiftGear? : string){}
    }