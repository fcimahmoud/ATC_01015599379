
global using Shared.AuthModels;

namespace Services.Abstractions
{
    public interface IAuthenticationService
    {
        public Task<UserResultDTO> LoginAsync(LoginDTO loginModel);
        public Task<bool> LogoutAsync(string userId);
        public Task RegisterAsync(RegisterDTO registerModel);
        public Task<bool> ConfirmEmailAsync(string email, string token);
        public Task<UserResultDTO> RefreshTokenAsync(string refreshToken);

        public Task<bool> ForgotPasswordAsync(ForgotPasswordRequestDto model);
        public Task<bool> ResetPasswordAsync(ResetPasswordRequestDto model);

        public Task<bool> ResendEmailConfirmationOTPAsync(string email);
        public Task<bool> ResendPasswordResetOTPAsync(string email);

    }
}
