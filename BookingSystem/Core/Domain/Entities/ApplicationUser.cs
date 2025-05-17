
using Microsoft.AspNetCore.Identity;

namespace Domain.Entities
{
    public class ApplicationUser : IdentityUser
    {
        public string Name { get; set; }
        // Add these fields for OTP verification
        public string? EmailConfirmationOTP { get; set; }
        public DateTime? OTPExpiryTime { get; set; }

        // Add OTP fields for password reset
        public string? PasswordResetOTP { get; set; }
        public DateTime? PasswordResetOTPExpiry { get; set; }

        public string? RefreshToken { get; set; }
        public DateTime? RefreshTokenExpiryTime { get; set; }

        public ICollection<Booking> Bookings { get; set; } = new List<Booking>();
    }
}
