import api from "./axios";

const fixedSchedulesService = {
  getFixedSchedules(){
    console.log('fetching data ');
    return api.get("/fixed-schedules");
  },

  getFsById(id){
    return api.get(`/fixed-schedules/${id}`);
  },

  createFs(data){
    return api.post("/fixed-schedules",data);
  },
  updateFs(id,data){
    return api.put(`/fixed-schedules/${id}`,data);
  },
  destroyFs(id){
    return api.delete(`/fixed-schedules/${id}`);
  }
}
export default fixedSchedulesService;
