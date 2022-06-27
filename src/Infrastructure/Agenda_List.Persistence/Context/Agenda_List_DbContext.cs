using System;
using Agenda_List.Domain.Entities;
using Microsoft.EntityFrameworkCore;

namespace Agenda_List.Persistence.Context
{
    public class Agenda_List_DbContext:DbContext
    {
        public Agenda_List_DbContext(DbContextOptions options):base(options)
        { }

        public DbSet<Agenda> Agendas { get; set; }
    }
}
