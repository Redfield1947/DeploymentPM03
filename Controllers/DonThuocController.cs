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
    public class DonThuocController : BaseController
    {
        public DonThuocController(IBenhAnService _benhanService, ICTDTService _ctdtService, ICTHDService _cthdService, IDInhNghiaGiaTriService _dngtService, IDonThuocService _donthuocService, IGiaTriMacDinhService _gtmdService, IHoaDonService _hoadonService, IBenhNhanService _benhnhanService, ILichKhamService _lichkhamService, INguoiDungService _nguoidungService, IThuocService _thuocService) : base(_benhanService, _ctdtService, _cthdService, _dngtService, _donthuocService, _gtmdService, _hoadonService, _benhnhanService, _lichkhamService, _nguoidungService, _thuocService)
        {
        }

        // GET: DonThuoc
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
            var data = new List<DonThuocModel>();
            var result = _donthuocService.Getall().OrderBy(x => x.ID_donthuoc).ToList();
            if (result.Count > 0)
            {
                foreach (DonThuocEntities en in result)
                {
                    AutoMapper.Mapper.CreateMap<DonThuocEntities, DonThuocModel>();
                    var donthuoc = AutoMapper.Mapper.Map<DonThuocEntities, DonThuocModel>(en);
                    data.Add(donthuoc);
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
        public JsonResult CreateOrUpDate(DonThuocEntities Option)
        {
            var result = new HttpResponseMessage { StatusCode = HttpStatusCode.OK };
            try
            {
                if (Option.ID_donthuoc > 0)
                {
                    Option.Date_Edited = DateTime.Now;
                    _donthuocService.Update(Option);
                }
                else
                {
                    Option.Date_Created = DateTime.Now;
                    Option.ngayCapThuoc = DateTime.Now;
                    _donthuocService.Create(Option);
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
                    _donthuocService.Delete(id);
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