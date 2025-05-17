namespace Shared.AuthModels
{
    public class ForgotPasswordRequestDto
    {
        [Required, EmailAddress]
        public string Email { get; init; }
    }
}
