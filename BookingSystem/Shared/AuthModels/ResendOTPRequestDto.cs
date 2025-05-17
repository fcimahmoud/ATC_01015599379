
namespace Shared.AuthModels
{
    public class ResendOTPRequestDto
    {
        [Required, EmailAddress]
        public string Email { get; set; }
    }
}
