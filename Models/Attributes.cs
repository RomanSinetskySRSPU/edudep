using System;

namespace edudep.Models
{
    [AttributeUsage(AttributeTargets.Property, Inherited = true, AllowMultiple = false)]
    public class SearchableProperty : Attribute
    {
    }

    [AttributeUsage(AttributeTargets.Property, Inherited = true, AllowMultiple = true)]
    public class AjaxName : Attribute
    {
        public string name;
        public AjaxName(string name)
        {
            this.name = name;
        }
    }
}
