export class Order {
    public constructor(
        public id?: number,
        public start?: Date,
        public end?: Date,
        public actualEnd?: Date,
        public idUser?: number,
        public idCar?: number,
        public idCarType?: number,
        public plate?: string,
        public fName?: string,
        public lName?: string,
        public customerID? : string,
        public carManufacturer?: string,
        public carModel?: string,
        public statusOrder?: string,
        public orderNum?: string,
        public dayPrice? : number,
        public dayOverduePrice? : number) { }
}