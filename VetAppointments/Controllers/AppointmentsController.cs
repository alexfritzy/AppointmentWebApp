using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using VetAppointments.Models;
using Newtonsoft.Json;

namespace VetAppointments.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AppointmentsController : ControllerBase
    {
        private string _appointmentsUrl = "https://723fac0a-1bff-4a20-bdaa-c625eae11567.mock.pstmn.io/appointments";

        [HttpGet]
        [Route("GetAppointments")]
        public IEnumerable<Appointment> GetAppointments()
        {
            List<Appointment> appointments = new List<Appointment>();

            try
            {
                //Normally would access database, instead calling api
                HttpClient client = new HttpClient();
                HttpResponseMessage response = client.GetAsync(_appointmentsUrl).GetAwaiter().GetResult();
                string appointmentJson = response.Content.ReadAsStringAsync().GetAwaiter().GetResult();
                appointments = JsonConvert.DeserializeObject<List<Appointment>>(appointmentJson);
            }
            catch (Exception ex)
            {
                Response.StatusCode = 500;
                //Log error
                return new List<Appointment>();
            }

            Response.StatusCode = 200;
            return appointments;
        }
    }
}
