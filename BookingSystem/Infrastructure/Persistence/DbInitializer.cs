
global using Microsoft.AspNetCore.Identity;
global using Domain.Entities;

namespace Persistence
{
    public class DbInitializer(
        UserManager<ApplicationUser> userManager,
        RoleManager<IdentityRole> roleManager,
        IUnitOfWork unitOfWork
        )
        : IDbInitializer
    {

        public async Task InitializeIdentityAsync()
        {
            var roles = new[]
            { "AdminRole", "UserRole"};

            // Seed Default Roles
            foreach (var role in roles)
            {
                if (!await roleManager.RoleExistsAsync(role))
                {
                    await roleManager.CreateAsync(new IdentityRole(role));
                }
            }

            // Seed Default Users
            if (!userManager.Users.Any())
            {
                var admin = new ApplicationUser
                {
                    Name = "Mahmoud",
                    UserName = "ma5740@fayoum.edu.eg",
                    Email = "ma5740@fayoum.edu.eg",
                    EmailConfirmed = true
                };

                await userManager.CreateAsync(admin, "P@ssw0rd");
                await userManager.AddToRoleAsync(admin, "AdminRole");

                await unitOfWork.SaveChangesAsync();
            }
        }
    }
}
