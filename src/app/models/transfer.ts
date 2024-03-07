export class TransferData {
    name: string = "";
    sum: number = 0;
    time: Date = new Date();

    constructor(city: string, sum: number, time: Date) {
        this.name = city;
        this.sum = sum;
        this.time = time;
    }
}