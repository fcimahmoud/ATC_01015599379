using Shared.EventModels;

namespace Services.Abstractions
{
    public interface IEventService
    {
        Task<EventDTO?> GetByIdAsync(string id);
        Task<IEnumerable<EventDTO>> GetAllAsync();
        Task CreateAsync(CreateEventDTO e);
        Task UpdateAsync(string Id, CreateEventDTO e);
        Task DeleteAsync(string id);
    }
}
