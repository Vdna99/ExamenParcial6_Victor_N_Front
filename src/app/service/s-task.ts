import { HttpClient } from '@angular/common/http';
import { TmplAstHostElement } from '@angular/compiler';
import { Injectable } from '@angular/core';


export interface TaskM {

  id?: number;
  title: string;
  description: string;
  dateLimit: string;
  state: string;


}


@Injectable({
  providedIn: 'root'
})
export class STask {

  private urlApi = 'https://localhost:7096/api/TaskB';

  constructor(private http: HttpClient) {
  }

  getTasks() {

    return this.http.get(this.urlApi+'/Pendiente');

  }

  CreateTask(task: any){

    return this.http.post(this.urlApi,task);
    
  }

  
  deleteTask(id : number){

    return this.http.delete(`${this.urlApi}/${id}`);
  }

  UpdateState(id : number, task : any){

    return this.http.put(`${this.urlApi}/${id}`,task);

  }

  UpdateTask(id:number, task: any){

     return this.http.put(`${this.urlApi}/${id}`, task);

  }


}
