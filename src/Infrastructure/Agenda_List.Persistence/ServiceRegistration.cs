using Agenda_List.Application.AutoMapper;
using Agenda_List.Application.Repositories.AgendaList;
using Agenda_List.Persistence.Concretes.AgendaList;
using Agenda_List.Persistence.Context;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

namespace Agenda_List.Persistence
{
    public static class ServiceRegistration
    {
        public static void AddPersistenceInfrastructure(this IServiceCollection service, IConfiguration configuration)
        {
            service.AddTransient<Agenda_List_DbContext>();

            service.AddDbContext<Agenda_List_DbContext>(options => options.UseSqlServer("Server=localhost;Database=Agenda_List;Trusted_Connection=False; User Id=sa;Password=MyPass@word", b => b.MigrationsAssembly(typeof(Agenda_List_DbContext).Assembly.FullName)));
            service.AddScoped<IAgendaListReadRepository, AgendaListReadRepository>();
            service.AddScoped<IAgendaListWriteRepository, AgendaListWriteRepository>();
            service.AddAutoMapper(typeof(AutoMapperProfile));

        }
    }



}
