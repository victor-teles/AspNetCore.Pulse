using Microsoft.EntityFrameworkCore;
using Npgsql.EntityFrameworkCore.PostgreSQL.Infrastructure;
using Pulse.UI.Data;

namespace Microsoft.Extensions.DependencyInjection;

public static class HealthChecksUIBuilderExtensions
{
    public static HealthChecksUIBuilder AddPostgreSqlStorage(
        this HealthChecksUIBuilder builder,
        string connectionString,
        Action<DbContextOptionsBuilder>? configureOptions = null,
        Action<NpgsqlDbContextOptionsBuilder>? configurePostgreOptions = null)
    {
        builder.Services.AddDbContext<HealthChecksDb>(optionsBuilder =>
        {
            configureOptions?.Invoke(optionsBuilder);
            optionsBuilder.UseNpgsql(connectionString, npgsqlOptionsBuilder =>
            {
                npgsqlOptionsBuilder.MigrationsAssembly("Pulse.UI.PostgreSQL.Storage");
                configurePostgreOptions?.Invoke(npgsqlOptionsBuilder);
            });
        });

        return builder;
    }
}
