angular.module('KendoDemos', ["kendo.directives", "ui-notification"]).controller("MyCtrl", function ($scope, Notification) {
    $scope.itemAdd = {};
    $scope.detailAdd = {};
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
    $scope.BenhNhan = new kendo.data.DataSource({
        transport: {
            read: {
                url: '/BenhNhan/GetAll',
                type:'POST',
                dataType: 'json',
                contentType: 'application/json; charset=utf-8',
            }
        }
    })
    //$scope.Thuoc = new kendo.data.DataSource({
    //    transport: {
    //        read: {
    //            url: "/Thuoc/GetAll",
    //            dataType: "json",
    //            contentType: "application/json; charset=utf-8",
    //            type: 'POST'
    //        }
    //    }
    //});
    $scope.New = function () {
        //$scope.itemAdd.LoaiThuoc = -1;

       $scope.itemAdd.ID_BenhAn;
       $scope.itemAdd.ID_BenhNhan;
       $scope.itemAdd.TrieuChung = "";
       $scope.itemAdd.ChuanDoan = "";
       $scope.itemAdd.ID_donThuoc = 0;
       $scope.itemAdd.ngayKham;
       $("#CreateBenhAn").kendoWindow({
          animation: true,
          width: "90%",
          height: "95%",
          title: "Cập Nhật bệnh Án",
          modal: true,
          visible: false,
          resizable: false,
          actions: [
               "Maximize",
               "Close"
            ]
       }).data("kendoWindow").center().open();
       var Detail_grid =$("#Detail_Grid").kendoGrid({
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
           height: 250,
           pageable: true,
           filterable: $.MySc.filterable,
           columnMenu: $.MySc.columnMenu,
           pageable: $.MySc.pageable,
           columns:
               [
                   {
                   command: [
                   { name: "destroy", text: "", template: "<a class='k-button k-grid-remove' style='min-width: 0px !important;'><span class='glyphicon glyphicon-remove'></span></a>" }
                   ],
                   width: "80px",
                   title: " ",
                   width: "50px",
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
                   field: "TenThuoc",
                   title: "Tên thuốc", width: "150px",
                   //template: "<span class='row-number'></span>",
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
               {
                   field: "SoLuong",
                   title: "Số Lượng", width: "150px",
                   //template: "<span class='row-number'></span>",
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
               {
                   field: "Ghi_Chu",
                   title: "Ghi Chú", width: "150px",
                   //template: "<span class='row-number'></span>",
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
                   + ($("#Detail_Grid").data("kendoGrid").dataSource.pageSize() * ($("#Detail_Grid").data("kendoGrid").dataSource.page() - 1));;
                   var rowLabel = $(this).find(".row-number");

                   $(rowLabel).html(index);
               });
           },
       });
    };
    $scope.btnDetail = function () {
        var param_detail = {};
        param_detail.TenThuoc = $scope.detailAdd.TenThuoc;
        param_detail.SoLuong = $scope.detailAdd.SoLuong;
        param_detail.Ghi_Chu = $scope.detailAdd.Ghi_Chu;
        $.ajax({
            url: "/CTDT/CreateOrUpdate", type: "post",
            data: JSON.stringify({ Option: param_detail }),
            dataType: "json",
            contentType: "application/json; charset=utf-8",
            success: function (response) {
                if (response.StatusCode == 200) {
                    $.ajax({
                        url: "/CTDT/GetAll",
                        type: "post",
                        dataType: "json",
                        contentType: "application/json; charset=utf-8",
                        success: function (response) {
                            $("#Detail_Grid").data("kendoGrid").dataSource.data(response);
                            $("#Detail_Grid").data("kendoGrid").dataSource.fetch();
                        }
                    })
                };
            }
        });
        
    }
    $scope.btnHuy = function () {
        $("#CreateBenhAn").kendoWindow({
            animation: true,
            width: "90%",
            height: "95%",
            title: "Cập Nhật bệnh Án",
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
        var param = {};
        var isError = false;
        var errMsg = " ";
        //public int ID_BenhAn { get; set; }
        //public int ID_BenhNhan { get; set; }
        //public string TrieuChung { get; set; }
        //public string ChuanDoan { get; set; }
        //public int ID_donThuoc { get; set; }
        //public System.DateTime ngayKham { get; set; }
        //public bool IsDelete { get; set; }
        //public Nullable<System.DateTime> Date_Created { get; set; }
        //public Nullable<System.DateTime> Date_Edited { get; set; }
        param.ID_BenhAn = $scope.itemAdd.ID_BenhAn;
        if (IsEmpty($scope.itemAdd.ID_BenhNhan) === true || $scope.itemAdd.ID_BenhNhan === 0) {
            isError = true;
            errMsg = errMsg+"<br>" + "Vui lòng chọn Bệnh Nhân\n";
        }
        param.ID_BenhNhan = $scope.itemAdd.ID_BenhNhan;
        var str_tc = $scope.itemAdd.TrieuChung;
        if (IsEmpty(str_tc))
        {
            isError = true;
            errMsg = errMsg + "<br>" + "Cho biết triệu chứng\n";
        }
        if (!(/^[a-zA-Z0-9]+$/).test(str_tc))
        {
            isError = true;
            errMsg = errMsg + "<br>" + "Triệu chứng không được có ký tự đặc biệt \n";
        }
        if (str_tc.length > 200)
        {
            isError = true;
            errMsg = errMsg+"<br>" + "Triệu chứng không dài quá 200 ký tự \n";
        }
        param.TrieuChung = $scope.itemAdd.TrieuChung;
        var str_cd = $scope.itemAdd.ChuanDoan;
        if(isEmpty(str_cd))
        {
            isError = true;
            errMsg = errMsg+"<br>" + "Chuẩn đoán bệnh \n";
        }
        if (!(/^[a-zA-Z]+$/).test(str_cd)) {
            isError = true;
            errMsg = errMsg + "<br>" + "Mục Chuẩn đoán không được có ký tự đặc biệt \n";
        }
        if (str_cd.length>100) {
            isError = true;
            errMsg = errMsg+"<br>" + "Mục Chuẩn đoán chỉ chứa tối đa 100 ký tự \n";
        }
        param.ChuanDoan = $scope.itemAdd.ChuanDoan;
        param.ID_donThuoc = $scope.itemAdd.ID_donThuoc;
        param.ngayKham = $scope.itemAdd.ngayKham;
        if (isError === true)
        {
            Notification.error({ message: errMsg, positionX: 'center', delay: 2000, modal: true });
            return;
        }           
        $.ajax({
            url: '/BenhAn/CreateOrUpdate',
            type: "post",
            data: JSON.stringify({ Option: param }),
            dataType: "json",
            contentType: "application/json; charset=utf-8",
            success: function (response) {
                if (response.StatusCode == 200) {
                    Notification.success({ message: "Hoàn Tất", positionX: 'center', delay: 2000, modal: true });
                    $.ajax({
                        url: '/BenhAn/CreateDonThuocTemPlate',
                        //type: 'POST',
                        data: JSON.stringify({ BenhAn_ID: param.ID_BenhAn }),
                        success: function (res)
                        {
                            $scope.detailAdd.ID_donThuoc = res;                          
                            $("#CreateBenhAn").kendoWindow({
                                animation: true,
                                width: "90%",
                                height: "95%",
                                title: "Cập Nhật bệnh Án",
                                modal: true,
                                visible: false,
                                resizable: false,
                                actions: [
                                    "Maximize",
                                    "Close"
                                ]
                            }).data("kendoWindow").center().close();
                            $.ajax({
                                url: "/BenhAn/GetAll",
                                dataType: "json",
                                contentType: "application/json; charset=utf-8",
                                success: function (response) {
                                    $("#grid").data("kendoGrid").dataSource.data(response);
                                    $("#grid").data("kendoGrid").dataSource.fetch();
                                }
                            })
                                        
                                
                        }
                    });
                }
                 else {
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
        $scope.itemAdd.ID_BenhAn = param.ID_BenhAn;;
        $scope.itemAdd.ID_BenhNhan = param.ID_BenhNhan;
        $scope.itemAdd.TrieuChung = param.TrieuChung;
        $scope.itemAdd.ChuanDoan = param.ChuanDoan;
        $scope.itemAdd.ID_donThuoc = param.ID_donThuoc;
        $scope.itemAdd.ngayKham = param.ngayKham;
        $scope.$apply();
        $("#CreateBenhAn").kendoWindow({
            animation: true,
            width: "90%",
            height: "70%",
            title: "Cập Nhật bệnh Án",
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
        $("#messageConfirm").html("Bạn có muốn xóa  <b>" + item.ChuanDoan + " ?");
        window.center().open();
        $("#yesButton").click(function () {
            if ($(this).hasClass("delete-confirm")) {
                $.ajax({
                    url: '/BenhAn/Delete',
                    type: "post",
                    data: JSON.stringify({ id: item.ID_BenhAn }),
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
    var dataSource_ = new kendo.data.DataSource({
        type: "json",
        //serverSorting: true,
        serverFiltering: true,
        allowUnsort: true,
        serverPaging: true,
        transport: {
            read: {
                url: "/CTDT/GetAll",
                type: "POST",
                data: JSON.stringify({ ID_DonThuoc:  $scope.itemAdd.ID_DonThuoc }),
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
                id: "ID_DonThuoc",
                fields: {
                    ID_DonThuoc: { type: "number", editable: false },

                    ID_Thuoc: {
                        type: "number", editable: true
                        //validation: { required: true },
                        //nullable: false
                    },
                    Ghi_Chu: { type: "string", editable: true },
                    SoLuong: {
                        type: "number",
                        //validation: { required: true },
                        //nullable: false
                    },
                    Date_Created: { type: "date", editable: false },
                    Date_Edited: { type: "date", editable: true },
                    IsDelete: { type: "boolean", editable: false },
                }
            },
        },
        //data: "rows",
        // total: "total"


    }
        );
    var dataSource = new kendo.data.DataSource({
        type: "json",
        //serverSorting: true,
        serverFiltering: true,
        allowUnsort: true,
        serverPaging: true,
        transport: {
            read: {
                url: "/BenhAn/GetAll",
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
                id: "ID_BenhAn",
                fields: {
                    ID_BenhAn: { type: "number", editable: false },

                    ID_BenhNhan: {
                        type: "number", editable: true
                        //validation: { required: true },
                        //nullable: false
                    },
                    TrieuChung: { type: "string", editable: true },
                    ChuanDoan: { type: "string", editable: true },
                    ID_donThuoc: {
                        type: "number",
                        //validation: { required: true },
                        //nullable: false
                    },
                    Date_Created: { type: "date", editable: false },
                    Date_Edited: { type: "date", editable: true },
                    ngayKham: { type: "date", editable: true },
                    IsDelete: { type: "boolean", editable: false },
                   
                }
            },
        },
        //data: "rows",
        // total: "total"


    }
        );   
    $scope.mainGridOptions={
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
                field: "TenBenhNhan", title: "Tên bệnh nhân", width: "257px",
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
                field: "TrieuChung", title: "Triệu chứng", width: "144px",
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
                field: "ChuanDoan", title: "Chuẩn đoán", width: "124px",
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
                field: "ngayKham", title: "Ngày khám", width: "116px",
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
                        url: '/CTDT/GetAll',
                        type: "POST",
                        dataType: "json",
                    },
                },
                serverPaging: true,
                serverSorting: true,
                serverFiltering: true,
                pageSize: 5,
                filter: { field: "ID_DonThuoc", operator: "eq", value: dataItem.ID_DonThuoc },
                schema: {
                    model: {
                        id: "ID_DonThuoc",
                        fields: {
                            ID_DonThuoc: { type: "number", editable: false },

                            ID_Thuoc: {
                                type: "number", editable: true
                                //validation: { required: true },
                                //nullable: false
                            },
                            Ghi_Chu: { type: "string", editable: true },
                            SoLuong: {
                                type: "number",
                                //validation: { required: true },
                                //nullable: false
                            },
                            Date_Created: { type: "date", editable: false },
                            Date_Edited: { type: "date", editable: true },
                            IsDelete: { type: "boolean", editable: false },
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
                    field: "TenThuoc", title: "Tên thuốc", width: "272px",
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
                    field: "SoLuong", title: "Số Lượng", width: "272px",
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
                    field: "Ghi_Chu", title: "Ghi Chú", width: "272px",
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
    //$scope.LocThuoc = function () {
    //    var TenLoaiThuoc = " ";
    //    if (!IsEmpty($scope.itemSearch.LoaiThuoc)) {
    //        TenLoaiThuoc = $scope.itemSearch.LoaiThuoc;
    //    }
    //    var TenThuoc = " ";
    //    if (!IsEmpty($scope.itemSearch.Thuoc)) {
    //        TenThuoc = $scope.itemSearch.Thuoc;
    //    }
    //    if (TenLoaiThuoc == " ") {
    //        grid.data("kendoGrid").dataSource.filter({});
    //    }
    //    else {
    //        if (TenThuoc == " ") {
    //            grid.data("kendoGrid").dataSource.filter({ field: "TenLoaiThuoc", operator: "eq", value: TenLoaiThuoc });
    //        }
    //            else {
    //                grid.data("kendoGrid").dataSource.filter({
    //                    logic: "and",
    //                    filters: [
    //                        { field: "TenLoaiThuoc", operator: "eq", value: TenLoaiThuoc },
    //                        { field: "TenThuoc", operator: "eq", value: TenThuoc },
    //                    ],
    //                });
    //            }
    //        }

    //    }
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
        url: "/BenhAn/GetAll",
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