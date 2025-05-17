using Shared.EventModels;

namespace Presentation
{
    public class EventsController (IServiceManager serviceManager)
        : ApiController
    {
        [HttpGet("{id}")]
        [Authorize]
        public async Task<IActionResult> GetById(string id)
        {
            var e = await serviceManager.EventService.GetByIdAsync(id);
            return e != null ? Ok(e) : NotFound();
        }

        [HttpGet]
        [Authorize]
        public async Task<IActionResult> GetAll() 
            => Ok(await serviceManager.EventService.GetAllAsync());

        [HttpPost]
        [Authorize(Roles = "AdminRole")]
        public async Task<IActionResult> Create(CreateEventDTO dto)
        {
            await serviceManager.EventService.CreateAsync(dto);
            return Ok("Event Created Successfully!");
        }

        [HttpPut("{id}")]
        [Authorize(Roles = "AdminRole")]
        public async Task<IActionResult> Update(string id, CreateEventDTO dto)
        {
            await serviceManager.EventService.UpdateAsync(id, dto);
            return Ok("Event Updated Successfully!");
        }

        [HttpDelete("{id}")]
        [Authorize(Roles = "AdminRole")]
        public async Task<IActionResult> Delete(string id)
        {
            await serviceManager.EventService.DeleteAsync(id);
            return Ok("Event Deleted Successfully!");
        }
    }
}
