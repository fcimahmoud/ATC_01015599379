
namespace Services.Abstractions
{
    public interface IServiceManager
    {
        public IAuthenticationService AuthenticationService { get; }
        public IEmailService EmailService { get; }
        public IEventService EventService { get; }
        public IBookingService BookingService { get; }
    }
}
