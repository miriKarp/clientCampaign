import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, Subject } from "rxjs";
import { TransferData } from "../models/transfer";

@Injectable({
    providedIn: 'root'
})

export class DetailsService {

    // serverUrl: string = 'https://localhost:44337/api'
    serverUrl: string = 'https://localhost:5001/api'
    cities: TransferData[] = [];
    s:any;

    constructor(private http: HttpClient) { }

    getAllCities(): Observable<TransferData[]> {
        let res = this.http.get(this.serverUrl + '/City');
        return res as Observable<TransferData[]>;
    }

    getCity(city: string): Observable<TransferData> {
        let res = this.http.get(this.serverUrl + '/City/'+city);
        return res as Observable<TransferData>;
    }

    updateCity(city: TransferData): Observable<any> {
        let res = this.http.put(this.serverUrl + '/City/' + city.name, city);
        return res as Observable<any>;
    }

    addCity(city: TransferData): Observable<any> {
        let res = this.http.post(this.serverUrl + '/City', city)
        return res as Observable<any>;
    }

    deleteCity(name: string): Observable<any> {
        let res = this.http.delete(this.serverUrl + '/City/' + name)
        return res as Observable<any>;
    }   


    getSum(): Observable<number> {
        let res = this.http.get(this.serverUrl + '/Sum')
        return res as Observable<number>;
    }
    addSum(sum: number): Observable<any> {
        console.log(sum);
        let res = this.http.post(this.serverUrl + '/Sum', { sum: sum })
        return res as Observable<any>
    }

    deleteSum(sum: number): Observable<any> {
        let res = this.http.delete(this.serverUrl + '/Sum/' + sum)
        console.log(res);
        console.log(res as Observable<any>);       
        return res as Observable<any>;
    }




    private cityObj = new Subject<TransferData[]>();

    public get() {
        // return this.cityObj;
        return this.cities;
    }
    public set(city: TransferData[]) {
        // this.addCity(city);
        this.getAllCities().subscribe(res => {
            city = res;
        })
        this.cityObj.next(city);
    }

}