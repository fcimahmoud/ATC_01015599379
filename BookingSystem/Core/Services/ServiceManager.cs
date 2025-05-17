
using Domain.Contracts;
using Domain.Entities;
using Microsoft.AspNetCore.Identity;

namespace Services
{
    public class ServiceManager(
        UserManager<ApplicationUser> userManager,
        IOptions<JwtOptions> options,
        IUnitOfWork unitOfWork,
        IOptions<EmailSettings> emailSettings,
        IEmailService emailService,
        IFileService fileService
        ) : IServiceManager
    {
        private readonly Lazy<IAuthenticationService> _lazyAuthenticationService =
            new(() => new AuthenticationService(userManager, unitOfWork, options, emailService));
        private readonly Lazy<IEmailService> _lazyEmailService =
            new(() => new EmailService(emailSettings));
        private readonly Lazy<IEventService> _lazyEventService =
            new(() => new EventService(unitOfWork, fileService));
        private readonly Lazy<IBookingService> _lazyBookingService =
            new(() => new BookingService(unitOfWork));

        public IAuthenticationService AuthenticationService => _lazyAuthenticationService.Value;
        public IEmailService EmailService => _lazyEmailService.Value;

        public IEventService EventService => _lazyEventService.Value;

        public IBookingService BookingService => _lazyBookingService.Value;
    }
}
