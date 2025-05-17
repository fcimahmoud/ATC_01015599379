﻿
global using Domain.Contracts;
global using Persistence.Data;
global using System.Linq.Expressions;
global using Microsoft.EntityFrameworkCore;

namespace Persistence.Repositories
{
    public class GenericRepository<TEntity, TKey>(AppDbContext context)
        : IGenericRepository<TEntity, TKey> where TEntity : BaseEntity<TKey>
    {
        public async Task AddAsync(TEntity entity)
            => await context.Set<TEntity>().AddAsync(entity);

        public void Delete(TEntity entity)
            => context.Set<TEntity>().Remove(entity);

        public void Update(TEntity entity)
            => context.Set<TEntity>().Update(entity);

        public async Task<IEnumerable<TEntity>> GetAllAsync(bool trackChanges = true)
            => trackChanges ? await context.Set<TEntity>().ToListAsync()
                            : await context.Set<TEntity>().AsNoTracking().ToListAsync();

        public async Task<TEntity?> GetAsync(TKey id)
            => await context.Set<TEntity>().FindAsync(id);

        // Retrieve a single entity by condition
        public async Task<TEntity?> GetByConditionAsync(Expression<Func<TEntity, bool>> condition)
            => await context.Set<TEntity>().FirstOrDefaultAsync(condition);

        // Retrieve all matching entities with optional tracking
        public async Task<IEnumerable<TEntity>> GetAllByConditionAsync(Expression<Func<TEntity, bool>> condition)
            => await context.Set<TEntity>().Where(condition).ToListAsync();


        // Retrieve entity with Includes (for related data)
        public async Task<TEntity?> GetWithIncludesAsync(Expression<Func<TEntity, bool>> condition, params Expression<Func<TEntity, object>>[] includes)
        {
            IQueryable<TEntity> query = context.Set<TEntity>();

            foreach (var include in includes)
                query = query.Include(include);

            return await query.FirstOrDefaultAsync(condition);
        }

        // Retrieve all matching entities with Includes
        public async Task<IEnumerable<TEntity>> GetAllWithIncludesAsync(Expression<Func<TEntity, bool>> condition, params Expression<Func<TEntity, object>>[] includes)
        {
            IQueryable<TEntity> query = context.Set<TEntity>();

            foreach (var include in includes)
                query = query.Include(include);

            return await query.Where(condition).ToListAsync();
        }
    }
}
