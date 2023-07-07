namespace VetAppointments.Models
{
    public class Appointment
    {
        public int appointmentId { get; set; }
        public string? appointmentType { get; set; }
        public string? createDateTime { get; set; }
        public string? requestedDateTimeOffset { get; set; }
        public User? user { get; set; }
        public Animal? animal { get; set; }
    }
}
