import { EHMO } from "./EHMO";

export default class User {
    constructor(
        public Id: number,
        public IdUser:number,
        public FirstName:string,
        public LastName: string,
        public DateBirth: Date,
        public Sex: boolean,
        public HMO :EHMO,
        public Children:number[],
        public IsParent:boolean) {
    }

}