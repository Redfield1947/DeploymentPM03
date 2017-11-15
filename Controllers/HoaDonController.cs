using PhongMach_Ver_1._0.Models.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using PhongMach_Ver_1._0.Services;
using PhongMach_Ver_1._0.Entities;
using System.Net.Http;
using System.Net;

namespace PhongMach_Ver_1._0.Web.Controllers
{
    public class HoaDonController : BaseController
    {
        public HoaDonController(IBenhAnService _benhanService, ICTDTService _ctdtService, ICTHDService _cthdService, IDInhNghiaGiaTriService _dngtService, IDonThuocService _donthuocService, IGiaTriMacDinhService _gtmdService, IHoaDonService _hoadonService, IBenhNhanService _benhnhanService, ILichKhamService _lichkhamService, INguoiDungService _nguoidungService, IThuocService _thuocService) : base(_benhanService, _ctdtService, _cthdService, _dngtService, _donthuocService, _gtmdService, _hoadonService, _benhnhanService, _lichkhamService, _nguoidungService, _thuocService)
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
            var data = new List<HoaDonModel>();
            var result = _hoadonService.GetAll().OrderBy(x => x.ID_BenhNhan).ToList();
            if (result.Count > 0)
            {
                foreach (HoaDonEntities en in result)
                {
                    AutoMapper.Mapper.CreateMap<HoaDonEntities, HoaDonModel>();
                    var hd = AutoMapper.Mapper.Map<HoaDonEntities, HoaDonModel>(en);
                    if (hd.ID_BenhNhan != null || hd.ID_BenhNhan != -1)
                    {
                        hd.TenBenhNhan = _benhnhanService.GetByID(hd.ID_BenhNhan).ten_BenhNhan.ToString();
                    }
                    if(hd.ID_LichKham != null || hd.ID_LichKham != -1)
                    {
                        hd.TienKhamBenh = long.Parse(_gtmdService.getByID(_lichkhamService.GetByID(hd.ID_LichKham).ID_PhiKhamBenh).GiaTri.ToString());
                    }
                    decimal tienThuoc = new decimal();
                    var thuoc = _cthdService.GetAll().Where(x => x.ID_HoaDon == hd.ID_HoaDon).ToList();
                    foreach(var ct in thuoc)
                    {
                        tienThuoc = tienThuoc + ct.tongCong;
                    }
                    hd.GiaTriHoaDon = tienThuoc;
                    data.Add(hd);
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
        public JsonResult CreateOrUpDate(HoaDonEntities Option)
        {
            var result = new HttpResponseMessage { StatusCode = HttpStatusCode.OK };
            try
            {
                if (Option.ID_HoaDon> 0)
                {
                    Option.Date_Edited = DateTime.Now;
                    _hoadonService.Update(Option);
                }
                else
                {
                    Option.Date_Created = DateTime.Now;
                    _hoadonService.Create(Option);
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
                    _hoadonService.Delete(id);
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