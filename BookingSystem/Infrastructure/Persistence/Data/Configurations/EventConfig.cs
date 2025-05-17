using Domain.Entities;
using Microsoft.EntityFrameworkCore;

namespace Persistence.Data.Configurations
{
    public class EventConfig : IEntityTypeConfiguration<Event>
    {
        public void Configure(Microsoft.EntityFrameworkCore.Metadata.Builders.EntityTypeBuilder<Event> builder)
        {
            builder.Property(u => u.Id)
                    .IsRequired()
                    .ValueGeneratedOnAdd()
                    .HasDefaultValueSql("NEWID()");

            builder.Property(e => e.Name).IsRequired().HasMaxLength(100);
            builder.Property(e => e.Price).HasColumnType("decimal(18,2)");

            builder.HasMany(e => e.Bookings)
                   .WithOne(b => b.Event)
                   .HasForeignKey(b => b.EventId);
        }
    }
}
