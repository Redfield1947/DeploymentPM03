using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using PhongMach_Ver_1._0.Services;
using System.Net.Http;
using System.Net;
using PhongMach_Ver_1._0.Entities;
using PhongMach_Ver_1._0.Models.Models;

namespace PhongMach_Ver_1._0.Web.Controllers
{
    public class NguoiDungController : BaseController
    {
        public NguoiDungController(IBenhAnService _benhanService, ICTDTService _ctdtService, ICTHDService _cthdService, IDInhNghiaGiaTriService _dngtService, IDonThuocService _donthuocService, IGiaTriMacDinhService _gtmdService, IHoaDonService _hoadonService, IBenhNhanService _benhnhanService, ILichKhamService _lichkhamService, INguoiDungService _nguoidungService, IThuocService _thuocService) : base(_benhanService, _ctdtService, _cthdService, _dngtService, _donthuocService, _gtmdService, _hoadonService, _benhnhanService, _lichkhamService, _nguoidungService, _thuocService)
        {
        }
        
        // GET: NguoiDung
        public ActionResult Index()
        {
            if (Session["UserName"] == null)
            {
                return RedirectToAction("Login", "NguoiDung");
            }
            return View();
        }
        public ActionResult Login()
        {
            Session["UserName"] = null;
            Session["authentication"] = null;
            return View();
        }

        [AcceptVerbs(HttpVerbs.Post)]
        public ActionResult Login(string username, string password)
        {
            try
            {
                var status_code = HttpStatusCode.OK;
                var user = _nguoidungService.GetByAccount(username);
                if (user.pass == password)
                {
                    Session["UserName"] = user.username;
                    Session["authentication"] = user.ID_role;
                    return Json("Welcome");
                }
                else
                {
                    status_code = HttpStatusCode.InternalServerError;
                    return Json("Bad_request");
                }
            }
            catch(Exception e)
            {
                return Json(e.Message);
            }
        }
        public ActionResult LogOut()
        {
            Session.Clear();
            Response.Cookies["UserName"].Expires = DateTime.Now.AddYears(-10);
            Request.Cookies["UserName"].Expires = DateTime.Now.AddYears(-10);
            Response.Cookies.Remove("UserName");
            Request.Cookies.Remove("UserName");
            Request.Cookies.Clear();
            return RedirectToAction("Index", "Login");
        }

        [HttpPost]
        public JsonResult GetAll()
        {
            var data = new List<NguoiDungModel>();
            var result = _nguoidungService.GetAll().OrderBy(x => x.username).ToList();
            if (result.Count > 0)
            {
                foreach (NguoiDungEntities en in result)
                {
                    AutoMapper.Mapper.CreateMap<NguoiDungEntities, NguoiDungModel>();
                    var nd = AutoMapper.Mapper.Map<NguoiDungEntities, NguoiDungModel>(en);
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
        public JsonResult CreateOrUpDate(NguoiDungEntities Option)
        {
            var result = new HttpResponseMessage { StatusCode = HttpStatusCode.OK };
            try
            {
                if (_nguoidungService.GetByAccount(Option.username)!=null)
                {
                    Option.Date_Edited = DateTime.Now;
                    _nguoidungService.Update(Option);
                }
                else
                {
                    Option.Date_Created = DateTime.Now;
                    _nguoidungService.Create(Option);
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
        public JsonResult Delete(string username)
        {
            var result = new HttpResponseMessage { StatusCode = HttpStatusCode.OK };
            try
            {
                if (!string.IsNullOrEmpty(username) || !string.IsNullOrWhiteSpace(username))
                {
                    _nguoidungService.Delete(username);
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