using Domain.Contracts;
using Domain.Entities;
using Shared.EventModels;

namespace Services
{
    internal class EventService (IUnitOfWork unitOfWork, IFileService fileService)
        : IEventService
    {
        public async Task CreateAsync(CreateEventDTO dto)
        {
            var eventRepo = unitOfWork.GetRepository<Event, string>();
            string imagePath = await fileService.SaveFileAsync(dto.Image, "uploads/images/events");

            var eventEntity = new Event
            {
                Name = dto.Name,
                Description = dto.Description,
                Category = dto.Category,
                Venue = dto.Venue,
                Price = dto.Price,
                Date = dto.Date,
                ImagePath = imagePath
            };
            await eventRepo.AddAsync(eventEntity);
            await unitOfWork.SaveChangesAsync();
        }
        public async Task UpdateAsync(string eventId, CreateEventDTO dto)
        {
            var eventRepo = unitOfWork.GetRepository<Event, string>();
            var eventToUpdate = await eventRepo.GetAsync(eventId);
            if (eventToUpdate == null)
            {
                throw new Exception("Event not found");
            }

            // Delete old image if exists
            if (!string.IsNullOrEmpty(eventToUpdate.ImagePath))
            {
                fileService.DeleteFile(eventToUpdate.ImagePath);
            }

            string imagePath = await fileService.SaveFileAsync(dto.Image, "uploads/images/events");
            
            eventToUpdate.Name = dto.Name;
            eventToUpdate.Description = dto.Description;
            eventToUpdate.Category = dto.Category;
            eventToUpdate.Venue = dto.Venue;
            eventToUpdate.Price = dto.Price;
            eventToUpdate.Date = dto.Date;
            eventToUpdate.ImagePath = imagePath;

       

            eventRepo.Update(eventToUpdate);
            await unitOfWork.SaveChangesAsync();
        }

        public async Task DeleteAsync(string eventId)
        {
            var eventRepo = unitOfWork.GetRepository<Event, string>();
            var eventToDelete = await eventRepo.GetAsync(eventId);
            if (eventToDelete == null)
            {
                throw new Exception("Event not found");
            }
            // Delete image if exists
            if (!string.IsNullOrEmpty(eventToDelete.ImagePath))
            {
                fileService.DeleteFile(eventToDelete.ImagePath);
            }
            eventRepo.Delete(eventToDelete);
            await unitOfWork.SaveChangesAsync();
        }

        public async Task<IEnumerable<EventDTO>> GetAllAsync()
        {
            var eventRepo = unitOfWork.GetRepository<Event, string>();
            var events = await eventRepo.GetAllWithIncludesAsync(e => true, e => e.Bookings);
            if (events == null || !events.Any())
                return Enumerable.Empty<EventDTO>();
 
            return events.Select(e => new EventDTO
            {
                Id = e.Id,
                Name = e.Name,
                Description = e.Description,
                Category = e.Category,
                ImageUrl = e.ImagePath,
                Price = e.Price,
                Date = e.Date,
                Venue = e.Venue,
                BookingsCount = e.Bookings == null ? 0 : e.Bookings.Count
            });
        }

        public async Task<EventDTO?> GetByIdAsync(string eventId)
        {
            var eventRepo = unitOfWork.GetRepository<Event, string>();
            var eventEntity = await eventRepo.GetWithIncludesAsync(e => e.Id == eventId, e => e.Bookings);
            if (eventEntity == null)
                throw new Exception("Event not found");

            // Get bookings count
            var bookingsCount = eventEntity.Bookings == null ? 0 : eventEntity.Bookings.Count;

            return new EventDTO
            {
                Id = eventEntity.Id,
                Name = eventEntity.Name,
                Description = eventEntity.Description,
                Category = eventEntity.Category,
                ImageUrl = eventEntity.ImagePath,
                Price = eventEntity.Price,
                Date = eventEntity.Date,
                Venue = eventEntity.Venue,
                BookingsCount = bookingsCount
            };
        }
    }
}
