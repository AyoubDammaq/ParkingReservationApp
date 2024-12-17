import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-reservation-details',
  templateUrl: './reservation-details.component.html',
  styleUrls: ['./reservation-details.component.css']
})
export class ReservationDetailsComponent implements OnInit {
  reservation: any; // Réservation à afficher
  reservationId: number | undefined;
  isLoading: boolean = false; // Pour afficher un loader pendant le chargement des données
  errorMessage: string = ''; // Pour afficher un message d'erreur si nécessaire
  successMessage: string = ''; // Pour afficher un message de succès si nécessaire

  constructor(private route: ActivatedRoute, private reservationService: ApiService, private router: Router) {}

  ngOnInit(): void {
    this.reservationId = +this.route.snapshot.paramMap.get('id')!;
    this.getReservationDetails(this.reservationId);
  }

  // Récupérer les détails de la réservation
  getReservationDetails(id: number): void {
    this.isLoading = true; // Activer le loader pendant la récupération
    this.reservationService.getReservationById(id).subscribe(
      (reservation) => {
        this.reservation = reservation;
        this.isLoading = false; // Désactiver le loader après récupération
        this.successMessage = 'Les détails de la réservation ont été chargés avec succès.'; // Message de succès
      },
      (error) => {
        console.error('Erreur lors de la récupération de la réservation:', error);
        this.errorMessage = 'Une erreur est survenue lors du chargement des détails de la réservation.'; // Message d'erreur
        this.isLoading = false;
      }
    );
  }

  // Logique pour mettre à jour la réservation
  updateReservation(): void {
    if (!this.reservation || !this.reservation.id) {
      alert('Aucune réservation à mettre à jour.');
      return;
    }

    this.isLoading = true; // Activer le loader pendant la mise à jour

    // Envoi de la réservation avec ses données et son ID pour la mise à jour
    this.reservationService.updateReservation(this.reservation.id, this.reservation).subscribe(
      (response) => {
        this.isLoading = false; // Désactiver le loader après mise à jour
        this.successMessage = 'Réservation mise à jour avec succès.'; // Message de succès
        alert(this.successMessage);
        this.router.navigate(['/']); // Rediriger vers la liste des réservations après mise à jour
      },
      (error) => {
        console.error('Erreur lors de la mise à jour de la réservation:', error);
        this.isLoading = false; // Désactiver le loader après échec
        this.errorMessage = 'Une erreur est survenue lors de la mise à jour de la réservation.'; // Message d'erreur
        alert(this.errorMessage);
      }
    );
  }


  // Logique pour supprimer la réservation
  deleteReservation(): void {
    if (confirm('Êtes-vous sûr de vouloir supprimer cette réservation ?')) {
      this.reservationService.deleteReservation(this.reservation.id).subscribe(
        (response) => {
          // Vérifier si la suppression a été effectuée avec succès
          if (response && response.success) {
            alert('Réservation supprimée.');
            this.router.navigate(['/']); // Rediriger vers la liste des réservations après suppression
          } else {
            alert('Une erreur est survenue lors de la suppression de la réservation.');
          }
        },
        (error) => {
          console.error('Erreur lors de la suppression de la réservation:', error);
          alert('Une erreur est survenue lors de la suppression de la réservation.');
        }
      );
    }
  }

}
