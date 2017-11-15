// Hoàng Nck 
"use strict"; // cái này dùng cảnh báo lỗi khi viết sai trên này

function GetToday() {
    var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth() + 1;
    var yyyy = today.getFullYear();

    if (dd < 10) {
        dd = '0' + dd
    }

    if (mm < 10) {
        mm = '0' + mm
    }

    return today = mm + '/' + dd + '/' + yyyy;
}

function GetStartMonth() {
    var today = new Date();

    return new Date(today.getFullYear(), today.getMonth(), 1);
}

function GetEndMonth() {
    var today = new Date();

    return new Date(today.getFullYear(), today.getMonth() + 1, 0);
}

  
function CreateMaHopDong(MaDuAn, MaCanHo) {
    var code = "";
    $.ajax({
        url: '/HopDong/GenerateMaHopDong',
        type: "post",
        async: false,
        data: JSON.stringify({ MaDuAn: MaDuAn, MaCanHo: MaCanHo }),
        dataType: "json",
        contentType: "application/json; charset=utf-8",
        success: function (response) {
            code = response;

        }
    });
    return code;
}

function IsEmpty(val) {
    return (val === undefined || val === null || val.length <= 0) ? true : false;
}

function HeaderCheckBoxTemplate() {
    return "<input type='checkbox' id='masterCheckBox' onclick='checkAllCheckBox(this)'/>";
}

function CellCheckBoxTemplate() {
    return "<input type='checkbox' class='chkbx' />";
}

function checkAllCheckBox(ele) {
    var state = $(ele).is(':checked');
    $('.chkbx').prop('checked', state);

}

function checkAllYCGX(ele) {
    var state = $(ele).is(':checked');
    var grid = $('#gridLapYCDL').data('kendoGrid');
    $.each(grid.dataSource.view(), function () {
        if (this['LapYeuCau'] != state)
            this.dirty = true;
        this['LapYeuCau'] = state;
    });
    grid.refresh();
}
function checkAllPhieuXuatKho(ele) {
    var state = $(ele).is(':checked');
    var grid = $('#gridDsgx').data('kendoGrid');
    $.each(grid.dataSource.view(), function () {
        if (this['LapPhieuKho'] != state)
            this.dirty = true;
        this['LapPhieuKho'] = state;
    });
    grid.refresh();
}
function checkAllDsGXXuatKho(ele) {
    var state = $(ele).is(':checked');
    var grid = $('#grid').data('kendoGrid');
    $.each(grid.dataSource.view(), function () {
        if (this['IsXuatKho'] != state)
            this.IsXuatKho = true;
        this['IsXuatKho'] = state;
    });
    grid.refresh();
}

function checkAllIsAdd(ele) {
    var state = $(ele).is(':checked');
    var grid = $('#gridPhanQuyenChiTiet').data('kendoGrid');
    $.each(grid.dataSource.view(), function () {
        if (this['IsAdd'] != state)
            this.dirty = true;
        this['IsAdd'] = state;
    });
    grid.refresh();
}
function checkAllIsView(ele) {
    var state = $(ele).is(':checked');
    var grid = $('#gridPhanQuyenChiTiet').data('kendoGrid');
    $.each(grid.dataSource.view(), function () {
        if (this['IsView'] != state)
            this.dirty = true;
        this['IsView'] = state;
    });
    grid.refresh();
}

function checkAllIsEdit(ele) {
    var state = $(ele).is(':checked');
    var grid = $('#gridPhanQuyenChiTiet').data('kendoGrid');
    $.each(grid.dataSource.view(), function () {
        if (this['IsEdit'] != state)
            this.dirty = true;
        this['IsEdit'] = state;
    });
    grid.refresh();
}
function checkAllIsDelete(ele) {
    var state = $(ele).is(':checked');
    var grid = $('#gridPhanQuyenChiTiet').data('kendoGrid');
    $.each(grid.dataSource.view(), function () {
        if (this['IsDelete'] != state)
            this.dirty = true;
        this['IsDelete'] = state;
    });
    grid.refresh();
}
function checkAllIsExport(ele) {
    var state = $(ele).is(':checked');
    var grid = $('#gridPhanQuyenChiTiet').data('kendoGrid');
    $.each(grid.dataSource.view(), function () {
        if (this['IsExport'] != state)
            this.dirty = true;
        this['IsExport'] = state;
    });
    grid.refresh();
}
function checkAllLichGiaoNha(ele) {
    var state = $(ele).is(':checked');
    var grid = $('#gridMain').data('kendoGrid');
    $.each(grid.dataSource.view(), function () {
        if (this['IsGiaoNha'] != state)
            this.IsGiaoNha = true;
        this['IsGiaoNha'] = state;
    });
    grid.refresh();
}
(function ($) {
    $.MySc = {
        pageable: {
            refresh: true,
            pageSizes: true,
            messages: {
                display: "{0}-{1}/{2}",
                empty: "Không có dữ liệu",
                page: "Trang",
                of: "của {0}",
                itemsPerPage: "",
                first: "Trang đầu",
                previous: "Trang trước",
                next: "Trang kế",
                last: "Trang cuối",
                refresh: "Làm mới"
            }
        },
        filterable: {
            extra: false,
            messages: {
                info: "Hiển thị dữ liệu:", // sets the text on top of the filter menu
                filter: "Lọc", // sets the text for the "Filter" button
                clear: "Bỏ lọc", // sets the text for the "Clear" button

                // when filtering boolean numbers
                isTrue: "True", // sets the text for "isTrue" radio button
                isFalse: "False", // sets the text for "isFalse" radio button

                //changes the text of the "And" and "Or" of the filter menu
                and: "Và",
                or: "Hoặc"
            },
            operators: {
                string: {
                    contains: "Lọc gần đúng",
                    //startswith: "Lọc gần đúng",
                    eq: "Lọc chính xác",
                    neq: "Tất cả trừ"
                },
                number: {
                    eq: "Bằng",
                    neq: "Khác",
                    gte: "Lớn hơn bằng",
                    gt: "Lớn hơn",
                    lte: "Nhỏ hơn bằng",
                    lt: "Nhỏ hơn"
                },
                date: {
                    eq: "Tìm chính xác",
                    neq: "Khác ngày",
                    gte: "Lớn hơn bằng",
                    gt: "Lớn hơn",
                    lte: "Nhỏ hơn bằng",
                    lt: "Nhỏ hơn"
                }
            }
        },

        columnMenu: {
            messages: {
                sortAscending: "Sắp xếp tăng dần",
                sortDescending: "Sắp xếp giảm dần",
                filter: "Bộ lọc",
                columns: "Cột"
            }
        },

        //Xuat excel

        HtmlToExcel: function (table, name) {
            var uri = 'data:application/vnd.ms-excel;base64,'
                , template = '<html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:x="urn:schemas-microsoft-com:office:excel" xmlns="http://www.w3.org/TR/REC-html40"><head><!--[if gte mso 9]><xml><x:ExcelWorkbook><x:ExcelWorksheets><x:ExcelWorksheet><x:Name>{worksheet}</x:Name><x:WorksheetOptions><x:DisplayGridlines/></x:WorksheetOptions></x:ExcelWorksheet></x:ExcelWorksheets></x:ExcelWorkbook></xml><![endif]--><meta http-equiv="content-type" content="text/plain; charset=UTF-8"/></head><body><table>{table}</table></body></html>'
                , base64 = function (s) { return window.btoa(unescape(encodeURIComponent(s))) }
                , format = function (s, c) { return s.replace(/{(\w+)}/g, function (m, p) { return c[p]; }) }
            if (!table.nodeType) table = document.getElementById(table)
            var ctx = { worksheet: name || 'Worksheet', table: table.innerHTML }
            window.location.href = uri + base64(format(template, ctx))
        },
        CbxDataKendo: function (url, param) {
            return new kendo.data.DataSource({
                type: "json",
                transport: {
                    read: function (options) {
                        $.ajax({
                            type: "POST",
                            url: url,
                            data: param,
                            contentType: "application/json; charset=utf-8",
                            dataType: "json",
                            success: function (response) {
                                options.success(response.d);
                            },
                            error: function () {
                            }
                        });
                    },
                }
            });
        },
        DateToString: function (date, strType) {
            if (date == null) return null;
            var day = date.getDate();
            day = day < 10 ? "0" + day : day;
            var month = date.getMonth() + 1;
            month = month < 10 ? "0" + month : month;
            var year = date.getFullYear()
            if (strType == "ddmmyyyy")
                return day + month + year;
            if (strType == "mmyyyy")
                return month + year;
            if (strType == "mm/yyyy")
                return month + "/" + year;
            if (strType == "yyyymm")
                return year + month;
            if (strType == "yyyymmdd")
                return year + month + day;
            return day + "/" + month + "/" + year;
        },
        DateStrToString: function (date) {
            if (date == null) return '';
            var ngay = '', thang = '', nam = '';
            if (date.length == 8) {
                nam = date.substr(0, 4);
                thang = date.substr(4, 2);
                ngay = date.substr(6, 2);
                return ngay + "/" + thang + "/" + nam;
            } else if (date.length == 6) {
                nam = date.substr(0, 4);
                thang = date.substr(4, 2);
                return thang + "/" + nam;
            }
        },
        StringToDate: function (str, type) {
            if (str == null || str == "") return null;
            if (type == "yyyymm") {
                var month = str.substr(4);
                var year = str.substr(0, 4);
                month = parseInt(month) - 1
                return new Date(year, month, 1);
            }
            if (type == "yyyymmdd") {
                var day = str.substr(6)
                var month = str.substr(4, 2);
                var year = str.substr(0, 4);
                month = parseInt(month) - 1
                return new Date(year, month, day);
            }
            return null;
        },
        RowMix: function (eleSelect) {
            var tenSp = $($(eleSelect).get(0)).text();
            var count = 0;
            var ele = $($(eleSelect).get(0));
            $(eleSelect).each(function () {
                if ($(this).text() != tenSp) {
                    ele.attr("rowspan", count);
                    count = 1;
                    tenSp = $(this).text();
                    ele = $(this);
                } else if ($(this).text() == tenSp) {
                    count++;
                    if (count > 1) $(this).remove();
                }
            });
            ele.attr("rowspan", count);
        },
        MyComfirm: function (title, message, func) {
            if ($("#MyInfo").length == 0) {
                $("body").append("<div id='MyInfo' style='position: fixed; '>"
                    + "<div><img style='cursor:pointer' onclick='$.MySc.CloseMyInfo();' src='/Content/Images/DeleteRed.png' /><h2>" + title + "</h2><div style='clear:both'></div></div>"
                    + "<center>" + message + "</center>"
                    + "<center><input id='OkButComFirm' onclick='$.MySc.CloseMyInfo();' class='k-button' type='submit' value='Có' /><input class='k-button' onclick='$.MySc.CloseMyInfo();' type='submit' value='Không' /></center>"
                    + "</div>");
                var top = ($(window).height() / 2) - ($("#MyInfo").outerHeight() / 2);;
                var left = ($(window).width() / 2) - ($("#MyInfo").outerWidth() / 2);
                $("#MyInfo").css({
                    top: top,
                    left: left,
                }).stop().hide().show("explode", 500);
                $("body").append("<div id='BackgroundHide'></div>");
                $("#MyInfo").draggable();
                $("#OkButComFirm").click(func);
            }
        },
        MyInfo: function (title, message) {
            if ($("#MyInfo").length == 0) {
                var apEle = $("div[ng-app='myApp']");
                apEle = apEle.length == 1 ? apEle : $("body");
                apEle.append("<div id='MyInfo' style='position: fixed; '>"
                    + "<div><img style='cursor:pointer' onclick='$.MySc.CloseMyInfo();' src='/Content/Images/DeleteRed.png' /><h2>" + title + "</h2><div style='clear:both'></div></div>"
                    + "<center></center>"
                    + "</div>");
                $("#MyInfo center").append(message);
                var top = ($(window).height() / 2) - ($("#MyInfo").outerHeight() / 2);;
                var left = ($(window).width() / 2) - ($("#MyInfo").outerWidth() / 2);
                $("#MyInfo").css({
                    top: top,
                    left: left,
                }).stop().hide().show("blind", 500);
                $("body").append("<div id='BackgroundHide'></div>");
                $("#MyInfo").draggable();
            }
        },
        MySuccess: function (title, message, time) {
            if ($("#MySuccess").length == 0) {
                var id = '"#MySuccess"';
                $("body").append("<div id='MySuccess' style='position: fixed; '>"
                    + "<div><img style='cursor:pointer' onclick='$.MySc.CloseMyMessage(" + id + ");' src='/Content/Images/DeleteRed.png' /><h2>" + title + "</h2><div style='clear:both'></div></div>"
                    + "<center>" + message + "</center>"
                    + "</div>");
                var top = ($(window).height() / 2) - ($("#MySuccess").outerHeight() / 2);
                var left = ($(window).width() / 2) - ($("#MySuccess").outerWidth() / 2);
                $("#MySuccess").css({
                    top: top,
                    left: left,
                }).stop().hide().show("explode", 500);
                $("#MySuccess").draggable();
            } else $("#MySuccess center").append("<br/>" + message);
            //self.setTimeout(function () {
            //    $("#MySuccess").hide("explode", 500, function () {
            //        $(this).remove();
            //    })
            //}, time)
        },
        MyError: function (title, message) {
            if ($("#MyError").length == 0) {
                var id = '"#MyError"';
                $("body").append("<div id='MyError' style='position: fixed; '>"
                    + "<div><img style='cursor:pointer' onclick='$.MySc.CloseMyMessage(" + id + ");' src='/Content/img/DeleteRed.png' /><h2>" + title + "</h2><div style='clear:both'></div></div>"
                    + "<center>" + message + "</center>"
                    + "</div>");
                var top = ($(window).height() / 2) - ($("#MyError").outerHeight() / 2);;
                var left = ($(window).width() / 2) - ($("#MyError").outerWidth() / 2);
                $("#MyError").css({
                    top: top,
                    left: left
                }).stop().hide().show("explode", 500);
                $("#MyError").draggable();
            } else $("#MyError center").append("<br/>" + message);
        },
        CloseMyMessage: function (id) {
            $(id).effect("explode", 500, function () {
                $(this).remove();
            })
        },
        CloseMyInfo: function () {
            var op = 'explode';
            if ($("#MyInfo").height() > 0.7 * $("body").height())
                op = 'blind';
            $("#MyInfo").effect(op, 500, function () {
                $(this).remove();
            });
            $("#BackgroundHide").effect("blind", 500, function () {
                $(this).remove();
            })
        },
        LoadHidden: function () {
            $("<div id='nvk_popup_hidden'/>").css({
                "z-index": '999',
                "background-color": "black",
                'width': "100%",
                'height': "100%",
                'position': 'fixed',
                'left': '0',
                'top': '0',
                'opacity': '0.2'
            }).appendTo(document.body);
            if ($(".loadingAjax").length == 0) {
                if ($(".loadingAjax").length == 0) $('<center class="loadingAjax" />').css({
                    'position': 'fixed',
                    'width': '100%',
                    'top': '40%',
                    'z-index': '99999999',
                }).append('<img src="/Content/Images/loading.gif" width="70px" height="70px"/>').appendTo(document.body);
            }
        },
        RemoveHidden: function () {
            $(".loadingAjax img").toggle("explode");
            var searchEle = $("<div id='nvk_popup_hidden'/>");
            if (searchEle != null) {
                searchEle.remove();
                if ($("#nvk_popup_hidden").length > 0)
                    $("#nvk_popup_hidden").remove();
            }
            $(".loadingAjax").remove();
        },
        onblurComboboxKenDo: function (ele, Idchildren) {
            $(ele).html($("#" + Idchildren).data("kendoComboBox").text());
        },
        ComboboxKenDo: function (ele, data, strVal, strText, plac, cascadeFrom, Idchildren, Fcchange, FcClose, Type, value) {
            if ($(ele).children().length == 0) {
                $(ele).html('<input type="search" id="' + Idchildren + '" style="width:100%" />');
                $("#" + Idchildren).kendoComboBox({
                    //filter: "contains",
                    autoBind: false,
                    placeholder: plac,
                    dataTextField: strText,
                    dataValueField: strVal,
                    dataSource: data,
                    cascadeFrom: cascadeFrom,
                    dataBound: function () {
                        this.value(value);
                    },
                    change: Fcchange,
                    close: function (e) {
                        if (Type == 'ID')
                            $(ele).html($("#" + Idchildren).val());
                        else $(ele).html($("#" + Idchildren).data("kendoComboBox")._prev);
                        if (FcClose != null)
                            FcClose(e);
                    },
                });
                $(ele).find(".k-select").click();
            }
        },
        isInteger: function (x) {
            if (x == "" || x == null) return false;
            return x % 1 === 0;
        },
        DatePickerKenDo: function (ele, Idchildren, Fcchange, FcClose, data) {
            var arr = data.split("/")
            if ($(ele).children().length == 0) {
                $(ele).html('<input type="search" id="' + Idchildren + '" style="width:100%" />');
                $("#" + Idchildren).kendoDatePicker({
                    value: new Date(parseInt(arr[2]), parseInt(arr[1]) - 1, parseInt(arr[0])),
                    parseFormats: ["dd/MM/yyyy"],
                    format: "dd/MM/yyyy",
                    change: Fcchange,
                    close: function (e) {
                        $(ele).html($("#" + Idchildren).val());
                        if (FcClose != null)
                            FcClose(e);
                    },
                });
                $(ele).find(".k-select").click();
            }
        }
    };
})(jQuery);