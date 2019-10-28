using System;
using System.ComponentModel.DataAnnotations;


namespace edudep.Models.References
{
    public class Speciality
    {
        // Id направления подготовки
        [Key]
        public Guid Id { get; set; }
        // Название направления подготовки
        [SearchableProperty]
        [Required]
        [MaxLength(250)]
        public string Name { get; set; }
        // Аббревиатура направления подготовки
        [SearchableProperty]
        [Required]
        [MaxLength(15)]
        public string ShortName { get; set; }
        // Шифр направления подготовки
        [SearchableProperty]
        [Required]
        [MaxLength(10)]
        public string Code { get; set; }
        // УГС направления подготовки (FK)
        [SearchableProperty]
        [Required]
        public Guid SpecialityGroupId { get; set; }
        // Тестовое поле с датой
        [SearchableProperty]
        public DateTime TestDate { get; set; }
        [SearchableProperty]

        public bool TestBool { get; set; }

        // link
        public SpecialityGroup SpecialityGroup { get; set; }
    }
}
