using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using PhongMach_Ver_1._0.Services;
using System.Net.Http;
using System.Net;
using PhongMach_Ver_1._0.Models.Models;
using PhongMach_Ver_1._0.Entities;

namespace PhongMach_Ver_1._0.Web.Controllers
{
    public class CTHDController : BaseController
    {
        public CTHDController(IBenhAnService _benhanService, ICTDTService _ctdtService, ICTHDService _cthdService, IDInhNghiaGiaTriService _dngtService, IDonThuocService _donthuocService, IGiaTriMacDinhService _gtmdService, IHoaDonService _hoadonService, IBenhNhanService _benhnhanService, ILichKhamService _lichkhamService, INguoiDungService _nguoidungService, IThuocService _thuocService) : base(_benhanService, _ctdtService, _cthdService, _dngtService, _donthuocService, _gtmdService, _hoadonService, _benhnhanService, _lichkhamService, _nguoidungService, _thuocService)
        {
        }
        // GET: CTHD
        public ActionResult Index()
        {
            return View();
        }
        [HttpPost]
        public JsonResult GetAll()
        {
            var data = new List<CTHDModel>();
            var result = _cthdService.GetAll().OrderBy(x => x.ID_Thuoc).ToList();
            if (result.Count > 0)
            {
                foreach (CTHDEntities en in result)
                {
                    AutoMapper.Mapper.CreateMap<CTHDEntities, CTHDModel>();
                    var nd = AutoMapper.Mapper.Map<CTHDEntities, CTHDModel>(en);
                    if(nd.ID_Thuoc !=null || nd.ID_Thuoc != -1)
                    {
                        nd.TenThuoc = _thuocService.GetByID(nd.ID_Thuoc).tenThuoc.ToString();
                    }
                    data.Add(nd);
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
        public JsonResult CreateOrUpDate(CTHDEntities Option)
        {
            var result = new HttpResponseMessage { StatusCode = HttpStatusCode.OK };
            try
            {
                if (Option.ID_HoaDon>0 && Option.ID_Thuoc>0)
                {
                    Option.Date_Edited = DateTime.Now;
                    _cthdService.Update(Option);
                }
                else
                {
                    Option.Date_Created = DateTime.Now;
                    _cthdService.Create(Option);
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
        public JsonResult Delete(int ID_HD, int ID_T)
        {
            var result = new HttpResponseMessage { StatusCode = HttpStatusCode.OK };
            try
            {
                if (ID_HD >0 && ID_T>0)
                {
                    _cthdService.Delete(ID_HD,ID_T);
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