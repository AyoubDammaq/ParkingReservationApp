import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private baseUrl = 'http://localhost:8087/api/reservations';

  constructor(private http: HttpClient) { }

  getAllReservations(): Observable<any[]> {
    return this.http.get<any[]>(this.baseUrl);
  }

  getReservationById(id: number): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/${id}`);
  }

  createReservation(data: any): Observable<any> {
    return this.http.post<any>(this.baseUrl, data);
  }

  updateReservation(id: number, data: any): Observable<any> {
    return this.http.put<any>(`${this.baseUrl}/${id}`, data);
  }

  deleteReservation(id: number): Observable<any> {
    return this.http.delete<any>(`${this.baseUrl}/${id}`);
  }
}
