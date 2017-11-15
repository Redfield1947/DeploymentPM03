
using PhongMach_Ver_1._0.Entities;
using PhongMach_Ver_1._0.Models.Models;
using PhongMach_Ver_1._0.Services;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web;
using System.Web.Mvc;

namespace PhongMach_Ver_1._0.Web.Controllers
{
    public class LichKhamController : BaseController
    {
        public LichKhamController(IBenhAnService _benhanService, ICTDTService _ctdtService, ICTHDService _cthdService, IDInhNghiaGiaTriService _dngtService, IDonThuocService _donthuocService, IGiaTriMacDinhService _gtmdService, IHoaDonService _hoadonService, IBenhNhanService _benhnhanService, ILichKhamService _lichkhamService, INguoiDungService _nguoidungService, IThuocService _thuocService) : base(_benhanService, _ctdtService, _cthdService, _dngtService, _donthuocService, _gtmdService, _hoadonService, _benhnhanService, _lichkhamService, _nguoidungService, _thuocService)
        {
        }

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
            var data = new List<LichKhamModel>();
            var result = _lichkhamService.GetAll().OrderBy(x => x.NgayKham).ToList();
            if (result.Count > 0)
            {
                foreach (LichKhamEntities en in result)
                {
                    AutoMapper.Mapper.CreateMap<LichKhamEntities, LichKhamModel>();
                    var lich = AutoMapper.Mapper.Map<LichKhamEntities, LichKhamModel>(en);
                    if (lich.ID_KhachHang != -1)
                    {
                        lich.TenKhachHang = _benhnhanService.GetByID(lich.ID_KhachHang).ten_BenhNhan.ToString();
                    }
                    data.Add(lich);
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
        public JsonResult CreateOrUpDate(LichKhamModel Option)
        {
            var result = new HttpResponseMessage { StatusCode = HttpStatusCode.OK };
            try
            {
                int? khid = _benhnhanService.GetAll().Where(x => x.ten_BenhNhan == Option.TenKhachHang).SingleOrDefault().ID_BenhNhan;
                if (khid != null)
                {
                    if (Option.ID_LichKham > 0)
                    {
                        Option.Date_Edited = DateTime.Now;
                        _lichkhamService.Update(Option);
                    }

                    else
                    {

                        Option.Date_Created = DateTime.Now;
                        _lichkhamService.Create(Option);
                    }
                }
                else
                {
                    result.StatusCode = HttpStatusCode.Continue;
                    result.ReasonPhrase = " ";
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
                    _lichkhamService.Delete(id);
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
        public JsonResult GetByKhachHang(int id)
        {
            var list_byKhachhang = new List<LichKhamModel>();
            var result = _lichkhamService.GetByKhachHang(id).ToList();
            if (result.Count > 0)
            {
                foreach (LichKhamEntities en in result)
                {
                    AutoMapper.Mapper.CreateMap<LichKhamEntities, LichKhamModel>();
                    var lich = AutoMapper.Mapper.Map<LichKhamEntities, LichKhamModel>(en);
                    if (lich.ID_KhachHang != null || lich.ID_KhachHang != -1)
                    {
                        lich.TenKhachHang = _benhnhanService.GetByID(lich.ID_KhachHang).ten_BenhNhan;
                    }
                    list_byKhachhang.Add(lich);
                }
            }
            return new JsonResult
            {
                Data = list_byKhachhang,
                MaxJsonLength = Int32.MaxValue,
                JsonRequestBehavior = JsonRequestBehavior.AllowGet
            };
        }
    }
}