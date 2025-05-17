namespace Shared.AuthModels
{
    public record RegisterDTO
    {
        public string Name { get; init; }
        public string Email { get; init; }
        public string Password { get; init; }
        public string? PhoneNumber { get; init; }
    }
}
