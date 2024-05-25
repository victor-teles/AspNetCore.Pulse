using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Pulse.UI.Data;

namespace Microsoft.Extensions.DependencyInjection;

public static class HealthChecksUIBuilderExtensions
{
    public static HealthChecksUIBuilder AddSqlServerStorage(
        this HealthChecksUIBuilder builder,
        string connectionString,
        Action<DbContextOptionsBuilder>? configureOptions = null,
        Action<SqlServerDbContextOptionsBuilder>? configureSqlServerOptions = null)
    {
        builder.Services.AddDbContext<HealthChecksDb>(optionsBuilder =>
        {
            configureOptions?.Invoke(optionsBuilder);
            optionsBuilder.UseSqlServer(connectionString, sqlServerOptionsBuilder =>
            {
                sqlServerOptionsBuilder.MigrationsAssembly("Pulse.UI.SqlServer.Storage");
                configureSqlServerOptions?.Invoke(sqlServerOptionsBuilder);
            });
        });

        return builder;
    }
}
