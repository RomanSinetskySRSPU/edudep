$('.reference-single-entity').ready(function () {
    // Инициализация переменных
    var form = $(this).find('form');
    var toolbar = $(this).find('.reference-data-toolbar');
    var table = $(this).find('.reference-data-table');
    var btnOk = $(this).find('.reference-btn-ok');
    var btnAdd = $(this).find('.reference-btn-add');
    var btnEdt = $(this).find('.reference-btn-edit');
    var btnRem = $(this).find('.reference-btn-remove');
    var modal = $(this).find('.reference-modal-dlg');
    var rowId = null;
    var dialogDataUrl = null;

    // Инициализация валидатора
    form.validate({
        errorPlacement: function (error, element) { return true; },
        invalidHandler: function (form, validator) {
            var errors = validator.numberOfInvalids();
            if (errors) {
                validator.errorList[0].element.focus();
            }
        }
    });
    // TODO: сделать так, чтобы для работы ваалидации не нужно было писать атрибут name="..." в html

    // Инииализация таблицы
    // TODO: сделать так, чтобы колонку с индикатором не нужно было задавать в html
    // TODO: сделать, чтобы тулбар не нужно было связывать в html по id
    //var indCol = $('<th class="bs-checkbox table-indicator" style="width: 10px; " data-field="0"><div class="th-inner "></div><div class="fht-cell"></div></th>');
    //$(table).find('thead tr').append(indCol);
    //table.bootstrapTable();



    var scrollToRow = function (rowId) {
        var top = 0;
        var h = 0;
        var list = table.find('tbody tr');
        for (var i = 0; i < list.length; i++) {
            var v = list[i];
            h = $(v).height();
            var s = v.getAttribute('data-uniqueid');
            if (s == rowId) break;
            top += h;
        }
        table.bootstrapTable('scrollTo', top);
    };
    table.on('post-body.bs.table', function () {
        if (rowId != undefined) {
            table.bootstrapTable('checkBy', { 'field': 'id', 'values': [rowId] });
            scrollToRow(rowId);
            rowId = undefined;
        }
    });

    //$('.multi-switch').multiSwitch();

    // Инициализация полей
    var fields = new Array();
    $(this).find('form').find('input[data-field], select[data-field]').each(function () {
        var name = $(this).attr('data-field');
        var nameid = $(this).attr('data-field-id');
        var type = $(this).get(0).tagName.toLowerCase();
        var itype = $(this).attr('type');
        var comp = $(this).attr('control');
        if (comp === undefined) comp = 'text';
        comp = comp.toLowerCase();
        if ((name) && name !== "") {
            var elem = {
                "type": type,
                "name": name,
                "control": comp,
                "itype": itype,
                "element": $(this)  
            };
            if ((nameid) && nameid !== "") elem['nameid'] = nameid;
            fields.push(elem);
        }
        // элементы управления
        if (itype && itype.toLowerCase() === 'checkbox') {
            $(this).multiSwitch();
        }
        if (comp === 'datetimepicker') {
            $(this).datetimepicker({
                locale: 'ru',
                format: 'DD.MM.YYYY HH:mm:ss',
                showTodayButton: true,
                showClear: true,
                showClose: true,
                tooltips: {
                    today: 'К текущему дню',
                    clear: 'Очистить',
                    close: 'Закрыть',
                    selectMonth: 'Выбор месяца',
                    prevMonth: 'Предыдущий',
                    nextMonth: 'Следующий',
                    selectYear: 'Выбор года',
                    prevYear: 'Предыдущий',
                    nextYear: 'Следующий',
                    selectDecade: 'Выбор декады',
                    prevDecade: 'Предыдущая',
                    nextDecade: 'Следующая',
                    prevCentury: 'Предыдущий',
                    nextCentury: 'Следующий',
                    pickHour: 'Выбор часа',
                    incrementHour: 'Увеличить часы',
                    decrementHour: 'Уменьшить часы',
                    pickMinute: 'Выбор минут',
                    incrementMinute: 'Увеличить минуты',
                    decrementMinute: 'Уменьшить минуты',
                    pickSecond: 'Выбор секунд',
                    incrementSecond: 'Увеличить секунды',
                    decrementSecond: 'Уменьшить секунды',
                    togglePeriod: 'Переключить период',
                    selectTime: 'Выбор времени'
                }
            });
        }
        if (comp === 'datepicker') {
            $(this).datetimepicker({
                locale: 'ru',
                format: 'DD.MM.YYYY',
                showTodayButton: true,
                showClear: true,
                showClose: true,
                tooltips: {
                    today: 'К текущему дню',
                    clear: 'Очистить',
                    close: 'Закрыть',
                    selectMonth: 'Выбор месяца',
                    prevMonth: 'Предыдущий',
                    nextMonth: 'Следующий',
                    selectYear: 'Выбор года',
                    prevYear: 'Предыдущий',
                    nextYear: 'Следующий',
                    selectDecade: 'Выбор декады',
                    prevDecade: 'Предыдущая',
                    nextDecade: 'Следующая',
                    prevCentury: 'Предыдущий',
                    nextCentury: 'Следующий',
                    pickHour: 'Выбор часа',
                    incrementHour: 'Увеличить часы',
                    decrementHour: 'Уменьшить часы',
                    pickMinute: 'Выбор минут',
                    incrementMinute: 'Увеличить минуты',
                    decrementMinute: 'Уменьшить минуты',
                    pickSecond: 'Выбор секунд',
                    incrementSecond: 'Увеличить секунды',
                    decrementSecond: 'Уменьшить секунды',
                    togglePeriod: 'Переключить период',
                    selectTime: 'Выбор времени'
                }
            });
        }
        if (comp === 'timepicker') {
            $(this).datetimepicker({
                locale: 'ru',
                format: 'HH:mm:ss',
                showTodayButton: false,
                showClear: true,
                showClose: true,
                tooltips: {
                    today: 'К текущему дню',
                    clear: 'Очистить',
                    close: 'Закрыть',
                    selectMonth: 'Выбор месяца',
                    prevMonth: 'Предыдущий',
                    nextMonth: 'Следующий',
                    selectYear: 'Выбор года',
                    prevYear: 'Предыдущий',
                    nextYear: 'Следующий',
                    selectDecade: 'Выбор декады',
                    prevDecade: 'Предыдущая',
                    nextDecade: 'Следующая',
                    prevCentury: 'Предыдущий',
                    nextCentury: 'Следующий',
                    pickHour: 'Выбор часа',
                    incrementHour: 'Увеличить часы',
                    decrementHour: 'Уменьшить часы',
                    pickMinute: 'Выбор минут',
                    incrementMinute: 'Увеличить минуты',
                    decrementMinute: 'Уменьшить минуты',
                    pickSecond: 'Выбор секунд',
                    incrementSecond: 'Увеличить секунды',
                    decrementSecond: 'Уменьшить секунды',
                    togglePeriod: 'Переключить период',
                    selectTime: 'Выбор времени'
                }
            });
        }
    });
    //alert(fields);
    var formAjaxParams = function (serviceOnly) {
        var params = new Object();
        var options = table.bootstrapTable('getOptions');
        var psize = options.pageSize;
        var sname = options.sortName;
        var sorder = options.sortOrder;
        var searchstr = options.searchText;
        params['sort'] = sname;
        params['order'] = sorder;
        params['search'] = searchstr;
        params['pagesize'] = psize;
        if (!serviceOnly) {
            fields.forEach(function (item) {
                if (item['type'] === 'select') {
                    var value = $(item['element']).val();
                    params[item['nameid']] = value;
                } else {
                    var value = "";
                    if (item['control'] === 'datetimepicker' || item['control'] === 'timepicker') {
                        var date = $(item['element']).data("DateTimePicker").date();
                        if (date) value = date.toISOString(); else value = date;
                    } else if (item['control'] === 'datepicker') {
                        var date = $(item['element']).data("DateTimePicker").date();
                        if (date) value = date.startOf('day').toISOString(); else value = date;
                    } else if (item['itype'] === 'checkbox') {
                        //var checkbox = $(item['element']);
                        //value = checkbox.prop('checked');
                        value = $(item['element']).val();
                        //value = $(item['element']).is(":checked");
                    } else
                        value = $(item['element']).val();
                    params[item['name']] = value;
                }
            });
        }
        return params;
    };
    var fillFormFields = function (empty) {
        var row = table.bootstrapTable('getSelections')[0];
        if (!empty && row == undefined) return false;
        fields.forEach(function (item) {
            if (item['type'] === 'select') {
                var dataurl = $(item['element']).attr('data-url');
                var value = null;
                if (!empty) value = row[item['nameid']];
                helper.fillSelectUrl($(item['element']), dataurl, value);
            } else {
                var value = '';
                if (!empty) value = row[item['name']];

                if (item['control'] === 'datetimepicker') {
                    var date = new Date(value);
                    var str = ColFmtDateDDMMYYYYTimeHHMMSS(date);
                    $(item['element']).val(str);
                } else
                if (item['control'] === 'datepicker') {
                    var date = new Date(value);
                    var str = ColFmtDateDDMMYYYY(date);
                    $(item['element']).val(str);
                } else
                if (item['control'] === 'timepicker') {
                    var date = new Date(value);
                    var str = ColFmtDateTimeHHMMSS(date);
                    $(item['element']).val(str);
                } else if (item['itype'] === 'checkbox') {
                    //$(item['element']).prop('checked', value);
                } else 
                    $(item['element']).val(value);
            }
        });
        return true;
    };

    // Инициализация кнопок
    if (btnOk) {
        btnOk.click(function () {
            var fvld = $(form).valid();
            if (!fvld) return;
            var ajaxParams = formAjaxParams(false);
            var id = ajaxParams['id'];
            if (id === '')
                table.bootstrapTable('resetSearch', '');
            $.ajax({
                url: dialogDataUrl,
                data: ajaxParams,
                success: function (response) {
                    if (response.success) {
                        rowId = response.rowid;
                        table.bootstrapTable('selectPage', response.page);
                        modal.modal('hide');
                    } else {
                        dialog.error({ message: response.message });
                    }
                },
                error: function (response) {
                    dialog.error({ message: 'Ошибка сервера: ' + response.responseText });
                    modal.modal('hide');
                }
            });
        });
    }
    if (btnAdd) {
        btnAdd.click(function () {
            dialogDataUrl = $(btnAdd).attr('data-url');
            fillFormFields(true);
            $('div.error').remove();
            $('.error').removeClass('error');
            modal.modal('show');
        });
    }
    if (btnEdt) {
        btnEdt.click(function () {
            //if (!fillFormFields(false)) return;
            dialogDataUrl = $(btnEdt).attr('data-url');
            $('div.error').remove();
            $('.error').removeClass('error');
            modal.modal('show');
            fillFormFields(false);
        });
    }
    if (btnRem) {
        var remUrl = $(btnRem).attr('data-url');
        btnRem.click(function () {
            var row = table.bootstrapTable('getSelections')[0];
            if (row == undefined) return;
            var ajaxParams = formAjaxParams(true);
            ajaxParams['id'] = row['id'];
            var title = $('.modal-title').val();
            dialog.confirmation({
                message: 'Удалить запись?',
                title: title,
                callback: function (result) {
                    if (result) {
                        $.ajax({
                            url: remUrl,
                            data: ajaxParams,
                            success: function (response) {
                                if (response.success) {
                                    rowId = response.rowid;
                                    table.bootstrapTable('selectPage', response.page);
                                } else {
                                    dialog.error({ message: response.message });
                                }
                            },
                            error: function (response) {
                                dialog.error({ message: 'Ошибка сервера: ' + response.responseText });
                            }
                        });
                        modal.modal('hide');
                    }
                }
            });
        });
    }
});
