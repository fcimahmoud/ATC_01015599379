namespace Shared.AuthModels
{
    public record UserResultDTO(string Name, string Email, string AccessToken,
    string RefreshToken);
}
