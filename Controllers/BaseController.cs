using PhongMach_Ver_1._0.Services;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace PhongMach_Ver_1._0.Web.Controllers
{
    public class BaseController : Controller
    {
        public readonly IBenhAnService _benhanService;
        public readonly ICTDTService _ctdtService;
        public readonly ICTHDService _cthdService;
        public readonly IDInhNghiaGiaTriService _dngtService;
        public readonly IDonThuocService _donthuocService;
        public readonly IGiaTriMacDinhService _gtmdService;
        public readonly IHoaDonService _hoadonService;
        public readonly IBenhNhanService _benhnhanService;
        public readonly ILichKhamService _lichkhamService;
        public readonly INguoiDungService _nguoidungService;
        public readonly IThuocService _thuocService;

        public BaseController(IBenhAnService _benhanService,
            ICTDTService _ctdtService,
            ICTHDService _cthdService,
            IDInhNghiaGiaTriService _dngtService,
            IDonThuocService _donthuocService,
            IGiaTriMacDinhService _gtmdService,
            IHoaDonService _hoadonService,
            IBenhNhanService _benhnhanService,
            ILichKhamService _lichkhamService,
            INguoiDungService _nguoidungService,
            IThuocService _thuocService)
        {
              this._benhanService=  _benhanService;
              this._ctdtService=  _ctdtService;
              this._cthdService = _cthdService;
              this._dngtService =_dngtService;
              this._donthuocService = _donthuocService;
              this._gtmdService = _gtmdService;
              this._hoadonService = _hoadonService;
              this._benhnhanService = _benhnhanService;
              this._lichkhamService = _lichkhamService;
              this._nguoidungService = _nguoidungService;
              this._thuocService = _thuocService;
        }
    }
}