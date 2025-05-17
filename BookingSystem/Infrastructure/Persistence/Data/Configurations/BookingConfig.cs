using Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Persistence.Data.Configurations
{
    public class BookingConfig : IEntityTypeConfiguration<Booking>
    {
        public void Configure(EntityTypeBuilder<Booking> builder)
        {
            builder.HasOne(b => b.Event)
                   .WithMany(e => e.Bookings)
                   .HasForeignKey(b => b.EventId);

            builder.HasOne(b => b.User)
                   .WithMany(u => u.Bookings)
                   .HasForeignKey(b => b.UserId);
        }
    }
}
