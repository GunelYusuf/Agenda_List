using Microsoft.EntityFrameworkCore;
using Agenda_List.Domain.Entities.Common;

namespace Agenda_List.Application.Repositories
{

    public interface IRepository<T> where T : BaseEntity
    {
        DbSet<T> Table { get; }
    }
}
