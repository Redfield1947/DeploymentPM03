using PhongMach_Ver_1._0.Entities;
using PhongMach_Ver_1._0.Models.Models;
using PhongMach_Ver_1._0.Web.Controllers;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web;
using System.Web.Mvc;
using PhongMach_Ver_1._0.Services;

namespace PhongMach_Ver_1._0.Controllers
{
    public class ThuocController : BaseController
    {
        public ThuocController(IBenhAnService _benhanService, ICTDTService _ctdtService, ICTHDService _cthdService, IDInhNghiaGiaTriService _dngtService, IDonThuocService _donthuocService, IGiaTriMacDinhService _gtmdService, IHoaDonService _hoadonService, IBenhNhanService _benhnhanService, ILichKhamService _lichkhamService, INguoiDungService _nguoidungService, IThuocService _thuocService) : base(_benhanService, _ctdtService, _cthdService, _dngtService, _donthuocService, _gtmdService, _hoadonService, _benhnhanService, _lichkhamService, _nguoidungService, _thuocService)
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
            var data = new List<ThuocModel>();
            var result = _thuocService.GetAll().OrderBy(x=>x.tenThuoc).ToList();
            if (result.Count > 0)
            {
                foreach (ThuocEntities en in result)
                {
                    AutoMapper.Mapper.CreateMap<ThuocEntities, ThuocModel>();
                    var thuoc = AutoMapper.Mapper.Map<ThuocEntities, ThuocModel>(en);
                    if(thuoc.loaiThuoc.ToString() != "-1")
                    {
                        thuoc.TenLoaiThuoc = _gtmdService.getByID(thuoc.loaiThuoc).GiaTri.ToString();
                    }
                    else if(thuoc.loaiThuoc == -1)
                    {
                        thuoc.TenLoaiThuoc = " ";
                    }
                    data.Add(thuoc);
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
        public JsonResult CreateOrUpDate(ThuocEntities Option)
        {
            var result = new HttpResponseMessage { StatusCode = HttpStatusCode.OK };
            try
            {
                if (Option.ID_Thuoc > 0)
                {
                    Option.Date_Edited = DateTime.Now;
                    _thuocService.Update(Option);
                }
                else
                {
                    Option.Date_Created = DateTime.Now;
                    _thuocService.Create(Option);
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
                if (id>0)
                {
                    _thuocService.Delete(id);
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
        public JsonResult GetByID_LoaiThuoc(int id)
        {
            var list_byLoaiThuoc = new List<ThuocEntities>();
            var result = _thuocService.GetByLoaiThuoc(id).ToList();
            if(result.Count>0)
            {
                foreach (ThuocEntities en in result)
                {
                    AutoMapper.Mapper.CreateMap<ThuocEntities, ThuocModel>();
                    var thuoc = AutoMapper.Mapper.Map<ThuocEntities, ThuocModel>(en);
                    if (thuoc.loaiThuoc != null || thuoc.loaiThuoc != -1)
                    {
                        thuoc.TenLoaiThuoc = _gtmdService.getByID(thuoc.loaiThuoc).GiaTri;
                    }
                    list_byLoaiThuoc.Add(thuoc);
                }
            }
            return new JsonResult
            {
                Data = list_byLoaiThuoc,
                MaxJsonLength = Int32.MaxValue,
                JsonRequestBehavior = JsonRequestBehavior.AllowGet
            };
        }

        public JsonResult GetAllLoaiThuoc()
        {
            var data = new List<GiaTriMacDinhEntities>();
            var result = _gtmdService.GetByDinhNghia(2).ToList();
            if (result.Count > 0)
            {
                foreach (GiaTriMacDinhEntities en in result)
                {
                    data.Add(en);
                }
            }
            return new JsonResult
            {
                Data = data,
                MaxJsonLength = Int32.MaxValue,
                JsonRequestBehavior = JsonRequestBehavior.AllowGet
            };
        }
    }
}