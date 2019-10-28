using System;
using System.Linq;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Http;
using edudep.Data;
using edudep.Models.References;

namespace edudep.Controllers.References
{
    public class SpecialityGroupsController : ReferenceBaseController
    {
        private readonly ApplicationDbContext context;
        public SpecialityGroupsController(ApplicationDbContext context)
        {
            this.context = context;
        }
        public IActionResult Index()
        {
            return View("Views/References/SpecialityGroups.cshtml");
        }
        public ActionResult GetData(string sort, string order, string search, int limit, int offset)
        {
            try
            {
                var list = SortData(SearchData(context.SpecialityGroups, search), sort, order);
                var totalRows = list.Count();
                if (limit > 0)
                    list = SelectPage(list, limit, offset);

                var result = list
                     .Select(x => new {
                         id = x.Id,
                         name = x.Name,
                         shortname = x.ShortName,
                         code = x.Code
                     });

                return Json(new {
                    total = totalRows,
                    rows = result
                });
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }
        public ActionResult AddOrEditData(string sort, string order, string search, int pagesize, SpecialityGroup data)
        {
            try
            {
                if (data.Id != Guid.Empty)
                {
                    var row = context.SpecialityGroups.FirstOrDefault(x => x.Id == data.Id);
                    if (row == null)
                        return Ok(new
                        {
                            success = false,
                            rowid = Guid.Empty,
                            page = 1,
                            message = "Не найден элемент для редактирования"
                        });
                    row.Name = data.Name;
                    row.ShortName = data.ShortName;
                    row.Code = data.Code;
                }
                else
                {
                    data.Id = Guid.NewGuid();
                    context.SpecialityGroups.Add(data);
                }
                context.SaveChanges();

                var list = SortData(context.SpecialityGroups, sort, order);
                int pageno = 1;
                int idx = -1;
                var idxsearch = list.FirstOrDefault(x => x.Id == data.Id);
                if (idxsearch != null)
                    idx = list.ToList().IndexOf(idxsearch);
                if (idx > -1 && pagesize != 0)
                    pageno = idx / pagesize + 1;

                return Ok(new
                {
                    success = true,
                    rowid = data.Id,
                    page = pageno,
                    message = ""
                });
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, ex.Message );
            }
        }
        public ActionResult RemoveData(string sort, string order, string search, int pagesize, Guid id)
        {
            try
            {
                var row = context.SpecialityGroups.FirstOrDefault(x => x.Id == id);
                if (row == null)
                    if (row == null)
                        return Ok(new
                        {
                            success = false,
                            rowid = Guid.Empty,
                            page = 1,
                            message = "Не найден элемент для удаления"
                        });

                int pageno = 1;
                int idx = -1;
                Guid selid = Guid.Empty;
                var list = SortData(SearchData(context.SpecialityGroups, search), sort, order);
                var idxsearch = list.FirstOrDefault(x => x.Id == id);
                if (idxsearch != null)
                {
                    var l = list.ToList();
                    idx = l.IndexOf(idxsearch);
                    if (idx > -1)
                    {
                        if (idx + 1 < l.Count())
                        {
                            idx = idx + 1;
                            selid = l[idx].Id;
                        }
                        else if (idx > 0)
                        {
                            idx = idx - 1;
                            selid = l[idx].Id;
                        }
                        else idx = -1;
                        if (idx > -1 && pagesize != 0)
                            pageno = idx / pagesize + 1;
                    }
                }

                context.SpecialityGroups.Remove(row);
                context.SaveChanges();

                return Ok(new
                {
                    success = true,
                    rowid = selid,
                    page = pageno,
                    message = ""
                });
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }


    }
}
