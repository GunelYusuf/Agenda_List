using Agenda_List.Application.Repositories.AgendaList;
using Agenda_List.Persistence.Concretes.AgendaList;
using Agenda_List.Persistence.Context;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

namespace Agenda_List.Persistence
{
    public static class ServiceRegistration
    {
        public static void AddPersistenceInfrastructure(this IServiceCollection service, IConfiguration configuration)
        {
            service.AddTransient<Agenda_List_DbContext>();
            service.AddScoped<IAgendaListReadRepository, AgendaListReadRepository>();
            service.AddScoped<IAgendaListWriteRepository, AgendaListWriteRepository>();


        }
    }



}
