import api from "./axios";

const reservationService = {
  getReservations(){
    console.log("Fetching reservation data...");
    return api.get("/reservations");
  },

  getReservationById(id){
    // console.log("get reservation by")
    return api.get(`/reservations/${id}`);
  }

}

export default reservationService;
