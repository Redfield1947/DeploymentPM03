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
    public class CTDTController : BaseController
    {
        public CTDTController(IBenhAnService _benhanService, ICTDTService _ctdtService, ICTHDService _cthdService, IDInhNghiaGiaTriService _dngtService, IDonThuocService _donthuocService, IGiaTriMacDinhService _gtmdService, IHoaDonService _hoadonService, IBenhNhanService _benhnhanService, ILichKhamService _lichkhamService, INguoiDungService _nguoidungService, IThuocService _thuocService) : base(_benhanService, _ctdtService, _cthdService, _dngtService, _donthuocService, _gtmdService, _hoadonService, _benhnhanService, _lichkhamService, _nguoidungService, _thuocService)
        {
        }

        // GET: CTDT
        public ActionResult Index()
        {
            return View();
        }
        [HttpPost]
        public JsonResult GetAll()
        {
            var data = new List<ChiTietDonThuocModel>();
            var result = _ctdtService.getAll().ToList();
            if (result.Count > 0)
            {
                foreach (ChiTietDonThuocEntities en in result)
                {
                    AutoMapper.Mapper.CreateMap<ChiTietDonThuocEntities, ChiTietDonThuocModel>();
                    var CTDT = AutoMapper.Mapper.Map<ChiTietDonThuocEntities, ChiTietDonThuocModel>(en);
                    if (CTDT.ID_Thuoc > 0)
                    {
                        CTDT.TenThuoc = " ";
                        CTDT.TenThuoc = _thuocService.GetByID(CTDT.ID_Thuoc).tenThuoc.ToString();
                    }
                    data.Add(CTDT);
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
        public JsonResult CreateOrUpDate(ChiTietDonThuocModel Option)
        {
            var result = new HttpResponseMessage { StatusCode = HttpStatusCode.OK };
            Option.ID_Thuoc = _thuocService.GetByName(Option.TenThuoc).ID_Thuoc;
            try
            {
                if (Option.ID_DonThuoc > 0 && Option.ID_Thuoc>0)
                {
                    Option.Date_Edited = DateTime.Now;
                    _ctdtService.Update(Option);
                }
                else if(Option.ID_DonThuoc>0 && Option.ID_Thuoc<=0)
                {
                    _thuocService.CreateTemp(Option.TenThuoc);
                    Option.Date_Edited = DateTime.Now;
                    _ctdtService.Update(Option);
                }
                else
                {
                    if (Option.ID_Thuoc > 0)
                    {
                        Option.ID_DonThuoc = -1;
                        Option.Date_Created = DateTime.Now;
                        _ctdtService.Create(Option);
                    }
                    else
                    {
                        var un_data = _thuocService.CreateTemp(Option.TenThuoc);
                        Option.ID_Thuoc = un_data;
                        Option.ID_DonThuoc = -1;
                         Option.Date_Created = DateTime.Now;
                        _ctdtService.Create(Option);
                    }
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
                    _ctdtService.Delete(id);
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