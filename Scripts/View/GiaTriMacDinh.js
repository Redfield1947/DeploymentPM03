angular.module('KendoDemos', ["kendo.directives", "ui-notification"]).controller("MyCtrl", function ($scope, Notification) {
    $scope.itemAdd = {};
    $scope.itemSearch = {};
    var currentdate = new Date();
    var datetime = " Ngày: " + currentdate.getDate() + "/"
                    + (currentdate.getMonth() + 1) + "/"
                    + currentdate.getFullYear();
    //var window = $("#windowConfirm").kendoWindow({
    //    title: "Xác nhận",
    //    visible: false,
    //    modal: true,
    //    width: "450px",
    //    height: "100px",
    //}).data("kendoWindow");
    $scope.GhiChu = new kendo.data.DataSource({
        transport: {
            read: {
                url: '/GiaTriMacDinh/GetAllGiaTri',
                dataType: 'json',
                contentType: 'application/json; charset=utf-8',
            }
        }
    })
    $scope.GhiChu = new kendo.data.DataSource({
        transport: {
            read: {
                url: "/GiaTriMacDinh/GetAll",
                dataType: "json",
                contentType: "application/json; charset=utf-8",
                type: 'POST'
            }
        }
    });
    /*set ng-click event for button Them moi*/
    $scope.ThemGiaTri = function () {
        //$scope.itemAdd.LoaiThuoc = -1;
        //$scope.itemAdd.Thuoc = " ";
        //$scope.itemAdd.SoLuong = 0;
        //$scope.itemAdd.DonGia = 0;
        //$scope.itemAdd.GhiChu = " ";
        $("#CreateGiaTriMacDinh").kendoWindow({
            animation: true,
            width: "90%",
            height: "50%",
            title: "Cập Nhật Giá Trị Mặc Định",
            modal: true,
            visible: false,
            resizable: false,
            actions: [
                 "Maximize",
                 "Close"
            ]
        }).data("kendoWindow").center().open();
    };
    //$scope.btnHuy = function () {
    //    $("#windowYeuCauChiTiet").kendoWindow({
    //        animation: true,
    //        width: "90%",
    //        height: "95%",
    //        title: "Khai báo yêu cầu Khách Hàng",
    //        modal: true,
    //        visible: false,
    //         resizable: false,
    //         actions: [
    //             "Maximize",
    //             "Close"
    //         ]
    //     }).data("kendoWindow").center().close();
    // }
    // /*Xu ly su kien luu thong tin*/
    // $scope.btnLuu = function () {
    //     var param = {};
    //     var isError = false;
    //     var errMsg = "";
    //     param.YeuCau_ID = $scope.itemAdd.YeuCau_ID;
    //     //param.Duan_ID = $scope.itemAdd.Duan_ID;
    //     if (IsEmpty($scope.itemAdd.Duan_ID) === true) {
    //         isError = true;
    //         errMsg = errMsg + "Vui lòng chọn dự án.\n";
    //     }
    //     param.Duan_ID = $scope.itemAdd.Duan_ID;
    //     if (IsEmpty($scope.itemAdd.CanHo_ID) === true) {
    //         isError = true;
    //         errMsg = errMsg + "Vui lòng chọn căn hộ.\n";
    //     }
    //     param.CanHo_ID = $scope.itemAdd.CanHo_ID;
    //     if (IsEmpty($scope.itemAdd.NoiDung_YC) === true) {
    //         isError = true;
    //         errMsg = errMsg + "Vui lòng nhập thông tin yêu cầu.\n";
    //     }
    //     param.NoiDung_YC = $scope.itemAdd.NoiDung_YC;
    //     param.BanVeDieuChinh = $scope.itemAdd.BanVeDieuChinh;
    //     param.PDT_Dieuchinh = $scope.itemAdd.PDT_Dieuchinh;
    //     param.GhiChu = $scope.itemAdd.GhiChu;
    //     if (IsEmpty($scope.itemAdd.NgayKH_Yeucau) === true || kendo.toString(kendo.parseDate($scope.itemAdd.NgayKH_Yeucau, 'dd/MM/yyyy'), 'dd/MM/yyyy') === null) {
    //         isError = true;
    //         errMsg = errMsg + "Vui lòng nhập ngày yêu cầu.\n";
    //     }
    //     param.NgayKH_Yeucau = $scope.itemAdd.NgayKH_Yeucau;
    //     if (IsEmpty($scope.itemAdd.NgayPHHoSo_TKTC) === false && kendo.toString(kendo.parseDate($scope.itemAdd.NgayPHHoSo_TKTC, 'dd/MM/yyyy'), 'dd/MM/yyyy') === null) {
    //         isError = true;
    //         errMsg = errMsg + "Ngày Thiết kế thi công không hợp lệ.\n";
    //     }
    //     param.NgayPHHoSo_TKTC = $scope.itemAdd.NgayPHHoSo_TKTC;
    //     if (IsEmpty($scope.itemAdd.NgayTiepNhan) === false && kendo.toString(kendo.parseDate($scope.itemAdd.NgayTiepNhan, 'dd/MM/yyyy'), 'dd/MM/yyyy') === null) {
    //         isError = true;
    //         errMsg = errMsg + "Vui lòng nhập ngày tiếp nhận\n";
    //     }
    //     param.NgayTiepNhan = $scope.itemAdd.NgayTiepNhan;
    //     if (IsEmpty($scope.itemAdd.NgayBanGiao) === false && kendo.toString(kendo.parseDate($scope.itemAdd.NgayBanGiao, 'dd/MM/yyyy'), 'dd/MM/yyyy') === null) {
    //         isError = true;
    //         errMsg = errMsg + "Vui lòng nhập ngày bàn giao.\n";
    //     }
    //     param.NgayBanGiao = $scope.itemAdd.NgayBanGiao;
    //     if (IsEmpty($scope.itemAdd.NgayKTK_PhatHanh) === false && kendo.toString(kendo.parseDate($scope.itemAdd.NgayKTK_PhatHanh, 'dd/MM/yyyy'), 'dd/MM/yyyy') === null) {
    //         isError = true;
    //         errMsg = errMsg + "Vui lòng nhập Ngày Khối thiết kế phát hành.<br />";
    //     }
    //     param.NgayKTK_PhatHanh = $scope.itemAdd.NgayKTK_PhatHanh;
    //     if (IsEmpty($scope.itemAdd.NgayPDT_PhatHanh) === false && kendo.toString(kendo.parseDate($scope.itemAdd.NgayPDT_PhatHanh, 'dd/MM/yyyy'), 'dd/MM/yyyy') === null) {
    //         isError = true;
    //         errMsg = errMsg + "Vui lòng nhập ngày phòng dự toán phát hành<br />";
    //     }
    //     param.NgayPDT_PhatHanh = $scope.itemAdd.NgayPDT_PhatHanh;
    //     if (IsEmpty($scope.itemAdd.NgayPHTB_KH) === false && kendo.toString(kendo.parseDate($scope.itemAdd.NgayPHTB_KH, 'dd/MM/yyyy'), 'dd/MM/yyyy') === null) {
    //         isError = true;
    //         errMsg = errMsg + "Vui lòng nhập Ngày phát hành thông báo đến Khách Hàng.<br />";
    //     }
    //     param.NgayPHTB_KH = $scope.itemAdd.NgayPHTB_KH;
    //     if (IsEmpty($scope.itemAdd.NgayPhuLuc_HD) === false && kendo.toString(kendo.parseDate($scope.itemAdd.NgayPhuLuc_HD, 'dd/MM/yyyy'), 'dd/MM/yyyy') === null) {
    //         isError = true;
    //         errMsg = errMsg + "Vui lòng nhập Ngày phụ lục hợp đồng<br />";
    //     }
    //     param.NgayPhuLuc_HD = $scope.itemAdd.NgayPhuLuc_HD;
    //     if (IsEmpty($scope.itemAdd.NgayPHTB_QLDA) === false && kendo.toString(kendo.parseDate($scope.itemAdd.NgayPHTB_QLDA, 'dd/MM/yyyy'), 'dd/MM/yyyy') === null) {
    //         isError = true;
    //         errMsg = errMsg + "Vui lòng nhập ngày phát hành đến ban Buản lý dự án<br />";
    //     }
    //     param.NgayPHTB_QLDA = $scope.itemAdd.NgayPHTB_QLDA;
    //     if (IsEmpty($scope.itemAdd.NgayThiCong) === false && kendo.toString(kendo.parseDate($scope.itemAdd.NgayThiCong, 'dd/MM/yyyy'), 'dd/MM/yyyy') === null) {
    //         isError = true;
    //         errMsg = errMsg + "Vui lòng nhập Ngày thi công.<br />";
    //     }
    //     param.NgayThiCong = $scope.itemAdd.NgayThiCong;

    //     //isError = false;
    //     // console.log(param);
    //     if (isError === true) {
    //         //  alert(errMsg);
    //         Notification.error({ message: errMsg, positionX: 'center', delay: 2000, modal: true });
    //         return;
    //     }
    //     $.ajax({
    //         url: '/YeuCauKhachHang/CreateOrUpdate',
    //         type: "post",
    //         data: JSON.stringify({ options: param }),
    //         dataType: "json",
    //         contentType: "application/json; charset=utf-8",
    //         success: function (response) {
    //             if (response.StatusCode == 200) {
    //                 //Notification.success({ message: "Tạo Yêu cầu thành công", positionX: 'center', delay: 2000, modal: true })
    //                 $("#windowYeuCauChiTiet").kendoWindow({
    //                     animation: true,
    //                     width: "90%",
    //                     height: "95%",
    //                     title: "Khai báo yêu cầu Khách Hàng",
    //                     modal: true,
    //                     visible: false,
    //                     resizable: false,
    //                     actions: [
    //                         "Maximize",
    //                         "Close"
    //                     ]
    //                 }).data("kendoWindow").center().close();
    //                 $.ajax({
    //                     url: "/YeuCauKhachHang/GetAll",
    //                     type: "post",
    //                     contentType: "application/json; charset=utf-8",
    //                     success: function (response) {
    //                         $("#grid").data("kendoGrid").dataSource.data(response);
    //                         $("#grid").data("kendoGrid").dataSource.fetch();
    //                     }
    //                 })

    //             } else {
    //                 Notification.error({ message: "Có lỗi xảy ra " + response.ReasonPhrase, positionX: 'center', delay: 2000, modal: true });
    //                 return;
    //             }

    //         },
    //         error: function (xhr) {
    //             //Do Something to handle error
    //         }
    //     });


    // }
    // $scope.dataDotThanhToan = new kendo.data.DataSource({});
    // $scope.dataDotThanhToan.fetch(function () {
    //     var dmData = this.data();
    //     for (var i = 0; i < dmData.length; i++) {
    //         $scope.dmDotThanhToan.push(dmData[i]);
    //     }
    // });
    // $scope.dataDotThanhToan.read();


    // function donViMultiSelect(container, options) {
    //     $('<select id="Dot_ThanhToan" data-bind="value:' + options.field + '"/>')
    //         .appendTo(container)
    //         .kendoComboBox({
    //             dataTextField: "GiaTri_1",
    //             dataValueField: "ID",
    //             suggest: true,
    //             filter: "contains",
    //             placeholder: "Vui lòng chọn...",
    //             //highlightFirst: true,
    //             //serverFiltering: true,
    //             dataSource: $scope.dataDotThanhToan,
    //         });
    // }

    var dataSource = new kendo.data.DataSource({
        type: "json",
        //serverSorting: true,
        serverFiltering: true,
        allowUnsort: true,
        serverPaging: true,
        transport: {
            read: {
                url: "/GiaTriMacDinh/GetAll",
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
                id: "ID_GiaTri",
                fields: {
                    ID_GiaTriMacDinh: { type: "number", editable: false },

                    tenDinhNghia: {
                        type: "string", editable: true
                        //validation: { required: true },
                        //nullable: false
                    },

                    GiaTri: { type: "string", editable: true },

                    Date_Created: { type: "date", editable: false },
                    Date_Edited: { type: "date", editable: true },
                    GhiChu: { type: "string", editable: true },
                    IsDelete: { type: "boolean", editable: false },

                }
            },
        },
        //data: "rows",
        // total: "total"


    }
        );
    // var duanToolbarValue = 0;
    // var donviToolCanHoToolBar = 0;
    // // Init grid
    // var record = 0;
    var grid = $("#grid").kendoGrid({
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
                locked: true,
                lockable: false,
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
                field: "tenDinhNghia", title: "Tên Giá Trị", width: "257px",
                locked: true,
                lockable: false,
                //editor: tenThuoc_Editor,
                //filterable:
                //    {
                //        ui: Duan_Filter
                //    },
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
                field: "GiaTri", title: "Giá Trị", width: "144px",
                locked: true,
                lockable: false,
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
                field: "GhiChu", title: "Ghi Chú", width: "272px",
                //filterable:
                //    {
                //        ui: CanHo_Filter
                //    },
                //editor: CanHo_editor,
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
                field: "Date_Edited", title: "Ngày Cập Nhật", width: "208px",
                format: "{0:dd/MM/yyyy}",
                template: "#= (Date_Edited == null) ? ' ' : kendo.toString(kendo.parseDate(Date_Edited, 'dd/MM/yyyy'), 'dd/MM/yyyy')  #",
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

    });
    // //function
    // function Duan_Filter(element) {
    //     element.kendoDropDownList({
    //         dataTextField: "Ten_Duan",
    //         dataValueField: "Duan_ID",
    //         dataSource: $scope.dataDuAn,
    //         optionLabel: "Chọn Dự Án",
    //         change: function () {
    //             var value = this.value();
    //             if (value) {
    //                 var model = this.dataItem();
    //                 grid.data("kendoGrid").dataSource.filter({ field: "Duan_ID", operator: "eq", value: value.toString() });
    //             }
    //             else {
    //                 grid.data("kendoGrid").dataSource.filter({});
    //             }
    //         }
    //     });
    // };
    // function CanHo_Filter(element) {
    //     element.kendoAutoComplete({
    //         dataTextField: "CanHo_ID",
    //         dataValueField: "CanHo_ID",
    //         dataSource: $scope.dataCanHo,
    //     });
    // };
    // $scope.Select_Duan;
    // function Duan_editor(container, options) {
    //     $('<input required name="' + options.field + '"/>')
    //         .appendTo(container)
    //         .kendoDropDownList({
    //             autoBind: false,
    //             dataTextField: "Ten_Duan",
    //             dataValueField: "Duan_ID",
    //             dataSource: $scope.dataDuAn,
    //             change: function () {
    //                 var value = this.value();
    //                 if (value) {
    //                     var model;
    //                     model = this.dataItem();
    //                     $scope.Select_Duan = model.Duan_ID;
    //                 }
    //                 else {
    //                     Select_Duan = null;
    //                 }
    //             }
    //         });
    // }
    // $scope.Select_CanHo;
    // function CanHo_editor(container, options) {
    //     $('<input required name="' + options.field + '"/>')
    //         .appendTo(container)
    //         .kendoDropDownList({
    //             autoBind: false,
    //             dataTextField: "CanHo_ID",
    //             dataValueField: "CanHo_ID",
    //             dataSource: $scope.dataCanHo,
    //             change: function () {
    //                 var value = this.value();
    //                 if (value) {
    //                     var model;
    //                     model = this.dataItem();
    //                     $scope.Select_CanHo = model.CanHo_ID;
    //                 }
    //                 else {
    //                     Select_Duan = null;
    //                 }
    //             }
    //         });
    //     var data = dataSource.data();
    //     //for(var i in canHoinfo)
    //     //{
    //     //    $scope.canHoInfo.maCanHo =canHoinfo[i].CanHo_ID;
    //     //    $scope.canHoInfo.block=
    //     //}
    //     //$.ajax({
    //     //    url:"/YeuCauKhachHang/GetBlock",
    //     //    dataType:'json',
    //     //    data: JSON.stringify({CanHo_ID:canHoinfo.CanHo_ID}),
    //     //    contentType: "application/json; charset=utf-8",
    //     //    success: function (response) {
    //     //        $scope.canHoInfo.block =response.model.Block;
    //     //    },
    //     //})
    //     //$.ajax({
    //     //    url:"/YeuCauKhachHang/GetTang",
    //     //    dataType:'json',
    //     //    data: JSON.stringify({CanHo_ID:canHoinfo.CanHo_ID}),
    //     //    contentType: "application/json; charset=utf-8",
    //     //    success: function (response) {
    //     //        $scope.canHoInfo.tang =response.model.Tang;
    //     //    },
    //     //})
    //     //$.ajax({
    //     //    url:"/YeuCauKhachHang/GetViTri",
    //     //    dataType:'json',
    //     //    data: JSON.stringify({CanHo_ID:canHoinfo.CanHo_ID}),
    //     //    contentType: "application/json; charset=utf-8",
    //     //    success: function (response) {
    //     //        $scope.canHoInfo.viTri =response.model.ViTri;
    //     //    },
    //     //})
    // }
    // $scope.ExportExcel = function () {
    //     var rows = [
    //{
    //    cells: [
    //      { value: "BẢNG TỔNG HỢP YÊU CẦU KHÁCH HÀNG DỰ ÁN SADORA", colSpan: 9, index: 0, bold: true, borderLeft: { color: "#000000", size: 1 }, borderRight: { color: "#000000", size: 1 }, borderTop: { color: "#000000", size: 1 }, borderBottom: { color: "#000000", size: 1 }, },
    //    ],
    //},
    //{
    //    cells: [
    //      //Cac cot trong excel
    //      { value: "STT", rowSpan: 2, bold: true, background: "#bbff33", borderLeft: { color: "#000000", size: 1 }, borderRight: { color: "#000000", size: 1 }, borderTop: { color: "#000000", size: 1 }, borderBottom: { color: "#000000", size: 1 }, },
    //      { value: "Tháp", rowSpan: 2, bold: true, background: "#bbff33", borderLeft: { color: "#000000", size: 1 }, borderRight: { color: "#000000", size: 1 }, borderTop: { color: "#000000", size: 1 }, borderBottom: { color: "#000000", size: 1 }, },
    //      { value: "Tầng", rowSpan: 2, bold: true, background: "#bbff33", borderLeft: { color: "#000000", size: 1 }, borderRight: { color: "#000000", size: 1 }, borderTop: { color: "#000000", size: 1 }, borderBottom: { color: "#000000", size: 1 }, },
    //      { value: "Vị trí", rowSpan: 2, bold: true, background: "#bbff33", borderLeft: { color: "#000000", size: 1 }, borderRight: { color: "#000000", size: 1 }, borderTop: { color: "#000000", size: 1 }, borderBottom: { color: "#000000", size: 1 }, },
    //      { value: "Mã Căn", rowSpan: 2, bold: true, background: "#bbff33", borderLeft: { color: "#000000", size: 1 }, borderRight: { color: "#000000", size: 1 }, borderTop: { color: "#000000", size: 1 }, borderBottom: { color: "#000000", size: 1 }, },
    //      { value: "Khách Hàng", rowSpan: 2, bold: true, background: "#bbff33", borderLeft: { color: "#000000", size: 1 }, borderRight: { color: "#000000", size: 1 }, borderTop: { color: "#000000", size: 1 }, borderBottom: { color: "#000000", size: 1 }, },
    //      { value: "Nhân viên bán hàng", rowSpan: 2, bold: true, background: "#bbff33", borderLeft: { color: "#000000", size: 1 }, borderRight: { color: "#000000", size: 1 }, borderTop: { color: "#000000", size: 1 }, borderBottom: { color: "#000000", size: 1 }, },
    //      { value: "Nội dung yêu cầu", rowSpan: 2, bold: true, background: "#bbff33", borderLeft: { color: "#000000", size: 1 }, borderRight: { color: "#000000", size: 1 }, borderTop: { color: "#000000", size: 1 }, borderBottom: { color: "#000000", size: 1 }, },
    //      { value: "Ngày Khách Hàng Yêu cầu", rowSpan: 2, bold: true, background: "#bbff33", borderLeft: { color: "#000000", size: 1 }, borderRight: { color: "#000000", size: 1 }, borderTop: { color: "#000000", size: 1 }, borderBottom: { color: "#000000", size: 1 }, },
    //      { value: "Ngày Tiếp Nhận", rowSpan: 2, bold: true, background: "#bbff33", borderLeft: { color: "#000000", size: 1 }, borderRight: { color: "#000000", size: 1 }, borderTop: { color: "#000000", size: 1 }, borderBottom: { color: "#000000", size: 1 }, },
    //      { value: "Khối thiết kế", colSpan: 2, bold: true, background: "#c2c2d6", borderLeft: { color: "#000000", size: 1 }, borderRight: { color: "#000000", size: 1 }, borderTop: { color: "#000000", size: 1 }, borderBottom: { color: "#000000", size: 1 }, },
    //      { value: "Phòng Dự Toán", colSpan: 2, bold: true, background: "#cc5200", borderLeft: { color: "#000000", size: 1 }, borderRight: { color: "#000000", size: 1 }, borderTop: { color: "#000000", size: 1 }, borderBottom: { color: "#000000", size: 1 }, },
    //      { value: "Ngày Phát Hành thông báo đến khách Hàng", rowSpan: 2, bold: true, background: "#bbff33", borderLeft: { color: "#000000", size: 1 }, borderRight: { color: "#000000", size: 1 }, borderTop: { color: "#000000", size: 1 }, borderBottom: { color: "#000000", size: 1 }, },
    //      { value: "Ngày ký phụ lục hợp đồng", rowSpan: 2, bold: true, background: "#bbff33", borderLeft: { color: "#000000", size: 1 }, borderRight: { color: "#000000", size: 1 }, borderTop: { color: "#000000", size: 1 }, borderBottom: { color: "#000000", size: 1 }, },
    //      { value: "Ngày phát hành thông báo đến ban quản lý dự án ", background: "#ffff00", rowSpan: 2, bold: true, borderLeft: { color: "#000000", size: 1 }, borderRight: { color: "#000000", size: 1 }, borderTop: { color: "#000000", size: 1 }, borderBottom: { color: "#000000", size: 1 }, },
    //      { value: "Ngày thi công", rowSpan: 2, bold: true, background: "#bbff33", borderLeft: { color: "#000000", size: 1 }, borderRight: { color: "#000000", size: 1 }, borderTop: { color: "#000000", size: 1 }, borderBottom: { color: "#000000", size: 1 }, },
    //      { value: "Ngày bàn giao", rowSpan: 2, bold: true, background: "#bbff33", borderLeft: { color: "#000000", size: 1 }, borderRight: { color: "#000000", size: 1 }, borderTop: { color: "#000000", size: 1 }, borderBottom: { color: "#000000", size: 1 }, },
    //      { value: "Ghi chú", rowSpan: 2, bold: true, background: "#bbff33", borderLeft: { color: "#000000", size: 1 }, borderRight: { color: "#000000", size: 1 }, borderTop: { color: "#000000", size: 1 }, borderBottom: { color: "#000000", size: 1 }, },
    //    ],
    //},
    //{
    //    cells: [
    //      { value: "Ngày phát hành", bold: true, background: "#bbff33", borderLeft: { color: "#000000", size: 1 }, borderRight: { color: "#000000", size: 1 }, borderTop: { color: "#000000", size: 1 }, borderBottom: { color: "#000000", size: 1 }, },
    //      { value: "Bản vẽ điều chỉnh", bold: true, background: "#bbff33", borderLeft: { color: "#000000", size: 1 }, borderRight: { color: "#000000", size: 1 }, borderTop: { color: "#000000", size: 1 }, borderBottom: { color: "#000000", size: 1 }, },
    //      { value: "Ngày phát hành", bold: true, background: "#bbff33", borderLeft: { color: "#000000", size: 1 }, borderRight: { color: "#000000", size: 1 }, borderTop: { color: "#000000", size: 1 }, borderBottom: { color: "#000000", size: 1 }, },
    //      { value: "Chi Tiết điều chỉnh", bold: true, background: "#bbff33", borderLeft: { color: "#000000", size: 1 }, borderRight: { color: "#000000", size: 1 }, borderTop: { color: "#000000", size: 1 }, borderBottom: { color: "#000000", size: 1 }, }
    //    ]
    //}];
    //     var data = $("#grid").data("kendoGrid").dataSource.data();
    //     for (var i = 0; i < data.length; i++) {
    //         if (data[i].MaCanHo != null) {
    //             var cells;
    //             var dataBlock = data[i].MaBlock;
    //             var dataViTri = data[i].TenViTri;
    //             var dataTang = data[i].TenTang;
    //             var NgayTiepNhan;
    //             var NgayKTK_PhatHanh;
    //             var NgayPDT_PhatHanh;
    //             var NgayPHTB_KH;
    //             var NgayPhuLuc_HD;
    //             var NgayPHTB_QLDA;
    //             var NgayThiCong;
    //             var NgayBanGiao;
    //             if (data[i].NgayTiepNhan == null || data[i].NgayTiepNhan == "") {
    //                 NgayTiepNhan = " ";
    //             }
    //             else {
    //                 NgayTiepNhan = Date(kendo.parseDate(data[i].NgayTiepNhan, 'dd/MM/yyyy'));
    //             }
    //             if (data[i].NgayKTK_PhatHanh == null || data[i].NgayKTK_PhatHanh == "") {
    //                 NgayKTK_PhatHanh = " ";
    //             }
    //             else {
    //                 NgayKTK_PhatHanh = Date(kendo.parseDate(data[i].NgayKTK_PhatHanh, 'dd/MM/yyyy'));
    //             }
    //             if (data[i].NgayPDT_PhatHanh == null || data[i].NgayPDT_PhatHanh == "") {
    //                 NgayPDT_PhatHanh = " ";
    //             }
    //             else {
    //                 NgayPDT_PhatHanh = Date(kendo.parseDate(data[i].NgayPDT_PhatHanh, 'dd/MM/yyyy'));
    //             }
    //             if (data[i].NgayKTK_PhatHanh == null || data[i].NgayKTK_PhatHanh == "") {
    //                 NgayKTK_PhatHanh = " ";
    //             }
    //             else {
    //                 NgayKTK_PhatHanh = Date(kendo.parseDate(data[i].NgayKTK_PhatHanh, 'dd/MM/yyyy'));
    //             }
    //             if (data[i].NgayPHTB_KH == null || data[i].NgayPHTB_KH == "") {
    //                 NgayPHTB_KH = " ";
    //             }
    //             else {
    //                 NgayPHTB_KH = Date(kendo.parseDate(data[i].NgayPHTB_KH, 'dd/MM/yyyy'));
    //             }
    //             if (data[i].NgayPhuLuc_HD == null || data[i].NgayPhuLuc_HD == "") {
    //                 NgayPhuLuc_HD = " ";
    //             }
    //             else {
    //                 NgayPhuLuc_HD = Date(kendo.parseDate(data[i].NgayPhuLuc_HD, 'dd/MM/yyyy'));
    //             }
    //             if (data[i].NgayPHTB_QLDA == null || data[i].NgayPHTB_QLDA == "") {
    //                 NgayPHTB_QLDA = " ";
    //             }
    //             else {
    //                 NgayPHTB_QLDA = Date(kendo.parseDate(data[i].NgayPHTB_QLDA, 'dd/MM/yyyy'));
    //             }
    //             if (data[i].NgayThiCong == null || data[i].NgayThiCong == "") {
    //                 NgayThiCong = " ";
    //             }
    //             else {
    //                 NgayThiCong = Date(kendo.parseDate(data[i].NgayThiCong, 'dd/MM/yyyy'));
    //             }
    //             if (data[i].NgayBanGiao == null || data[i].NgayBanGiao == "") {
    //                 NgayBanGiao = " ";
    //             }
    //             else {
    //                 NgayBanGiao = Date(kendo.parseDate(data[i].NgayBanGiao, 'dd/MM/yyyy'));
    //             }


    //             cells = [
    //             { value: i + 1 },
    //             { value: dataBlock },
    //             { value: dataTang },
    //             { value: dataViTri },
    //             { value: data[i].MaCanHo },
    //             { value: data[i].KhachHang_ID },
    //             { value: data[i].TenNV },
    //             { value: data[i].NoiDung_YC },

    //             { value: new Date(kendo.parseDate(data[i].NgayKH_Yeucau, 'dd/MM/yyyy')), vAlign: "center", hAlign: "center", },
    //             { value: NgayTiepNhan, vAlign: "center", hAlign: "center", },
    //             { value: NgayKTK_PhatHanh, vAlign: "center", hAlign: "center", },
    //             { value: data[i].BanveDieuchinh },
    //             { value: NgayPDT_PhatHanh, vAlign: "center", hAlign: "center", },
    //             { value: data[i].PDT_Dieuchinh },
    //             { value: NgayPHTB_KH, vAlign: "center", hAlign: "center", },
    //             { value: NgayPhuLuc_HD, vAlign: "center", hAlign: "center", },
    //             { value: NgayPHTB_QLDA, vAlign: "center", hAlign: "center", },
    //             { value: NgayThiCong, vAlign: "center", hAlign: "center", },
    //             { value: NgayBanGiao, vAlign: "center", hAlign: "center", },
    //             { value: data[i].GhiChu }
    //             ]
    //             rows.push({
    //                 cells: cells
    //             })
    //         }

    //     }
    //     var workbook = new kendo.ooxml.Workbook({
    //         sheets: [
    //           {
    //               frozenColumns: 6,
    //               frozenRows: 3,
    //               columns: [
    //                 // Column settings (width)
    //                 { width: 30 },
    //                 { autoWidth: true },
    //                 { autoWidth: true },
    //                 { autoWidth: true },
    //                 { autoWidth: true },
    //                 { autoWidth: true },
    //                 { autoWidth: true },
    //                 { autoWidth: true },
    //                 { autoWidth: true },
    //                 { autoWidth: true },
    //                 { autoWidth: true },
    //                 { autoWidth: true },
    //                 { autoWidth: true },
    //                 { autoWidth: true },
    //                 { autoWidth: true },
    //                 { autoWidth: true },
    //                 { autoWidth: true },
    //                 { autoWidth: true },
    //                 { autoWidth: true },
    //                 { autoWidth: true },
    //               ],
    //               // Title of the sheet
    //               title: "Orders",
    //               // Rows of the sheet
    //               rows: rows
    //           }
    //         ]
    //     });
    //     //save the file as Excel file with extension xlsx
    //     kendo.saveAs({ dataURI: workbook.toDataURL(), fileName: "Bang Tong Hop Yeu Cau Khach Hang " + datetime + ".xlsx" });
    // };
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
        url: "/GiaTriMacDinh/GetAll",
        type: "post",
        dataType: "json",
        contentType: "application/json; charset=utf-8",
        success: function (response) {
            $("#grid").data("kendoGrid").dataSource.data(response);
            $("#grid").data("kendoGrid").dataSource.fetch();
        } // 
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
    // $scope.ImportExcel = function () {
    //     $("#windowImportYeuCau").kendoWindow({
    //         animation: true,
    //         width: "95%",
    //         height: "70%",
    //         title: "Import Danh Mục căn hộ",
    //         modal: true,
    //         visible: false,
    //         actions: [
    //             "Maximize",
    //             "Close"
    //         ]
    //     }).data("kendoWindow").center().open();
    // }

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