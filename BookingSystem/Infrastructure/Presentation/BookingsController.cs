
namespace Presentation
{
    public class BookingsController (IServiceManager serviceManager)
        : ApiController
    {
        [HttpPost("book")]
        [Authorize(Roles = "UserRole")]
        public async Task<IActionResult> Book([FromQuery] string eventId, [FromQuery] string userId)
        {
            await serviceManager.BookingService.BookEventAsync(eventId, userId);
            return Ok("Event Booked Successfully!");
        }

        [HttpDelete("unbook")]
        [Authorize(Roles = "UserRole")]
        public async Task<IActionResult> Unbook([FromQuery] string eventId, [FromQuery] string userId)
        {
            await serviceManager.BookingService.UnBookEventAsync(eventId, userId);
            return Ok("Event UnBooked Successfully!");
        }
    }
}
