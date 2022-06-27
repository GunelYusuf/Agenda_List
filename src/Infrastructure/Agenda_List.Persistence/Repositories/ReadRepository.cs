using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Threading.Tasks;
using Agenda_List.Application.Repositories;
using Agenda_List.Domain.Common;
using Agenda_List.Persistence.Context;
using Microsoft.EntityFrameworkCore;

namespace Agenda_List.Persistence.Repositories
{
    public class ReadRepository<T> : IReadRepository<T> where T : BaseEntity
    {
        private readonly Agenda_List_DbContext _context;
        public ReadRepository(Agenda_List_DbContext context)
        {
            _context = context;
        }

        public DbSet<T> Table => _context.Set<T>();


        public IQueryable<T> GetAll()
        {
            try
            {
                var query = Table.AsQueryable();
                return query;
            }
            catch (Exception)
            {
                return null;
            }
        }

        public IQueryable<T> GetWhere(Expression<Func<T, bool>> method)
        {
            var query = Table.Where(method);
            return query;
        }

        public async Task<T> GetSingleAsync(Expression<Func<T, bool>> method)
        {
            var query = Table.AsQueryable();
            return await query.FirstOrDefaultAsync(method);
        }


        public async Task<T> GetByIdAsync(string id)
        //=> await Table.FirstOrDefaultAsync(data => data.Id == Guid.Parse(id));
        //=> await Table.FindAsync(Guid.Parse(id));
        {
            var query = Table.AsQueryable();
            return await query.FirstOrDefaultAsync(data => data.Id == Guid.Parse(id));
        }
    }
}
