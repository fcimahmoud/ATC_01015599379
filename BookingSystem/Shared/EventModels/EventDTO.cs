
namespace Shared.EventModels
{
    public class EventDTO
    {
        public string Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public string Category { get; set; }
        public string Venue { get; set; }
        public double Price { get; set; }
        public DateTime Date { get; set; }
        public string ImageUrl { get; set; }
        public int BookingsCount { get; set; } = 0;
    }
}
