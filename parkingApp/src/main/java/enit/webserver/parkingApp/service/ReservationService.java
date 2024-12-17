package enit.webserver.parkingApp.service;


import enit.webserver.parkingApp.model.Reservation;
import enit.webserver.parkingApp.repository.ReservationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ReservationService {

    @Autowired
    private ReservationRepository reservationRepository;

    public List<Reservation> getAllReservations() {
        return reservationRepository.findAll();
    }

    public Reservation getReservationById(Long id) {
        return reservationRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Reservation not found with id " + id));
    }

    public Reservation createReservation(Reservation reservation) {
        return reservationRepository.save(reservation);
    }

    public Reservation updateReservation(Long id, Reservation reservationDetails) {
        Reservation reservation = getReservationById(id);
        reservation.setClientName(reservationDetails.getClientName());
        reservation.setVehicleNumber(reservationDetails.getVehicleNumber());
        reservation.setParkingSlot(reservationDetails.getParkingSlot());
        reservation.setReservationDate(reservationDetails.getReservationDate());
        reservation.setIsActive(reservationDetails.getIsActive());
        return reservationRepository.save(reservation);
    }

    public void deleteReservation(Long id) {
        reservationRepository.deleteById(id);
    }
}
