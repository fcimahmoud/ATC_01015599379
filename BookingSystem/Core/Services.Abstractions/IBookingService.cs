
namespace Services.Abstractions
{
    public interface IBookingService
    {
        Task BookEventAsync(string eventId, string userId);
        Task UnBookEventAsync(string eventId, string userId);
    }
}
