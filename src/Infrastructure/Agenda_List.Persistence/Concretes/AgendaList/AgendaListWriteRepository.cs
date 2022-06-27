using System;
using Agenda_List.Application.Repositories.AgendaList;
using Agenda_List.Domain.Entities;
using Agenda_List.Persistence.Context;
using Agenda_List.Persistence.Repositories;

namespace Agenda_List.Persistence.Concretes.AgendaList
{
    public class AgendaListWriteRepository : WriteRepository<Agenda>, IAgendaListWriteRepository
    {
        public AgendaListWriteRepository(Agenda_List_DbContext context) : base(context) { }
    }
}
