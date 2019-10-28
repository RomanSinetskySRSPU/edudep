$(document).ready(function () {

    var Table = $('#SpecialityGroup_Table');
    var Modal = $('#SpecialityGroup_Modal');
    var RowId = undefined;

    var edtId = $('#SpecialityGroup_Modal_Id');
    var edtName = $('#SpecialityGroup_Modal_Name');
    var edtShortName = $('#SpecialityGroup_Modal_ShortName');
    var edtCode = $('#SpecialityGroup_Modal_Code');

    var form = $("#SpecialityGroup_Modal_Form");

    form.validate({
        errorPlacement: function (error, element) { return true; },
        invalidHandler: function(form, validator) {
                var errors = validator.numberOfInvalids();
                if (errors) {
                    validator.errorList[0].element.focus();
                }
            }
    });

    $('#SpecialityGroup_ModalOk').on('click', function () {
        if (!form.valid()) return;

        let id = edtId.val();
        let name = edtName.val();
        let shortname = edtShortName.val();
        let code = edtCode.val();

        if (id === '')
            Table.bootstrapTable('resetSearch', '');

        let options = Table.bootstrapTable('getOptions');
        let psize = options.pageSize;
        let sname = options.sortName;
        let sorder = options.sortOrder;
        let searchstr = options.searchText;

        $.ajax({
            url: '/SpecialityGroups/AddOrEditData',
            data: {
                // system
                sort: sname,
                order: sorder,
                search: searchstr,
                pagesize: psize,
                // entity data
                id: id,
                name: name,
                shortname: shortname,
                code: code
            },
            success: function (response) {
                if (response.success) {
                    RowId = response.rowid;
                    Table.bootstrapTable('selectPage', response.page);
                    Modal.modal('hide');
                } else {
                    dialog.error({ message: response.message });
                }
            },
            error: function (response) {
                dialog.error({ message: 'Ошибка сервера: ' + response.responseText });
                Modal.modal('hide');
            }
        });
    });

    $('#SpecialityGroup_BtnAdd').on('click', function () {
        edtId.val('');
        edtName.val('');
        edtShortName.val('');
        edtCode.val('');

        $("div.error").remove();
        $(".error").removeClass("error");
        Modal.modal('show');
    });

    $('#SpecialityGroup_BtnEdt').on('click', function () {
        var row = Table.bootstrapTable('getSelections')[0];
        if (row == undefined) return;

        edtId.val(row.id);
        edtName.val(row.name);
        edtShortName.val(row.shortname);
        edtCode.val(row.code);

        $("div.error").remove();
        $(".error").removeClass("error");
        Modal.modal('show');
    });

    $('#SpecialityGroup_BtnRem').on('click', function () {
        var row = Table.bootstrapTable('getSelections')[0];
        if (row == undefined) return;
        dialog.confirmation({
            message: 'Удалить запись?',
            title: 'Группа специальностей',
            callback: function (result) {
                if (result) {
                    let options = Table.bootstrapTable('getOptions');
                    let psize = options.pageSize;
                    let sname = options.sortName;
                    let sorder = options.sortOrder;
                    let searchstr = options.searchText;

                    $.ajax({
                        url: '/SpecialityGroups/RemoveData',
                        data: {
                            // system
                            sort: sname,
                            order: sorder,
                            search: searchstr,
                            pagesize: psize,
                            // entity data
                            id: row.id
                        },
                        success: function (response) {
                            if (response.success) {
                                RowId = response.rowid;
                                Table.bootstrapTable('selectPage', response.page);
                            } else {
                                dialog.error({ message: response.message });
                            }
                        },
                        error: function (response) {
                            dialog.error({ message: 'Ошибка сервера: ' + response.responseText });
                        }
                    });
                    Modal.modal('hide');
                }
            }
        });
    });

    function scrollToRow(rowId) {
        var top = 0;
        var h = 0;
        var list = Table.find('tbody tr');
        for (var i = 0; i < list.length; i++) {
            var v = list[i];
            h = $(v).height();
            var s = v.getAttribute('data-uniqueid');
            if (s == rowId) break;
            top += h;
        }
        Table.bootstrapTable('scrollTo', top);
    }
    $('#SpecialityGroup_Table').on('post-body.bs.table', function () {
        if (RowId != undefined) {
            Table.bootstrapTable('checkBy', { 'field': 'id', 'values': [RowId] });
            scrollToRow(RowId);
            RowId = undefined;
        }
    });
});