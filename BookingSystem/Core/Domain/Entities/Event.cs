namespace Domain.Entities
{
    public class Event : BaseEntity<string>
    {
        public string Name { get; set; }
        public string Description { get; set; }
        public string Category { get; set; }
        public string Venue { get; set; }
        public double Price { get; set; }
        public DateOnly Date { get; set; }
        public string ImagePath { get; set; }

        public ICollection<Booking> Bookings { get; set; } = new List<Booking>();
    }
}
