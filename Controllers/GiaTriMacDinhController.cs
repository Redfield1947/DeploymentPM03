using PhongMach_Ver_1._0.Entities;
using PhongMach_Ver_1._0.Models.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web;
using System.Web.Mvc;
using PhongMach_Ver_1._0.Services;

namespace PhongMach_Ver_1._0.Web.Controllers
{
    public class GiaTriMacDinhController : BaseController
    {
        public GiaTriMacDinhController(IBenhAnService _benhanService, ICTDTService _ctdtService, ICTHDService _cthdService, IDInhNghiaGiaTriService _dngtService, IDonThuocService _donthuocService, IGiaTriMacDinhService _gtmdService, IHoaDonService _hoadonService, IBenhNhanService _benhnhanService, ILichKhamService _lichkhamService, INguoiDungService _nguoidungService, IThuocService _thuocService) : base(_benhanService, _ctdtService, _cthdService, _dngtService, _donthuocService, _gtmdService, _hoadonService, _benhnhanService, _lichkhamService, _nguoidungService, _thuocService)
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
            var data = new List<GiaTriMacDinhModel>();
            var result = _gtmdService.GetAll().OrderBy(x => x.GiaTri).ToList();
            if (result.Count > 0)
            {
                foreach (GiaTriMacDinhEntities  en in result)
                {
                    AutoMapper.Mapper.CreateMap<GiaTriMacDinhEntities, GiaTriMacDinhModel>();
                    var gtmd = AutoMapper.Mapper.Map<GiaTriMacDinhEntities, GiaTriMacDinhModel>(en);
                    if (gtmd.ID_DinhNghiaGiaTri != null || gtmd.ID_DinhNghiaGiaTri != -1)
                    {
                        gtmd.tenDinhNghia = _dngtService.getByID(gtmd.ID_DinhNghiaGiaTri).tenDinhNghia.ToString();
                        gtmd.GhiChu = _dngtService.getByID(gtmd.ID_DinhNghiaGiaTri).GhiChu.ToString();
                    }
                    data.Add(gtmd);
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
        public JsonResult CreateOrUpDate(GiaTriMacDinhEntities Option)
        {
            var result = new HttpResponseMessage { StatusCode = HttpStatusCode.OK };
            try
            {
                if (Option.ID_GiaTri > 0)
                {
                    Option.Date_Edited = DateTime.Now;
                    _gtmdService.Update(Option);
                }

                else
                {
                    Option.Date_Created = DateTime.Now;
                    _gtmdService.Create(Option);
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
                    _gtmdService.Delete(id);
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
        public JsonResult GetByID_DinhNghiaGiaTri(int id)
        {
            var list_byDN = new List<GiaTriMacDinhModel>();
            var result = _gtmdService.GetByDinhNghia(id).ToList(); ;
            if (result.Count > 0)
            {
                foreach (GiaTriMacDinhModel en in result)
                {
                    AutoMapper.Mapper.CreateMap<GiaTriMacDinhEntities, GiaTriMacDinhModel>();
                    var gtmd = AutoMapper.Mapper.Map<GiaTriMacDinhEntities, GiaTriMacDinhModel>(en);
                    if (gtmd.ID_DinhNghiaGiaTri != null || gtmd.ID_DinhNghiaGiaTri != -1)
                    {
                        gtmd.tenDinhNghia = _dngtService.getByID(gtmd.ID_DinhNghiaGiaTri).tenDinhNghia.ToString();
                        gtmd.GhiChu = _dngtService.getByID(gtmd.ID_DinhNghiaGiaTri).GhiChu.ToString();
                    }
                    list_byDN.Add(gtmd);
                }
            }
            return new JsonResult
            {
                Data = list_byDN,
                MaxJsonLength = Int32.MaxValue,
                JsonRequestBehavior = JsonRequestBehavior.AllowGet
            };
        }
        //Ham bo vao dropdownlist de hien thong tin


        public JsonResult GetAllDinhNghia()
        {
            var data = new List<DinhNghiaGiaTriEntities>();
            var result = _dngtService.GetAll().OrderBy(x => x.tenDinhNghia).ToList();
            if (result.Count > 0)
            {
                foreach (DinhNghiaGiaTriEntities en in result)
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

        // GET: GiaTriMacDinh
    }
}