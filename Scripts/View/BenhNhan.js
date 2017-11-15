angular.module('KendoDemos', ["kendo.directives", "ui-notification"]).controller("MyCtrl", function ($scope, Notification) {
    $scope.itemAdd = {};
    $scope.itemSearch = {};
    $("#datepicker").kendoDatePicker();
    var currentdate = new Date();
    var datetime = " Ngày: " + currentdate.getDate() + "/"
                    + (currentdate.getMonth() + 1) + "/"
                    + currentdate.getFullYear();
    var window = $("#windowConfirm").kendoWindow({
        title: "Xác nhận",
        visible: false,
        modal: true,
        width: "450px",
        height: "100px",
    }).data("kendoWindow");
    $scope.Data_KH = new kendo.data.DataSource({
        transport: {
            read: {
                url: '/BenhNhan/GetLoaiKH',
                dataType: 'json',
                contentType: 'application/json; charset=utf-8',
            }
        }
    })
    $scope.GioiTinh = new kendo.data.DataSource({
        transport: {
            read: {
                url: '/BenhNhan/GioiTinh',
                dataType: 'json',
                contentType: 'application/json; charset=utf-8',
            }
        }
    })
    $scope.ThemBenhNhan = function () {
        $scope.itemAdd.ten_BenhNhan="";
        $scope.itemAdd.gioi_Tinh="Nam";
        $scope.itemAdd.ngaySinh="";
        $scope.itemAdd.diaChi = "";
        $scope.itemAdd.SDT = "";
        $scope.itemAdd.ID_LoaiKhachHang;
        $("#CreateBenhNhan").kendoWindow({
            animation: true,
            width: "90%",
            height: "70%",
            title: "Cập Nhật Bệnh Nhân",
            modal: true,
            visible: false,
            resizable: false,
            actions: [
                 "Maximize",
                 "Close"
            ]
        }).data("kendoWindow").center().open();
    };
    $scope.btnHuy = function () {
        $("#CreateBenhNhan").kendoWindow({
            animation: true,
            width: "90%",
            height: "95%",
            title: "Cập Nhật Bệnh Nhân",
            modal: true,
            visible: false,
            resizable: false,
            actions: [
                "Maximize",
                "Close"
            ]
        }).data("kendoWindow").center().close();
    }
    /*Xu ly su kien luu thong tin*/
    $scope.btnLuu = function () {
        //$scope.itemAdd.ten_BenhNhan;
        //$scope.itemAdd.gioi_Tinh;
        //$scope.itemAdd.ngaySinh;
        //$scope.itemAdd.diaChi;
        //$scope.itemAdd.SDT = " ";
        //$scope.itemAdd.ID_LoaiKhachHang;
        //public int ID_BenhNhan { get; set; }
        //public string ten_BenhNhan { get; set; }
        //public string gioi_Tinh { get; set; }
        //public System.DateTime ngaySinh { get; set; }
        //public string diaChi { get; set; }
        //public string SDT { get; set; }
        //public int ID_LoaiKhachHang { get; set; } //Để lưu làm khách hàng tiềm năng hoặc khách hàng chính thức, những thằng gọi điện để đặt lịch khám thì default vẫn tạo một bệnh nhân ( khách hàng mới ) nhưng mặc định nó sẽ là khách hàng tiềm năng, còn khi nào khám rồi thì mới là khách hàng chính thức
        //public bool IsDelete { get; set; }
        //public Nullable<System.DateTime> Date_Created { get; set; }
        //public Nullable<System.DateTime> Date_Edited { get; set; }
        //if (IsEmty($scope.itemAdd.ID_LoaiKhachhang) === true)
        //{
        //    isError = true;
        //    errMsg = errMsg + "Vui lòng chọn giới tính\n";           
        //}
        var param = {};
        var isError = false;
        var errMsg = " ";
        param.ID_BenhNhan = $scope.itemAdd.ID_BenhNhan;
        var str_gt = $scope.itemAdd.gioi_Tinh;
        var ngaySinh = kendo.toString(kendo.parseDate($scope.itemAdd.ngaySinh, 'dd/MM/yyyy'), 'MM/dd/yyyy');
        if (IsEmpty($scope.itemAdd.ngaySinh) === false && kendo.toString(kendo.parseDate($scope.itemAdd.ngaySinh, 'dd/MM/yyyy'), 'dd/MM/yyyy') === null) {
            isError = true;
            errMsg = errMsg + "Ngày Tháng năm không đúng định dạng\n" + "<br>";
        }
        param.ngaySinh = ngaySinh;
        if (str_gt === null)
        {

            console.log(param.ngaySinh);
            isError = true;
            errMsg = errMsg + "Vui lòng chọn giới tính \n" + "<br>";

        }
        else {
            if ((str_gt.trim() != 'Nam' && str_gt.trim() != 'Nữ') || (str_gt.trim() == 'Nam' && str_gt.trim() == 'Nữ')) {
                //console.log(str_gt);
                isError = true;
                errMsg = errMsg + "Giới tính chỉ có thể là Nam hoặc Nữ /br" + "<br>";
            }
        }
        var str_dc = $scope.itemAdd.diaChi;
        if (str_dc.length > 100)
        {
            isError = true;
            errMsg = errMsg  + "Địa chỉ cho phép tối đa 100 ký tự \n"+ "<br>";
        }
        param.diaChi = $scope.itemAdd.diaChi;
        var str = $scope.itemAdd.ten_BenhNhan;
        if (IsEmpty(str.trim()===true)) {
            isError = true;
            errMsg = errMsg + "Vui lòng Nhập tên Bệnh Nhân \n" + "<br>";
        }
        else {

            if (str.length > 100) {
                isError = true;
                errMsg = errMsg + "Tên cho phép tối đa 100 ký tự \n" + "<br>";
            }
            if(str.length<2)
            {
                isError = true;
                errMsg = errMsg + "Tên bệnh nhân phải có ít nhất 2 ký tự" + "<br>";
            }
            else {
                if (!(/^[\s a-zA-Z\u00c0-\u1ef9]+$/).test(str)) {
                    //console.log(str);
                    isError = true;
                    errMsg = errMsg + "Tên không được có ký tự đặc biệt hoặc số\n" + "<br>";
                }
            }
        }
        param.ten_BenhNhan = $scope.itemAdd.ten_BenhNhan;
        param.gioi_Tinh = $scope.itemAdd.gioi_Tinh;
        
        if (!IsEmpty($scope.itemAdd.SDT)) {
            str_sdt = $scope.itemAdd.SDT;
            if (!(/^[0-9]+$/).test(str_sdt)) {
                //console.log(str);
                isError = true;
                errMsg = errMsg + "Số điện thoại không có ký tự đặc biệt hoặc chữ\n" + "<br>";
            }
            else {
               
                if (str_sdt.length > 11 || str_sdt.length < 9) {
                    isError = true;
                    errMsg = errMsg + "Số điện thoại không đúng\n" + "<br>";
                }
                else {
                    if (str_sdt.charAt(0) !== '0') {
                        isError = true;
                        errMsg = errMsg + "Số điện thoại không đúng định dạng\n" + "<br>";
                    }
                }
            }
        }
        param.SDT = $scope.itemAdd.SDT;
        if (isError === true) {
            Notification.error({ message: errMsg + "<br>", positionX: 'center', delay: 2000, modal: true });
            return;
        }
        $.ajax({
            url: '/BenhNhan/CreateOrUpdate',
            type: "post",
            data: JSON.stringify({ Option: param }),
            dataType: "json",
            contentType: "application/json; charset=utf-8",
            success: function (response) {
                if (response.StatusCode == 200) {
                    Notification.success({ message: "Hoàn Tất", positionX: 'center', delay: 2000, modal: true })
                    $("#CreateBenhNhan").kendoWindow({
                        animation: true,
                        width: "90%",
                        height: "95%",
                        title: "Cập Nhật Bệnh Nhân",
                        modal: true,
                        visible: false,
                        resizable: false,
                        actions: [
                            "Maximize",
                            "Close"
                        ]
                    }).data("kendoWindow").center().close();
                    $.ajax({
                        url: "/BenhNhan/GetAll",
                        dataType: "json",
                        contentType: "application/json; charset=utf-8",
                        success: function (response) {
                            $("#grid").data("kendoGrid").dataSource.data(response);
                            $("#grid").data("kendoGrid").dataSource.fetch();
                        }
                    })

                } else {
                    Notification.error({ message: "Có lỗi xảy ra " + response.ReasonPhrase, positionX: 'center', delay: 2000, modal: true });
                    return;
                }

            },
            error: function (xhr) {
                //Do Something to handle error
            }
        });
    }
    $("#grid").delegate(".k-grid-sua", "click", function (e) {
        var grid = $("#grid").data("kendoGrid");
        var param = grid.dataItem($(this).closest("tr"));
        //$scope.itemAdd.ten_BenhNhan;
        //$scope.itemAdd.gioi_Tinh;
        //$scope.itemAdd.ngaySinh = 0;
        //$scope.itemAdd.diaChi = 0;
        //$scope.itemAdd.SDT = " ";
        //$scope.itemAdd.ID_LoaiKhachHang;
        $scope.itemAdd.ten_BenhNhan = param.ten_BenhNhan;
        $scope.itemAdd.gioi_Tinh = param.gioi_Tinh;
        $scope.itemAdd.ngaySinh = param.ngaySinh;
        $scope.itemAdd.diaChi = param.diaChi;
        $scope.itemAdd.SDT = param.SDT;
        $scope.itemAdd.ID_LoaiKhachHang = param.ID_LoaiKhachHang;

        $scope.$apply();
        $("#CreateBenhNhan").kendoWindow({
            animation: true,
            width: "90%",
            height: "70%",
            title: "Cập Nhật Thuốc",
            modal: true,
            visible: false,
            resizable: false,
            actions: [
                 "Maximize",
                 "Close"
            ]
        }).data("kendoWindow").center().open();
    });
    $("#grid").delegate(".k-grid-xoa", "click", function (e) {
        var grid = $("#grid").data("kendoGrid");
        var item = grid.dataItem($(this).closest("tr"));
        $("#messageConfirm").html("Bạn có muốn xóa  <b>" + item.ten_BenhNhan + " ?");
        window.center().open();
        $("#yesButton").click(function () {
            if ($(this).hasClass("delete-confirm")) {
                $.ajax({
                    url: '/BenhNhan/Delete',
                    type: "post",
                    data: JSON.stringify({ id: item.ID_BenhNhan }),
                    dataType: "json",
                    contentType: "application/json; charset=utf-8",
                    success: function (response) {
                        if (response.StatusCode == 200) {
                            Notification.success({ message: "Hoàn Tất", positionX: 'center', delay: 2000, modal: true });
                            $.ajax({
                                url: "/BenhNhan/GetAll",
                                dataType: "json",
                                contentType: "application/json; charset=utf-8",
                                success: function (response) {
                                    $("#grid").data("kendoGrid").dataSource.data(response);
                                    $("#grid").data("kendoGrid").dataSource.fetch();
                                }
                            })
                        }
                        else {
                            Notification.error({ message: "Có lỗi xảy ra " + response.ReasonPhrase, positionX: 'center', delay: 2000, modal: true });
                            return;
                        }
                    }
                });
                window.close();
            }
        }).end();
        $("#noButton").click(function () {
            window.close();
        }).end();
    });
    var dataSource = new kendo.data.DataSource({
        type: "json",
        //serverSorting: true,
        serverFiltering: true,
        allowUnsort: true,
        serverPaging: true,
        transport: {
            read: {
                url: "/BenNhan/GetAll",
                type: "POST",
                dataType: "json",
                contentType: "application/json; charset=utf-8",
                cache: false
            },
            //parse Json, phai de thuc hien o day, de o tren operation se bao loi Json
            parameterMap: function (options, operation) {
                //if (operation == "read" || operation =="update") {
                //    return kendo.stringify(options);
                //}
                //Khong check operation o day vì sử dụng dạng Json nên phải Parse
                return kendo.stringify(options);
            }
        },

        autoSync: false,

        pageSize: 10,
        schema: {
            model: {
                id: "ID_BenhNhan",
                fields: {
                    ID_BenhNhan: { type: "number", editable: false },

                    ten_BenhNhan: {
                        type: "string", editable: true,
                        validation: { required: true },
                        //nullable: false
                    },
                    gioi_Tinh: { type: "string", editable: true },
                    ngaySinh: { type: "date", editable: true },
                    diaChi: {
                        type: "string",
                        validation: { required: true },
                        editable:true
                        //validation: { required: true },
                        //nullable: false
                    },
                    Date_Created: { type: "date", editable: false },
                    Date_Edited: { type: "date", editable: true },
                    ID_LoaiKhachHang: { type: "number", editable: true },
                    IsDelete: { type: "boolean", editable: false },
                    SDT: { type: "string", editable: false }
                }
            },
        },
    }
        );
    // var duanToolbarValue = 0;
    // var donviToolCanHoToolBar = 0;
    // // Init grid
    // var record = 0;
    $scope.mainGridOptions = {
        dataSource:
             {
                 type: "json",
                 pageSize: 10,
             },
        excel: {
            allPages: true
        },
        //dataSource: dataSource,
        scrollable:
             {
                 virtual: true
             },
        sortable: true,
        reorderable: true,
        groupable: false,
        resizable: true,
        height: 525,
        // pageable: true,
        filterable: $.MySc.filterable,
        columnMenu: $.MySc.columnMenu,
        pageable: $.MySc.pageable,
        columns:
            [{

                command: [
                    {
                        name: "sua", text: "", template: "<a class='k-button k-grid-sua' style='min-width: 0px !important;'><span class='glyphicon glyphicon-edit'></span></a>"
                    },
                      { name: "destroy", text: "", template: "<a class='k-button k-grid-xoa' style='min-width: 0px !important;'><span class='glyphicon glyphicon-remove'></span></a>" }], width: "80px",

                title: "Chức năng",
                width: "134px",
                //locked: true,
                //lockable: false,
                headerAttributes: {
                    "class": "table-header-cell",
                    style: "text-align: left; font-size: 14px;vertical-align: middle"
                },
                attributes: {
                    "class": "table-cell",
                    style: "text-align: left; font-size: 14px"
                }
            },

           {
               title: "STT", width: "58px",
               template: "<span class='row-number'></span>",
               filterable: false,
               //locked: true,
               headerAttributes: {
                   "class": "table-header-cell",
                   style: "text-align: left; font-size: 14px;vertical-align: middle"
               },
               attributes: {
                   "class": "table-cell",
                   style: "text-align: left; font-size: 14px"
               }
           },
            {
                field: "ten_BenhNhan", title: "tên bệnh nhân", width: "144px",
                //locked: true,
                //lockable: false,
                headerAttributes: {
                    "class": "table-header-cell",
                    style: "text-align: left; font-size: 14px;vertical-align: middle"
                },
                attributes: {
                    "class": "table-cell",
                    style: "text-align: left; font-size: 14px"
                }
            },
            {
                field: "gioi_Tinh", title: "giới tính", width: "124px",
                headerAttributes: {
                    "class": "table-header-cell",
                    style: "text-align: left; font-size: 14px;vertical-align: middle"
                },
                attributes: {
                    "class": "table-cell",
                    style: "text-align: left; font-size: 14px"
                }
            },
            {
                field: "ngaySinh", title: "Ngày sinh", width: "116px",
                format: "{0:dd/MM/yyyy}",
                template: "#=(ngaySinh == null) ? ' ' : kendo.toString(kendo.parseDate(ngaySinh, 'dd-MM-yyyy'), 'MM/dd/yyyy') #",
                headerAttributes: {
                    "class": "table-header-cell",
                    style: "text-align: left; font-size: 14px;vertical-align: middle"
                },
                attributes: {
                    "class": "table-cell",
                    style: "text-align: left; font-size: 14px"
                }
            },
            {
                field: "diaChi", title: "Địa chỉ", width: "272px",
                headerAttributes: {
                    "class": "table-header-cell",
                    style: "text-align: left; font-size: 14px;vertical-align: middle"
                },
                attributes: {
                    "class": "table-cell",
                    style: "text-align: left; font-size: 14px"
                }
            },
            {
                field: "SDT", title: "số điện thoại", width: "208px",
                //
                
                filterable: false,
                headerAttributes: {
                    "class": "table-header-cell",
                    style: "text-align: left; font-size: 14px;vertical-align: middle"
                },
                attributes: {
                    "class": "table-cell",
                    style: "text-align: left; font-size: 14px"
                }
            },
            ],
        dataBound: function () {
            var rows = this.items();
            $(rows).each(function () {
                var index = $(this).index() + 1
                + ($("#grid").data("kendoGrid").dataSource.pageSize() * ($("#grid").data("kendoGrid").dataSource.page() - 1));;
                var rowLabel = $(this).find(".row-number");

                $(rowLabel).html(index);
            });
        },
        // batch:true,
        // sortable: true,
        //   reorderable: true,
        //  groupable: false,
        //  resizable: true, autoBind: false,

        // filterable: $.MySc.filterable,
        // columnMenu: $.MySc.columnMenu,
        //pageable: $.MySc.pageable,


        autoBind: false,
        //save: function (e) {
        //    if (dvToolbarValue == "") {
        //        e.preventDefault();
        //        alert("Vui lòng chọn danh mục Dự Án trước.");
        //    }
        //},
        //edit: function (e) {
        //    e.container.find(".k-edit-label:eq(0)").hide();
        //    e.container.find(".k-edit-field:eq(0)").hide();
        //    if (e.model.isNew()) {
        //        e.model.set("DuAnID", dvToolbarValue);
        //        // alert(dvToolbarValue);
        //    } else {
        //        // $('input[name=MaLichThanhToan]').parent().html(e.model.MaLichThanhToan);

        //    }

        //}

    };
    $scope.detailGridOptions = function (dataItem) {
        return {
            dataSource: {
                type: "json",
                transport: {
                    read:
                    {
                        url: '/BenhAn/GetAll',
                        type: "POST",
                        dataType: "json",
                    },
                },
                serverPaging: true,
                serverSorting: true,
                serverFiltering: true,
                pageSize: 5,
                filter: { field: "ID_BenhNhan", operator: "eq", value: dataItem.ID_BenhNhan.toString() },
                schema: {
                    model: {
                        id: "ID_BenhAn",
                        fields: {
                            ID_BenhAn: { editable: false },
                            ID_BenhNhan: { editable: true },
                            TrieuChung: { editable: true, },
                            ChuanDoan: { editable: true },
                            ID_donThuoc: { editable: true },
                            ngayKham: { editable: true },
                            IsDelete: {  editable: false },
                            Date_Created: { editable: false },
                            Date_Edited: { editable: false },
                        }
                    }
                },
            },
            scrollable: false,
            sortable: true,
            pageable: true,
            columns: [
                {
                    title: "STT", width: "58px",
                    template: "<span class='row-number'></span>",
                    filterable: false,
                    locked: true,
                    headerAttributes: {
                        "class": "table-header-cell",
                        style: "text-align: left; font-size: 14px;vertical-align: middle"
                    },
                    attributes: {
                        "class": "table-cell",
                        style: "text-align: left; font-size: 14px"
                    }
                },
                {
                    field: "TrieuChung", title: "Triệu chứng", width: "272px",
                    headerAttributes: {
                        "class": "table-header-cell",
                        style: "text-align: left; font-size: 14px;vertical-align: middle"
                    },
                    attributes: {
                        "class": "table-cell",
                        style: "text-align: left; font-size: 14px"
                    }
                },
                {
                    field: "ChuanDoan", title: "Chuẩn đoán", width: "272px",
                    headerAttributes: {
                        "class": "table-header-cell",
                        style: "text-align: left; font-size: 14px;vertical-align: middle"
                    },
                    attributes: {
                        "class": "table-cell",
                        style: "text-align: left; font-size: 14px"
                    }
                },
                {
                    field: "ngayKham", title: "Ngày Khám Bệnh", width: "272px",
                    format: "{0:dd/MM/yyyy}",
                    template: "#=(ngayKham == null) ? ' ' : kendo.toString(kendo.parseDate(ngayKham, 'dd-MM-yyyy'), 'dd/MM/yyyy') #",
                    headerAttributes: {
                        "class": "table-header-cell",
                        style: "text-align: left; font-size: 14px;vertical-align: middle"
                    },
                    attributes: {
                        "class": "table-cell",
                        style: "text-align: left; font-size: 14px"
                    }
                },
            ]
        };
    };
    $scope.detailGridOptions_2 = function (dataItem) {
        return {
            dataSource: {
                type: "json",
                transport: {
                    read:
                    {
                        url: '/HoaDon/GetAll',
                                            type: "POST",
                                            dataType: "json",
                    },
                },
                serverPaging: true,
                serverSorting: true,
                serverFiltering: true,
                pageSize: 5,
                filter: { field: "ID_BenhNhan", operator: "eq", value: dataItem.ID_BenhNhan.toString() },
                model: {
                    id: "ID_HoaDon",
                    fields: {
                        ID_HoaDon: { editable: false },
                        ID_BenhNhan: { editable: true },
                        ID_LichKham: { editable: true, },
                        NgayLap: { editable: true },
                        GiaTriHoaDon: { editable: true },
                        IsDelete: { editable: false },
                        Date_Created: { editable: false },
                        Date_Edited: { editable: false },
                    }
                }
            },
            scrollable: false,
            sortable: true,
            pageable: true,
            columns: [
                {
                    title: "STT", width: "58px",
                    template: "<span class='row-number'></span>",
                    filterable: false,
                    locked: true,
                    headerAttributes: {
                        "class": "table-header-cell",
                        style: "text-align: left; font-size: 14px;vertical-align: middle"
                    },
                    attributes: {
                        "class": "table-cell",
                        style: "text-align: left; font-size: 14px"
                    }
                },
                {
                    field: "NgayLap", title: "Ngày Lập Hóa Đơn", width: "272px",
                    headerAttributes: {
                        "class": "table-header-cell",
                        style: "text-align: left; font-size: 14px;vertical-align: middle"
                    },
                    attributes: {
                        "class": "table-cell",
                        style: "text-align: left; font-size: 14px"
                    }
                },
                {
                    field: "GiaTriHoaDon", title: "Giá Trị hóa đơn", width: "272px",
                    headerAttributes: {
                        "class": "table-header-cell",
                        style: "text-align: left; font-size: 14px;vertical-align: middle"
                    },
                    attributes: {
                        "class": "table-cell",
                        style: "text-align: left; font-size: 14px"
                    }
                },
            ]
        };
    };   
    $scope.LocBenhNhan = function () {
        var TenLoaiThuoc = " ";
        if (!IsEmpty($scope.itemSearch.LoaiThuoc)) {
            TenLoaiThuoc = $scope.itemSearch.LoaiThuoc;
        }
        var TenThuoc = " ";
        if (!IsEmpty($scope.itemSearch.Thuoc)) {
            TenThuoc = $scope.itemSearch.Thuoc;
        }
        if (TenLoaiThuoc == " ") {
            grid.data("kendoGrid").dataSource.filter({});
        }
        else {
            if (TenThuoc == " ") {
                grid.data("kendoGrid").dataSource.filter({ field: "TenLoaiThuoc", operator: "eq", value: TenLoaiThuoc });
            }
            else {
                grid.data("kendoGrid").dataSource.filter({
                    logic: "and",
                    filters: [
                        { field: "TenLoaiThuoc", operator: "eq", value: TenLoaiThuoc },
                        { field: "TenThuoc", operator: "eq", value: TenThuoc },
                    ],
                });
            }
        }

    }
    $scope.ExportExcel = function () {
        var rows = [
   {
       cells: [
         { value: "Phòng Mạch", colSpan: 9, index: 0, bold: true, borderLeft: { color: "#000000", size: 1 }, borderRight: { color: "#000000", size: 1 }, borderTop: { color: "#000000", size: 1 }, borderBottom: { color: "#000000", size: 1 }, },
       ],
   },
   {
       cells: [
         //Cac cot trong excel
         { value: "STT", rowSpan: 2, bold: true, background: "#bbff33", borderLeft: { color: "#000000", size: 1 }, borderRight: { color: "#000000", size: 1 }, borderTop: { color: "#000000", size: 1 }, borderBottom: { color: "#000000", size: 1 }, },
         { value: "Tên Thuốc", rowSpan: 2, bold: true, background: "#bbff33", borderLeft: { color: "#000000", size: 1 }, borderRight: { color: "#000000", size: 1 }, borderTop: { color: "#000000", size: 1 }, borderBottom: { color: "#000000", size: 1 }, },
         { value: "Loại Thuốc", rowSpan: 2, bold: true, background: "#bbff33", borderLeft: { color: "#000000", size: 1 }, borderRight: { color: "#000000", size: 1 }, borderTop: { color: "#000000", size: 1 }, borderBottom: { color: "#000000", size: 1 }, },
         { value: "Số Lượng Tồn", rowSpan: 2, bold: true, background: "#bbff33", borderLeft: { color: "#000000", size: 1 }, borderRight: { color: "#000000", size: 1 }, borderTop: { color: "#000000", size: 1 }, borderBottom: { color: "#000000", size: 1 }, },
         { value: "Đơn Giá", rowSpan: 2, bold: true, background: "#bbff33", borderLeft: { color: "#000000", size: 1 }, borderRight: { color: "#000000", size: 1 }, borderTop: { color: "#000000", size: 1 }, borderBottom: { color: "#000000", size: 1 }, },
         { value: "Ghi chú", rowSpan: 2, bold: true, background: "#bbff33", borderLeft: { color: "#000000", size: 1 }, borderRight: { color: "#000000", size: 1 }, borderTop: { color: "#000000", size: 1 }, borderBottom: { color: "#000000", size: 1 }, },
       ],
   }, ];
        var data = $("#grid").data("kendoGrid").dataSource.data();
        for (var i = 0; i < data.length; i++) {
            if (data[i].ID_Thuoc != null) {
                var cells;
                var tenThuoc = data[i].tenThuoc;
                var SoLuongTon = data[i].SoLuongTon;
                var DonGia = data[i].DonGia;
                var LoaiThuoc = data[i].TenLoaiThuoc;
                var GhiChu = data[i].GhiChu;
                cells = [
                { value: i + 1 },
                { value: tenThuoc },
                { value: LoaiThuoc },
                { value: SoLuongTon },
                { value: DonGia },
                { value: GhiChu },
                ]
                rows.push({
                    cells: cells
                })
            }

        }
        var workbook = new kendo.ooxml.Workbook({
            sheets: [
              {
                  frozenColumns: 3,
                  frozenRows: 2,
                  columns: [
                    // Column settings (width)
                    { width: 30 },
                    { autoWidth: true },
                    { autoWidth: true },
                    { autoWidth: true },
                    { autoWidth: true },
                    { autoWidth: true },
                  ],
                  // Title of the sheet
                  title: "Orders",
                  // Rows of the sheet
                  rows: rows
              }
            ]
        });
        //save the file as Excel file with extension xlsx
        kendo.saveAs({ dataURI: workbook.toDataURL(), fileName: "Thuốc" + datetime + ".xlsx" });
    };
    // var dvToolbarValue;
    // $("#DuAnToolBar").kendoComboBox({
    //     dataTextField: "Ten_Duan",
    //     dataValueField: "Duan_ID",
    //     //autoBind: false,
    //     placeholder: "Nhập và chọn dự án",
    //     suggest: true,
    //     filter: "contains",
    //     dataSource: $scope.dataDuAn,
    //     //dataBound: function (e) {
    //     //    //$("#DonViToolBar").data("kendoComboBox");
    //     //    //Lay gia tri dau tien trong commbo
    //     //    this.select(0);
    //     //    var value = this.value();
    //     //    //alert(value);
    //     //    grid.data("kendoGrid").dataSource.filter({ field: "MaDv", operator: "eq", value: value });
    //     //    dvToolbarValue = value;//set gia tri de kiem tra co selected DonVitoolbar chua
    //     //},
    //     change: function () {
    //         var value = this.value();
    //         dvToolbarValue = this.value();
    //         if (value) {
    //             //Dung de filter cho GRID
    //             grid.data("kendoGrid").dataSource.filter({ field: "Duan_ID", operator: "eq", value: value });

    //         } else {
    //             grid.data("kendoGrid").dataSource.filter({});
    //         }

    //     }
    // });
    // $scope.dataCanHoByID = {
    //     transport: {
    //         read: {
    //             url: "/DanhMuc/GetCanHoByDuAnAndBlock",
    //             dataType: "json",
    //             contentType: "application/json; charset=utf-8",
    //             data: function () {
    //                 var IDDuAn = -1;
    //                 var IDBlock = -1;
    //                 return {
    //                     IDDuAn: IDDuAn,
    //                     IDBlock: IDBlock
    //                 }
    //             },
    //         }
    //     }
    // }
    // $scope.dataBlock = {
    //     transport: {
    //         read: {
    //             url: "/DanhMuc/GetBlockAllIDDuAn",
    //             data: function () {
    //                 var IDDuAn = -1;

    //                 return {
    //                     IDDuAn: IDDuAn
    //                 }
    //             },
    //             dataType: "json",
    //             contentType: "application/json; charset=utf-8",
    //         }
    //     }
    // };
    // $scope.dataTang = {
    //     transport: {
    //         read: {
    //             url: "/DanhMuc/GetTangByDuAnAndBlock",
    //             data: function () {
    //                 var IDDuAn = -1;
    //                 var IDBlock = -1;
    //                 return {
    //                     IDDuAn: IDDuAn,
    //                     IDBlock: IDBlock
    //                 }
    //             },
    //             dataType: "json",
    //             contentType: "application/json; charset=utf-8",
    //         }
    //     }
    // };
    // $scope.LocDanhSachYeuCau = function () {
    //     var IDDuan = -1;
    //     if (!IsEmpty($scope.itemSearch.IDDuan)) {
    //         IDDuan = $scope.itemSearch.IDDuan;
    //     }
    //     var IDBlock = -1;
    //     var MaBlock = "";
    //     if (!IsEmpty($scope.itemSearch.Block)) {
    //         IDBlock = $scope.itemSearch.Block;
    //     }
    //     var IDCanHo = -1;
    //     if (!IsEmpty($scope.itemSearch.CanHo)) {
    //         IDCanHo = $scope.itemSearch.CanHo;
    //     }
    //     if (IDDuan == -1) {
    //         grid.data("kendoGrid").dataSource.filter({});
    //     }
    //     else {
    //         if (IDBlock == -1) {
    //             grid.data("kendoGrid").dataSource.filter({ field: "Duan_ID", operator: "eq", value: IDDuan });
    //         }
    //         else {
    //             if (IDCanHo == -1) {
    //                 $.ajax({
    //                     url: "/YeuCauKhachHang/getBlockNameByID",
    //                     type: "post",
    //                     data: JSON.stringify({ Block_ID: IDBlock }),
    //                     dataType: "json",
    //                     contentType: "application/json; charset=utf-8",
    //                     success: function (response) {
    //                         console.log(response);
    //                         grid.data("kendoGrid").dataSource.filter({
    //                             logic: "and",
    //                             filters: [
    //                                 { field: "Duan_ID", operator: "eq", value: IDDuan },
    //                                 { field: "MaBlock", operator: "eq", value: response },
    //                             ],
    //                         });

    //                     }
    //                 })
    //             }
    //             else {
    //                 console.log(IDCanHo);
    //                 grid.data("kendoGrid").dataSource.filter({
    //                     logic: "and",
    //                     filters: [
    //                         { field: "Duan_ID", operator: "eq", value: IDDuan },
    //                         { field: "MaCanHo", operator: "eq", value: IDCanHo },
    //                     ],
    //                 });
    //             }
    //         }

    //     }
    // }
    // ////$.ajax({
    // ////    url: "/DanhMuc/GetCanHoByDuAnAndBlock",
    // ////    type: "post",
    // ////    data: JSON.stringify({ IDDuAn: IDDuan, IDBlock: IDBlock }),
    // ////    dataType: "json",
    // ////    contentType: "application/json; charset=utf-8",
    // ////    success: function (response) {
    // ////        $("#gridMain").data("kendoGrid").dataSource.data(response);
    // ////        $("#gridMain").data("kendoGrid").dataSource.fetch();
    // ////    }
    // ////});


    // $("#BlockToolBar").kendoComboBox({
    //     dataTextField: "MaBlock",
    //     dataValueField: "MaBlock",
    //     //autoBind: false,
    //     placeholder: "Nhập và chọn Block",
    //     suggest: true,
    //     filter: "contains",
    //     dataSource: $scope.dataChiTietBlock,
    //     change: function () {
    //         var value = this.value();
    //         dvToolbarValue = this.value();
    //         if (value) {
    //             //Dung de filter cho GRID
    //             grid.data("kendoGrid").dataSource.filter({ field: "MaBlock", operator: "eq", value: value });

    //         } else {
    //             grid.data("kendoGrid").dataSource.filter({});
    //         }

    //     }
    // });
    // $("#TangToolBar").kendoComboBox({
    //     dataTextField: "Ten_Duan",
    //     dataValueField: "Duan_ID",
    //     placeholder: "Nhập và chọn dự án",
    //     suggest: true,
    //     filter: "contains",
    //     dataSource: $scope.dataChiTiet,
    //     change: function () {
    //         var value = this.value();
    //         dvToolbarValue = this.value();
    //         if (value) {
    //             //Dung de filter cho GRID
    //             grid.data("kendoGrid").dataSource.filter({
    //                 field: "Duan_ID", operator: "eq", value: value
    //             });

    //         } else {
    //             grid.data("kendoGrid").dataSource.filter({
    //             });
    //         }

    //     }
    // });
    $.ajax({
        url: "/BenhNhan/GetAll",
        type: "post",
        dataType: "json",
        contentType: "application/json; charset=utf-8",
        success: function (response) {
            $("#grid").data("kendoGrid").dataSource.data(response);
            $("#grid").data("kendoGrid").dataSource.fetch();
        }
    });
    // grid.find("#CanHoToolBar").kendoComboBox({
    //     dataTextField: "Ten_Duan",
    //     dataValueField: "Duan_ID",
    //     //autoBind: false,
    //     placeholder: "Nhập và chọn dự án",
    //     suggest: true,
    //     filter: "contains",
    //     dataSource: $scope.dataDuAn,
    //     //dataBound: function (e) {
    //     //    //$("#DonViToolBar").data("kendoComboBox");
    //     //    //Lay gia tri dau tien trong commbo
    //     //    this.select(0);
    //     //    var value = this.value();
    //     //    //alert(value);
    //     //    grid.data("kendoGrid").dataSource.filter({ field: "MaDv", operator: "eq", value: value });
    //     //    dvToolbarValue = value;//set gia tri de kiem tra co selected DonVitoolbar chua
    //     //},
    //     change: function () {
    //         var value = this.value();
    //         dvToolbarValue = this.value();
    //         if (value) {
    //             //Dung de filter cho GRID
    //             grid.data("kendoGrid").dataSource.filter({ field: "DuAnID", operator: "eq", value: value });

    //         } else {
    //             grid.data("kendoGrid").dataSource.filter({});
    //         }
    //     }
    // });
    $scope.ImportExcel = function () {
        $("#windowImport").kendoWindow({
            animation: true,
            width: "60%",
            height: "15%",
            title: "Nhập Dữ Liệu Từ Excel",
            modal: true,
            scrollable: false,
            visible: false,
            actions: [
                "Maximize",
                "Close"
            ]
        }).data("kendoWindow").center().open();
    }

    // $scope.selectFileImportYeuCau = function (e) {
    //     var files = e.files
    //     var acceptedFiles = [".xls", ".xlsx"]

    //     var isAcceptedImageFormat = ($.inArray(files[0].extension, acceptedFiles)) != -1

    //     if (!isAcceptedImageFormat) {
    //         e.preventDefault();
    //         //  alert("");
    //         Notification.warning({ message: "File must be .xls or .xlsx", positionX: 'center', delay: 1000 });
    //         return;
    //     }
    //     if (e.files.length > 1) {
    //         // alert("Please select only 1 file.");
    //         Notification.warning({ message: "Please select only 1 file.", positionX: 'center', delay: 1000 });
    //         return;
    //         e.preventDefault();
    //     }
    //     // var message = $.map(e.files, function (file) { return file.name; }).join(", ");

    // }


    // $scope.uploadSuccessImportYeuCau = function (e) {
    //     // var imageName = e.response.ImageName;
    //     //console.log(e.response);
    //     //  $scope.itemAdd.HinhAnh =$scope.DefaultPath+imageName;
    //     if (e.response.IsSuccess == false) {
    //         Notification.success({ message: "Import có lỗi", positionX: 'center', delay: 2000, modal: true });

    //         $("#gridImportYeuCau").data("kendoGrid").dataSource.data(e.response.listErr);
    //         $("#gridImportYeuCau").data("kendoGrid").dataSource.fetch();
    //     } else {
    //         Notification.success({ message: "Import thành công", positionX: 'center', delay: 2000, modal: true });
    //         $.ajax({
    //             url: "/YeuCauKhachHang/GetAll",
    //             type: "post",
    //             dataType: "json",
    //             contentType: "application/json; charset=utf-8",
    //             success: function (response) {
    //                 $("#grid").data("kendoGrid").dataSource.data(response);
    //                 $("#grid").data("kendoGrid").dataSource.fetch();
    //             }
    //         });
    //         $("#windowImportYeuCau").data("kendoWindow").close();
    //     }
    //     // $scope.$apply();
    //     //$("#windowImportCanHo").data("kendoWindow").close();
    // }
    // $scope.gridYeuCauImportOption = {
    //     dataSource: {
    //         autoSync: true,
    //         pageSize: 10
    //     },

    //     scrollable: false,
    //     sortable: true,
    //     reorderable: true,
    //     groupable: false,
    //     resizable: true,
    //     columns: [
    //     {
    //         field: "YeuCau_ID", title: "STT", width: "90px",
    //         filterable: false,
    //         locked: true,
    //         headerAttributes: {
    //             "class": "table-header-cell",
    //             style: "text-align: left; font-size: 14px;vertical-align: middle"
    //         },
    //         attributes: {
    //             "class": "table-cell",
    //             style: "text-align: left; font-size: 14px"
    //         }
    //     },
    //         {
    //             field: "TenDuAn", title: "Dự án", width: "90px",
    //             locked: true,
    //             lockable: false,
    //             editor: Duan_editor,
    //             filterable:
    //                 {
    //                     ui: Duan_Filter
    //                 },
    //             headerAttributes: {
    //                 "class": "table-header-cell",
    //                 style: "text-align: left; font-size: 14px;vertical-align: middle"
    //             },
    //             attributes: {
    //                 "class": "table-cell",
    //                 style: "text-align: left; font-size: 14px"
    //             }
    //         },
    //         {
    //             field: "MaCanHo", title: "Căn hộ", width: "90px",
    //             locked: true,
    //             lockable: false,
    //             filterable:
    //                 {
    //                     ui: CanHo_Filter
    //                 },
    //             editor: CanHo_editor,
    //             headerAttributes: {
    //                 "class": "table-header-cell",
    //                 style: "text-align: left; font-size: 14px;vertical-align: middle"
    //             },
    //             attributes: {
    //                 "class": "table-cell",
    //                 style: "text-align: left; font-size: 14px"
    //             }
    //         },
    //        {
    //            field: "NoiDung_YC", title: "Nội dung yêu cầu", width: "250px",
    //            filterable: false,
    //            headerAttributes: {
    //                "class": "table-header-cell",
    //                style: "text-align: left; font-size: 14px;vertical-align: middle"
    //            },
    //            attributes: {
    //                "class": "table-cell",
    //                style: "text-align: left; font-size: 14px"
    //            }
    //        },
    //         {
    //             field: "NgayKH_Yeucau", title: "NGÀY KH YÊU CẦU", width: "200px",
    //             format: "{0:dd/MM/yyyy}",
    //             template: "#= (NgayKH_Yeucau == null) ? ' ' : kendo.toString(kendo.parseDate(NgayKH_Yeucau, 'dd/MM/yyyy'), 'dd/MM/yyyy')  #",
    //             filterable: false,
    //             headerAttributes: {
    //                 "class": "table-header-cell",
    //                 style: "text-align: left; font-size: 14px;vertical-align: middle"
    //             },
    //             attributes: {
    //                 "class": "table-cell",
    //                 style: "text-align: left; font-size: 14px"
    //             }
    //         },
    //           {
    //               field: "NgayTiepNhan", title: "NGÀY TIẾP NHẬN", format: "{0:dd/MM/yyyy}", width: "200px",
    //               template: "#= (NgayTiepNhan == null) ? ' ' : kendo.toString(kendo.parseDate(NgayTiepNhan, 'dd/MM/yyyy'), 'dd/MM/yyyy')  #",
    //               filterable: false,
    //               headerAttributes: {
    //                   "class": "table-header-cell",
    //                   style: "text-align: left; font-size: 14px;vertical-align: middle"
    //               },
    //               attributes: {
    //                   "class": "table-cell",
    //                   style: "text-align: left; font-size: 14px"
    //               }

    //           },
    //           {
    //               title: "KHỐI THIẾT KẾ",
    //               headerAttributes: {
    //                   "class": "table-header-cell",
    //                   style: "text-align: left; font-size: 14px;vertical-align: middle"
    //               },
    //               attributes: {
    //                   "class": "table-cell",
    //                   style: "text-align: left; font-size: 14px"
    //               },
    //               columns:
    //                   [
    //                                            {
    //                                                field: "NgayKTK_PhatHanh", title: "Ngày phát hành", format: "{0:dd/MM/yyyy}", width: "200px",
    //                                                template: "#= (NgayKTK_PhatHanh == null) ? ' ' : kendo.toString(kendo.parseDate(NgayTiepNhan, 'dd/MM/yyyy'), 'dd/MM/yyyy')  #"
    //                                                ,
    //                                                filterable: false,
    //                                                headerAttributes: {
    //                                                    "class": "table-header-cell",
    //                                                    style: "text-align: left; font-size: 14px;vertical-align: middle"
    //                                                },
    //                                                attributes: {
    //                                                    "class": "table-cell",
    //                                                    style: "text-align: left; font-size: 14px"
    //                                                }
    //                                            },
    //                                              {
    //                                                  field: "BanveDieuchinh", title: "Bản vẽ điều chỉnh", width: "200px",
    //                                                  filterable: false,
    //                                                  headerAttributes: {
    //                                                      "class": "table-header-cell",
    //                                                      style: "text-align: left; font-size: 14px;vertical-align: middle"
    //                                                  },
    //                                                  attributes: {
    //                                                      "class": "table-cell",
    //                                                      style: "text-align: left; font-size: 14px"
    //                                                  }
    //                                              },
    //                   ]
    //           },
    //            {
    //                title: "PHÒNG DỰ TOÁN",
    //                headerAttributes: {
    //                    "class": "table-header-cell",
    //                    style: "text-align: left; font-size: 14px;vertical-align: middle"
    //                },
    //                attributes: {
    //                    "class": "table-cell",
    //                    style: "text-align: left; font-size: 14px"
    //                },
    //                columns:
    //                    [
    //                                             {
    //                                                 field: "NgayPDT_PhatHanh", title: "Ngày phát hành", format: "{0:dd/MM/yyyy}", width: "200px",
    //                                                 template: "#= (NgayPDT_PhatHanh == null) ? ' ' : kendo.toString(kendo.parseDate(NgayPDT_PhatHanh, 'dd/MM/yyyy'), 'dd/MM/yyyy')  #",
    //                                                 filterable: false,
    //                                                 headerAttributes: {
    //                                                     "class": "table-header-cell",
    //                                                     style: "text-align: left; font-size: 14px;vertical-align: middle"
    //                                                 },
    //                                                 attributes: {
    //                                                     "class": "table-cell",
    //                                                     style: "text-align: left; font-size: 14px"
    //                                                 }

    //                                             },
    //                                               {
    //                                                   field: "PDT_Dieuchinh", title: "Chi tiết điều chỉnh", width: "200px",
    //                                                   filterable: false,
    //                                                   headerAttributes: {
    //                                                       "class": "table-header-cell",
    //                                                       style: "text-align: left; font-size: 14px;vertical-align: middle"
    //                                                   },
    //                                                   attributes: {
    //                                                       "class": "table-cell",
    //                                                       style: "text-align: left; font-size: 14px"
    //                                                   }
    //                                               },
    //                    ]
    //            },
    //             {
    //                 field: "NgayPHTB_KH", title: "NGÀY PHÁT HÀNH THÔNG BÁO KH", format: "{0:dd/MM/yyyy}", width: "200px",
    //                 template: "#= (NgayPHTB_KH == null) ? ' ' : kendo.toString(kendo.parseDate(NgayPHTB_KH, 'dd/MM/yyyy'), 'dd/MM/yyyy')  #",
    //                 filterable: false,
    //                 headerAttributes: {
    //                     "class": "table-header-cell",
    //                     style: "text-align: left; font-size: 14px;vertical-align: middle"
    //                 },
    //                 attributes: {
    //                     "class": "table-cell",
    //                     style: "text-align: left; font-size: 14px"
    //                 }

    //             },
    //              {
    //                  field: "NgayPhuLuc_HD", title: "NGÀY KÝ PHỤ LỤC HỢP ĐỒNG", format: "{0:dd/MM/yyyy}", width: "200px",
    //                  template: "#= (NgayPhuLuc_HD == null) ? ' ' : kendo.toString(kendo.parseDate(NgayPhuLuc_HD, 'dd/MM/yyyy'), 'dd/MM/yyyy')  #",
    //                  filterable: false,
    //                  headerAttributes: {
    //                      "class": "table-header-cell",
    //                      style: "text-align: left; font-size: 14px;vertical-align: middle"
    //                  },
    //                  attributes: {
    //                      "class": "table-cell",
    //                      style: "text-align: left; font-size: 14px"
    //                  }

    //              },
    //               {
    //                   field: "NgayPHTB_QLDA", title: "NGÀY PHÁT HÀNH THÔNG BÁO ĐẾN BAN QLDA", format: "{0:dd/MM/yyyy}", width: "200px",
    //                   template: "#= (NgayPHTB_QLDA == null) ? ' ' : kendo.toString(kendo.parseDate(NgayPHTB_QLDA, 'dd/MM/yyyy'), 'dd/MM/yyyy')  #",
    //                   filterable: false,
    //                   headerAttributes: {
    //                       "class": "table-header-cell",
    //                       style: "text-align: left; font-size: 14px;vertical-align: middle"
    //                   },
    //                   attributes: {
    //                       "class": "table-cell",
    //                       style: "text-align: left; font-size: 14px"
    //                   }
    //               },
    //                {
    //                    field: "NgayThiCong", title: "NGÀY PHÁT HÀNH HỒ SƠ THIẾT KẾ THI CÔNG", format: "{0:dd/MM/yyyy}", width: "200px",
    //                    template: "#= (NgayThiCong == null) ? ' ' : kendo.toString(kendo.parseDate(NgayThiCong, 'dd/MM/yyyy'), 'dd/MM/yyyy')  #",
    //                    filterable: false,
    //                    headerAttributes: {
    //                        "class": "table-header-cell",
    //                        style: "text-align: left; font-size: 14px;vertical-align: middle"
    //                    },
    //                    attributes: {
    //                        "class": "table-cell",
    //                        style: "text-align: left; font-size: 14px"
    //                    }

    //                },
    //                {
    //                    field: "NgayBanGiao", title: "NGÀY PHÁT HÀNH HỒ SƠ THIẾT KẾ THI CÔNG", format: "{0:dd/MM/yyyy}", width: "200px",
    //                    template: "#= (NgayBanGiao == null) ? ' ' : kendo.toString(kendo.parseDate(NgayBanGiao, 'dd/MM/yyyy'), 'dd/MM/yyyy')  #",
    //                    filterable: false,
    //                    headerAttributes: {
    //                        "class": "table-header-cell",
    //                        style: "text-align: left; font-size: 14px;vertical-align: middle"
    //                    },
    //                    attributes: {
    //                        "class": "table-cell",
    //                        style: "text-align: left; font-size: 14px"
    //                    }
    //                }, ]
    // }
})