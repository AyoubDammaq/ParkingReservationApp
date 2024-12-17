import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-reservation-form',
  templateUrl: './reservation-form.component.html',
  styleUrls: ['./reservation-form.component.css']
})
export class ReservationFormComponent implements OnInit {
  reservation: any = {
    clientName: '',
    vehicleNumber: '',
    parkingSlot: '',
    reservationDate: '',
    isActive: true
  };

  isEdit = false;

  constructor(
    private apiService: ApiService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.isEdit = true;
      this.apiService.getReservationById(+id).subscribe(data => {
        this.reservation = data;
      });
    }
  }

  saveReservation(): void {
    if (this.isEdit) {
      this.apiService.updateReservation(this.reservation.id, this.reservation).subscribe(() => {
        this.router.navigate(['/']);
      });
    } else {
      this.apiService.createReservation(this.reservation).subscribe(() => {
        this.router.navigate(['/']);
      });
    }
  }
}
