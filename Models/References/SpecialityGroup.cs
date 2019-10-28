using System;
using System.ComponentModel.DataAnnotations;

namespace edudep.Models.References
{
    public class SpecialityGroup
    {
        public Guid Id { get; set; }
        [SearchableProperty]
        [Required]
        [MaxLength(250)]
        public string Name { get; set; }
        [SearchableProperty]
        [Required]
        [MaxLength(15)]
        public string ShortName { get; set; }
        [SearchableProperty]
        [Required]
        [MaxLength(10)]
        public string Code { get; set; }
    }
}
