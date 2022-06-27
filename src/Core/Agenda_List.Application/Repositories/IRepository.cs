using Agenda_List.Domain.Common;
using Microsoft.EntityFrameworkCore;


namespace Agenda_List.Application.Repositories
{

    public interface IRepository<T> where T : BaseEntity
    {
        DbSet<T> Table { get; }
    }
}
