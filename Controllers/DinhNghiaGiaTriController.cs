using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using PhongMach_Ver_1._0.Services;
using PhongMach_Ver_1._0.Models.Models;
using PhongMach_Ver_1._0.Entities;
using System.Net.Http;
using System.Net;

namespace PhongMach_Ver_1._0.Web.Controllers
{
    public class DinhNghiaGiaTriController : BaseController
    {
        public DinhNghiaGiaTriController(IBenhAnService _benhanService, ICTDTService _ctdtService, ICTHDService _cthdService, IDInhNghiaGiaTriService _dngtService, IDonThuocService _donthuocService, IGiaTriMacDinhService _gtmdService, IHoaDonService _hoadonService, IBenhNhanService _benhnhanService, ILichKhamService _lichkhamService, INguoiDungService _nguoidungService, IThuocService _thuocService) : base(_benhanService, _ctdtService, _cthdService, _dngtService, _donthuocService, _gtmdService, _hoadonService, _benhnhanService, _lichkhamService, _nguoidungService, _thuocService)
        {
        }

        // GET: DinhNghiaGiaTri
        public ActionResult Index()
        {
            if (Session["UserName"] == null)
            {
                return RedirectToAction("Login", "NguoiDung");
            }
            return View();
        }
        [HttpPost]
        public JsonResult GetAll()
        {
            var data = new List<DinhNghiaGiaTriModel>();
            var result = _dngtService.GetAll().OrderBy(x => x.tenDinhNghia).ToList();
            if (result.Count > 0)
            {
                foreach (DinhNghiaGiaTriEntities en in result)
                {
                    AutoMapper.Mapper.CreateMap<DinhNghiaGiaTriEntities, DinhNghiaGiaTriModel>();
                    var dn = AutoMapper.Mapper.Map<DinhNghiaGiaTriEntities, DinhNghiaGiaTriModel>(en);
                    data.Add(dn);
                }
            }
            return new JsonResult
            {
                Data = data,
                MaxJsonLength = Int32.MaxValue,
                JsonRequestBehavior = JsonRequestBehavior.AllowGet
            };
        }
        [HttpPost]
        public JsonResult CreateOrUpDate(DinhNghiaGiaTriEntities Option)
        {
            var result = new HttpResponseMessage { StatusCode = HttpStatusCode.OK };
            try
            {
                if (Option.ID_DinhNghiaGiaTri > 0)
                {
                    Option.Date_Edited = DateTime.Now;
                    _dngtService.Update(Option);
                }

                else
                {
                    Option.Date_Created = DateTime.Now;
                    _dngtService.Create(Option);
                }
            }
            catch (Exception ex)
            {
                result.StatusCode = HttpStatusCode.InternalServerError;
                result.ReasonPhrase = ex.Message;
            }
            return Json(result, JsonRequestBehavior.AllowGet);
        }
        [HttpPost]
        public JsonResult Delete(int id)
        {
            var result = new HttpResponseMessage { StatusCode = HttpStatusCode.OK };
            try
            {
                if (id > 0)
                {
                    _dngtService.Delete(id);
                }
            }
            catch (Exception ex)
            {
                result.StatusCode = HttpStatusCode.InternalServerError;
                result.ReasonPhrase = ex.Message;
            }
            return Json(result, JsonRequestBehavior.AllowGet);
        }
    }
}