
global using Services;
global using Services.Abstractions;

namespace Booking.API.Extensions
{
    public static class CoreServicesExtensions
    {
        public static IServiceCollection AddCoreServices(this IServiceCollection services, IConfiguration configuration)
        {
            services.Configure<EmailSettings>(configuration.GetSection("EmailSettings"));
            services.AddScoped<IEmailService, EmailService>();
            services.AddSingleton<IFileService, FileService>();

            services.AddScoped<IServiceManager, ServiceManager>();

            services.Configure<JwtOptions>(configuration.GetSection("JwtOptions"));

            return services;
        }
    }
}
