

using Domain.Contracts;
using Domain.Entities;

namespace Services
{
    public class BookingService (IUnitOfWork unitOfWork)
        : IBookingService
    {
        public async Task BookEventAsync(string eventId, string userId)
        {
            var booking = new Booking { EventId = eventId, UserId = userId, Date = DateTime.UtcNow };
            booking.Id = Guid.NewGuid().ToString();
            await unitOfWork.GetRepository<Booking, string>().AddAsync(booking);
            await unitOfWork.SaveChangesAsync();
        }

        public async Task UnBookEventAsync(string eventId, string userId)
        {
            var booking = await unitOfWork.GetRepository<Booking, string>()
                .GetByConditionAsync(b => b.EventId == eventId && b.UserId == userId);

            if (booking != null)
            {
                unitOfWork.GetRepository<Booking, string>().Delete(booking);
                await unitOfWork.SaveChangesAsync();
            }
        }
    }
}
