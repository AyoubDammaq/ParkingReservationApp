import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { Router } from '@angular/router';

interface ParkingSpot {
  row: string;
  col: number;
  isOccupied: boolean;
  reservation: any; // Vous pouvez définir un type plus spécifique si nécessaire
}

@Component({
  selector: 'app-reservation-list',
  templateUrl: './reservation-list.component.html',
  styleUrls: ['./reservation-list.component.css']
})
export class ReservationListComponent implements OnInit {
  reservations: any[] = []; // Liste des réservations récupérées depuis l'API
  rows = ['A', 'B', 'C', 'D', 'E', 'F']; // Lignes A à F
  columns = [1, 2, 3, 4, 5, 6]; // Colonnes 1 à 6
  spots: ParkingSpot[] = []; // Liste des emplacements de parking
  loading: boolean = false; // Pour afficher un loader pendant le chargement des données

  constructor(private apiService: ApiService, private router: Router) {}

  ngOnInit(): void {
    this.getReservations();
  }

  getReservations(): void {
    this.loading = true; // Activer le loader pendant la récupération des données
    this.apiService.getAllReservations().subscribe(
      (data) => {
        this.reservations = data;
        this.setupParkingSpots();
        this.loading = false; // Désactiver le loader après le chargement des données
      },
      (error) => {
        console.error('Erreur lors de la récupération des réservations:', error);
        this.loading = false;
      }
    );
  }

  setupParkingSpots(): void {
    // Initialisation des emplacements de parking
    this.spots = [];
    for (let row of this.rows) {
      for (let col of this.columns) {
        const spot = {
          row: row,
          col: col,
          isOccupied: false,
          reservation: null
        };
        this.spots.push(spot);
      }
    }

    // Associer les réservations aux emplacements
    this.reservations.forEach((reservation) => {
      const spot = this.spots.find(
        (spot) => spot.row === reservation.parkingSlot.charAt(0) && spot.col === parseInt(reservation.parkingSlot.charAt(1))
      );
      if (spot) {
        spot.isOccupied = true;
        spot.reservation = reservation;
      }
    });
  }

  getSpotClass(row: string, col: number): string {
    const spot = this.spots.find((spot) => spot.row === row && spot.col === col);
    return spot ? (spot.isOccupied ? 'occupied' : 'free') : 'free';
  }

  getSpotReservation(row: string, col: number): any | null {
    const spot = this.spots.find((spot) => spot.row === row && spot.col === col);
    return spot ? spot.reservation : null;
  }

  handleSpotClick(row: string, col: number): void {
    const reservation = this.getSpotReservation(row, col);

    if (reservation) {
      // Si le spot est occupé, rediriger vers la page de détails de la réservation
      this.router.navigate(['/reservation-details', reservation.id]);
    } else {
      // Si le spot est libre, vous pouvez afficher un message ou une autre action
      alert('Cet emplacement est libre.');
    }
  }

  deleteReservation(id: number): void {
    // Supprimer la réservation via l'API
    if (confirm('Êtes-vous sûr de vouloir supprimer cette réservation ?')) {
      this.apiService.deleteReservation(id).subscribe(
        () => {
          // Mettre à jour la liste des réservations après la suppression
          this.reservations = this.reservations.filter((reservation) => reservation.id !== id);
          this.setupParkingSpots(); // Mettre à jour l'état des spots de parking
          alert('Réservation supprimée avec succès.');
        },
        (error) => {
          console.error('Erreur lors de la suppression:', error);
          alert('Une erreur est survenue lors de la suppression de la réservation.');
        }
      );
    }
  }
}
