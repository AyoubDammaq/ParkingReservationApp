package enit.webserver.parkingApp.model;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "reservations")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Reservation {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String clientName;

    @Column(nullable = false)
    private String vehicleNumber;

    @Column(nullable = false)
    private String parkingSlot;

    @Column(nullable = false)
    private String reservationDate;

    @Column(nullable = false)
    private Boolean isActive;

    public Long getId() {
        return id;
    }

    public String getClientName() {
        return clientName;
    }

    public String getParkingSlot() {
        return parkingSlot;
    }

    public String getVehicleNumber() {
        return vehicleNumber;
    }

    public String getReservationDate() {
        return reservationDate;
    }

    public Boolean getActive() {
        return isActive;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public void setClientName(String clientName) {
        this.clientName = clientName;
    }

    public void setVehicleNumber(String vehicleNumber) {
        this.vehicleNumber = vehicleNumber;
    }

    public void setParkingSlot(String parkingSlot) {
        this.parkingSlot = parkingSlot;
    }

    public void setReservationDate(String reservationDate) {
        this.reservationDate = reservationDate;
    }

    public void setActive(Boolean active) {
        isActive = active;
    }
}
