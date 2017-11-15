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
    public class BenhNhanController : BaseController
    {
        public BenhNhanController(IBenhAnService _benhanService, ICTDTService _ctdtService, ICTHDService _cthdService, IDInhNghiaGiaTriService _dngtService, IDonThuocService _donthuocService, IGiaTriMacDinhService _gtmdService, IHoaDonService _hoadonService, IBenhNhanService _benhnhanService, ILichKhamService _lichkhamService, INguoiDungService _nguoidungService, IThuocService _thuocService) : base(_benhanService, _ctdtService, _cthdService, _dngtService, _donthuocService, _gtmdService, _hoadonService, _benhnhanService, _lichkhamService, _nguoidungService, _thuocService)
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
            var data = new List<BenhNhanModel>();
            var result =    _benhnhanService.GetAll().OrderBy(x => x.ten_BenhNhan).ToList();
            if (result.Count > 0)
            {
                foreach (BenhNhanEntities en in result)
                {
                    AutoMapper.Mapper.CreateMap<BenhNhanEntities, BenhNhanModel>();
                    var bn = AutoMapper.Mapper.Map<BenhNhanEntities, BenhNhanModel>(en);
                    if (bn.ID_LoaiKhachHang != null || bn.ID_LoaiKhachHang != -1)
                    {
                        bn.TenLoaiKhachHang = _dngtService.getByID(_gtmdService.getByID(bn.ID_LoaiKhachHang).ID_DinhNghiaGiaTri).tenDinhNghia.ToString();
                    }
                    data.Add(bn);
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
        public JsonResult CreateOrUpDate(BenhNhanEntities Option)
        {
            var result = new HttpResponseMessage { StatusCode = HttpStatusCode.OK };
            try
            {
                if (Option.ID_LoaiKhachHang > 0)
                {
                    Option.Date_Edited = DateTime.Now;
                    _benhnhanService.Update(Option);
                }

                else
                {
                    Option.Date_Created = DateTime.Now;
                    Option.ID_LoaiKhachHang = _gtmdService.GetAll().Where(x=>x.GiaTri=="KHCT").FirstOrDefault().ID_GiaTri;
                    var iden= _benhnhanService.Create(Option);
                    _lichkhamService.Create_instance(iden);                 
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
                    _benhnhanService.Delete(id);
                }
            }
            catch (Exception ex)
            {
                result.StatusCode = HttpStatusCode.InternalServerError;
                result.ReasonPhrase = ex.Message;
            }
            return Json(result, JsonRequestBehavior.AllowGet);
        }
 
        public JsonResult GetLoaiKH()
        {
            var data = new List<GiaTriMacDinhEntities>();
            var result = _gtmdService.GetByDinhNghia(_dngtService.GetAll().Where(x => x.tenDinhNghia == "KH").FirstOrDefault().ID_DinhNghiaGiaTri);
            if(result.Any())
            {
                foreach (var en in result)
                {
                    data.Add(en);
                }
            }
            return new JsonResult
            {
                Data = data,
                JsonRequestBehavior = JsonRequestBehavior.AllowGet
            };
        }
        public JsonResult GioiTinh()
        {
            var data  = new List<GiaTriMacDinhEntities>();
            var result = _gtmdService.GetByDinhNghia(_dngtService.GetAll().Where(x => x.tenDinhNghia == "GT").FirstOrDefault().ID_DinhNghiaGiaTri);
            if (result.Any())
            {
                foreach (var en in result)
                {
                    data.Add(en);
                }
            }
            return new JsonResult
            {
                Data = data,
                JsonRequestBehavior = JsonRequestBehavior.AllowGet
            };
        }
    }
}