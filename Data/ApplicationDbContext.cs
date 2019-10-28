using edudep.Models.References;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace edudep.Data
{
    public class ApplicationDbContext : IdentityDbContext
    {

        public DbSet<SpecialityGroup> SpecialityGroups { get; set; }
        public DbSet<Speciality> Specialities { get; set; }


        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
            : base(options)
        {
        }
    }
}
