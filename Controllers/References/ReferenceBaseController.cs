using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection;
using edudep.Models;

namespace edudep.Controllers.References
{
    public class ReferenceBaseController : Controller
    {
        protected IEnumerable<T> SortData<T>(IEnumerable<T> source, string sort, string order)
        {
            if (order != "asc" && order != "desc") return source;
            // Сортировка по полям, для которых указано свойство AjaxName
            var obj = source.FirstOrDefault();
            if (obj != null)
            {
                IEnumerable<PropertyInfo> props = obj.GetType().GetProperties();
                    //.Where(x => x.CustomAttributes.Where(a => a.AttributeType == typeof(AjaxName)).Count() > 0);
                if (props.Count() > 0)
                {
                    PropertyInfo orderProp = null;
                    foreach (var p in props) // ищем совпадения по атрибуту AjaxName
                    {
                        AjaxName[] attrs = (AjaxName[])Attribute.GetCustomAttributes(p, typeof(AjaxName));
                        var s = attrs.Where(x => x.name.ToUpper().Trim() == sort.ToUpper().Trim());
                        if (s.Count() > 0)
                        {
                            orderProp = p;
                            break;
                        }
                    }
                    if (orderProp == null) // если не нашли совпадения по атрибуту AjaxName, то ищем по названию свойства класса
                    {
                        var s = props.Where(x => x.Name.ToUpper().Trim() == sort.ToUpper().Trim()).FirstOrDefault();
                        if (s != null)
                            orderProp = s;
                    }
                    if (orderProp != null)
                    {
                        if (order.ToUpper().Trim() == "ASC")
                            return source.OrderBy(x => orderProp.GetValue(x));
                        else
                            return source.OrderByDescending(x => orderProp.GetValue(x));
                    }
                }
            }
            // Сортировка по виртуальной функции предиката

            // ...   https://stackoverflow.com/questions/307512/how-do-i-apply-orderby-on-an-iqueryable-using-a-string-column-name-within-a-gene

            return source;
        }

        protected IEnumerable<T> SearchData<T>(IEnumerable<T> source, string search)
        {
            if (search == null)
                return source;
            if (search.Trim().Length == 0)
                return source;
            var obj = source.FirstOrDefault();
            if (obj == null)
                return source;
            IEnumerable<PropertyInfo> props = obj.GetType().GetProperties()
                .Where(x => x.PropertyType.IsSerializable && (x.CustomAttributes.Where(a => a.AttributeType == typeof(SearchableProperty)).Count() > 0));
            var res = source.Where(x => false).ToList();
            foreach (var o in source)
                foreach (var p in props)
                {
                    var v = p.GetValue(o);
                    if (v == null) continue;
                    string s = v.ToString().ToUpper();
                    if (s.Contains(search.ToUpper()))
                    {
                        res.Add(o);
                        break;
                    }
                }
            return res;
        }

        protected IEnumerable<T> SelectPage<T>(IEnumerable<T> source, int limit, int offset)
        {
            return source
                .Skip(offset)
                .Take(limit);
        }
    }
}
