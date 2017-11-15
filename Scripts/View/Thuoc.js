angular.module('KendoDemos', ["kendo.directives", "ui-notification"]).controller("MyCtrl", function ($scope, Notification) {
    $scope.itemAdd = {};
    $scope.itemSearch = {};
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
    $scope.LoaiThuoc = new kendo.data.DataSource({
        transport: {
            read: {
                url: '/Thuoc/GetAllLoaiThuoc',
                dataType: 'json',
                contentType: 'application/json; charset=utf-8',
            }
        }
    })
    $scope.Thuoc = new kendo.data.DataSource({
        transport: {
            read: {
                url: "/Thuoc/GetAll",
                dataType: "json",
                contentType: "application/json; charset=utf-8",
                type: 'POST'
            }
        }
    });
    /*set ng-click event for button Them moi*/
    $scope.ThemThuoc = function () {
       //$scope.itemAdd.LoaiThuoc = -1;
       $scope.itemAdd.LoaiThuoc;
       $scope.itemAdd.Thuoc = " ";
       $scope.itemAdd.SoLuong = 0;
       $scope.itemAdd.DonGia = 0;
       $scope.itemAdd.GhiChu = " ";
       $("#CreateThuoc").kendoWindow({
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
    };
    $scope.btnHuy = function () {
        $("#CreateThuoc").kendoWindow({
            animation: true,
            width: "90%",
            height: "95%",
            title: "Cập Nhật Thuốc",
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
        //public int ID_Thuoc { get; set; }
        //public string tenThuoc { get; set; }
        //public int loaiThuoc { get; set; }
        //public decimal soLuongTon { get; set; }
        //public decimal donGia { get; set; }
        //public string GhiChu { get; set; }
        //public Nullable<System.DateTime> Date_Created { get; set; }
        //public Nullable<System.DateTime> Date_Edited { get; set; }
        //public bool IsDelete { get; set; }
        var param = {};
        var isError = false;
        var errMsg = " ";
        param.ID_Thuoc = $scope.itemAdd.ID_Thuoc;
        if (IsEmpty($scope.itemAdd.loaiThuoc) === true || $scope.itemAdd.loaiThuoc === 0) {
            isError = true;
            errMsg = errMsg + "Vui lòng chọn Loại Thuốc\n";
        }
        param.loaiThuoc = $scope.itemAdd.loaiThuoc;
        if (IsEmpty($scope.itemAdd.tenThuoc) === true) {
            isError = true;
            errMsg = errMsg + "Vui lòng Nhập Tên Thuốc\n";
        }
        param.tenThuoc = $scope.itemAdd.tenThuoc;
        param.donGia = $scope.itemAdd.donGia;
        param.soLuongTon = $scope.itemAdd.soLuongTon;
        param.GhiChu = $scope.itemAdd.GhiChu;
        if (isError === true)
        {
            Notification.error({ message: errMsg, positionX: 'center', delay: 2000, modal: true });
            return;
        }           
        $.ajax({
            url: '/Thuoc/CreateOrUpdate',
            type: "post",
            data: JSON.stringify({ Option: param }),
            dataType: "json",
            contentType: "application/json; charset=utf-8",
            success: function (response) {
                if (response.StatusCode == 200) {
                    Notification.success({ message: "Hoàn Tất", positionX: 'center', delay: 2000, modal: true })
                    $("#CreateThuoc").kendoWindow({
                        animation: true,
                        width: "90%",
                        height: "95%",
                        title: "Cập Nhật Thuốc",
                        modal: true,
                        visible: false,
                        resizable: false,
                        actions: [
                            "Maximize",
                            "Close"
                        ]
                    }).data("kendoWindow").center().close();
                    $.ajax({
                        url: "/Thuoc/GetAll",
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
        //public int ID_Thuoc { get; set; }
        //public string tenThuoc { get; set; }
        //public int loaiThuoc { get; set; }
        //public decimal soLuongTon { get; set; }
        //public decimal donGia { get; set; }
        //public string GhiChu { get; set; }
        //public Nullable<System.DateTime> Date_Created { get; set; }
        //public Nullable<System.DateTime> Date_Edited { get; set; }
        //public bool IsDelete { get; set; }
        var grid = $("#grid").data("kendoGrid");
        var param = grid.dataItem($(this).closest("tr"));  
        $scope.itemAdd.ID_Thuoc = param.ID_Thuoc;
        $scope.itemAdd.loaiThuoc = param.loaiThuoc;
        $scope.itemAdd.tenThuoc = param.tenThuoc;
        $scope.itemAdd.donGia = param.donGia;
        $scope.itemAdd.GhiChu = param.GhiChu;
        $scope.itemAdd.soLuongTon = param.soLuongTon;
        $scope.$apply();
        $("#CreateThuoc").kendoWindow({
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
        $("#messageConfirm").html("Bạn có muốn xóa  <b>" + item.tenThuoc + " ?");
        window.center().open();
        $("#yesButton").click(function () {
            if ($(this).hasClass("delete-confirm")) {
                $.ajax({
                    url: '/Thuoc/Delete',
                    type: "post",
                    data: JSON.stringify({ id: item.ID_Thuoc }),
                    dataType: "json",
                    contentType: "application/json; charset=utf-8",
                    success: function (response) {
                        if (response.StatusCode == 200) {
                            Notification.success({ message: "Hoàn Tất", positionX: 'center', delay: 2000, modal: true });
                            $.ajax({
                                url: "/Thuoc/GetAll",
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
                url: "/Thuoc/GetAll",
                type: "POST",
                dataType: "json",
                contentType: "application/json; charset=utf-8",
                cache: false
            },
            //parse Json, phai de thuc hien o day, de o tren operation se bao loi Json
            parameterMap: function (options, operation) {
                return kendo.stringify(options);
            }
        },

        autoSync: false,

        pageSize: 10,
        schema: {
            model: {
                id: "ID_Thuoc",
                fields: {
                    ID_Thuoc: { type: "number", editable: false },

                    tenThuoc: {
                        type: "string", editable: true
                        //validation: { required: true },
                        //nullable: false
                    },
                    soLuongTon: { type: "number", editable: true },
                    donGia:{type:"number",editable:true},
                    loaiThuoc: {
                        type: "number",
                        //validation: { required: true },
                        //nullable: false
                    },
                    Date_Created: { type: "date", editable: false },
                    Date_Edited: { type: "date", editable: true },
                    GhiChu: { type: "string", editable: true },
                    IsDelete: { type: "boolean", editable: false },
                    TenLoaiThuoc: {type:"string",editable:false}
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
                field: "tenThuoc", title: "Tên thuốc", width: "257px",
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
                field: "TenLoaiThuoc", title: "Loại Thuốc", width: "144px",
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
                field: "soLuongTon", title: "Số lượng", width: "124px",
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
                field: "donGia", title: "Đơn Giá", width: "116px",
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
                field: "Date_Created", title: "Ngày Cập Nhật", width: "208px",
                format: "{0:dd/MM/yyyy}",
                template: "#= (Date_Created == null) ? ' ' : kendo.toString(kendo.parseDate(Date_Created, 'dd/MM/yyyy'), 'dd/MM/yyyy')  #",
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
        autoBind: false,
    });
    $scope.LocThuoc = function () {
        //public int ID_Thuoc { get; set; }
        //public string tenThuoc { get; set; }
        //public int loaiThuoc { get; set; }
        //public decimal soLuongTon { get; set; }
        //public decimal donGia { get; set; }
        //public string GhiChu { get; set; }
        //public Nullable<System.DateTime> Date_Created { get; set; }
        //public Nullable<System.DateTime> Date_Edited { get; set; }
        //public bool IsDelete { get; set; }
        var TenLoaiThuoc = " ";
        if (!IsEmpty($scope.itemSearch.loaiThuoc)) {
            TenLoaiThuoc = $scope.itemSearch.loaiThuoc;
        }
        var TenThuoc = " ";
        if (!IsEmpty($scope.itemSearch.tenThuoc)) {
            TenThuoc = $scope.itemSearch.tenThuoc;
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
   },];
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
        url: "/Thuoc/GetAll",
        type: "post",
        dataType: "json",
        contentType: "application/json; charset=utf-8",
        success: function (response) {
            $("#grid").data("kendoGrid").dataSource.data(response);
            $("#grid").data("kendoGrid").dataSource.fetch();
        }
    });

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