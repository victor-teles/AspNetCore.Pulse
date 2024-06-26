using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Pulse.UI.Data.Configuration;

internal class HealthCheckConfigurationMap
    : IEntityTypeConfiguration<HealthCheckConfiguration>
{
    public void Configure(EntityTypeBuilder<HealthCheckConfiguration> builder)
    {
        builder.HasKey(lc => lc.Id);

        builder.Property(lc => lc.Uri)
            .IsRequired(true)
            .HasMaxLength(500);

        builder.Property(lc => lc.Name)
            .IsRequired(true)
            .HasMaxLength(500);

        builder.Property(lc => lc.DiscoveryService)
            .HasMaxLength(100);
    }
}
