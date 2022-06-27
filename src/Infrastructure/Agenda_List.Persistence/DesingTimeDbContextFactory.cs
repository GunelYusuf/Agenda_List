using System;
using Agenda_List.Persistence.Context;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Design;

namespace Agenda_List.Persistence
{
    public class DesingTimeDbContextFactory : IDesignTimeDbContextFactory<Agenda_List_DbContext>
    {
        public Agenda_List_DbContext CreateDbContext(string[] args)
        {
            DbContextOptionsBuilder<Agenda_List_DbContext> dbContextOptionsBuilder = new();
            dbContextOptionsBuilder.UseSqlServer("Server=localhost;Database=Agenda_List;Trusted_Connection=False; User Id=sa;Password=MyPass@word");
            return new Agenda_List_DbContext(dbContextOptionsBuilder.Options);
        }
    }
}
