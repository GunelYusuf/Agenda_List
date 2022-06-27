using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Agenda_List.Domain.Common;

namespace Agenda_List.Application.Repositories
{
    public interface IWriteRepository<T> : IRepository<T> where T : BaseEntity
    {
        Task<bool> AddAsync(T model);

        Task<bool> AddRangeAsync(List<T> datas);

        bool Remove(T model);

        Task<bool> RemoveAsync(string id);

        bool RemoveRange(List<T> datas);

        bool Update(T model);

        Task<int> SaveAsync();
    }
}
