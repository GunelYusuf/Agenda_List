using System;
using System.Linq;
using System.Threading.Tasks;
using Agenda_List.Domain.Entities.Common;
using System.Linq.Expressions;

namespace Agenda_List.Application.Repositories
{
    public interface IReadRepository<T> : IRepository<T> where T : BaseEntity
    {
            IQueryable<T> GetAll();
            IQueryable<T> GetWhere(Expression<Func<T, bool>> method);
            Task<T> GetSingleAsync(Expression<Func<T, bool>> method);
            Task<T> GetByIdAsync(string id);
    }
    
}
