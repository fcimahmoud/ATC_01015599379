using Microsoft.AspNetCore.Http;

namespace Shared.EventModels
{
    public class CreateEventDTO
    {
        public string Name { get; set; }
        public string Description { get; set; }
        public string Category { get; set; }
        public string Venue { get; set; }
        public double Price { get; set; }
        public DateTime Date { get; set; }
        public IFormFile Image { get; set; }
    }
}
