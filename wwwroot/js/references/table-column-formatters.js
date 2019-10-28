// Функции форматирования данных для Bootstrap Table (атрибут колонки data-formatter)

// Дата и время

function ColFmtDateDDMMYYYY(value, row, index) {
    var date = new Date(value);
    return date.getDate().toString().padStart(2, '0') + '.' + (date.getMonth()+1).toString().padStart(2, '0') + '.' + date.getFullYear().toString().padStart(4, '0');
    //return date.toLocaleDateString("ru-RU", { year: 'numeric', month: '2-digit', day: '2-digit'});
};

function ColFmtDateDDMMYYYYTimeHHMMSS(value, row, index) {
    return ColFmtDateDDMMYYYY(value, row, index) + ' ' + ColFmtDateTimeHHMMSS(value, row, index);
};

function ColFmtDateTimeHHMMSS(value, row, index) {
    var date = new Date(value);
    return date.toLocaleTimeString("ru-RU", { hour: '2-digit', minute: '2-digit', second: '2-digit' });
};

// Булевые значения

function ColFmtBoolSimple(value, row, index) {
    if (value === '')
        return [
            '<i class="fa fa-square"></i>'
        ].join('');
    else if (value == '0')
        return [
            '<i class="far fa-square"></i>'
        ].join('');
    else
        return [
            '<i class="far fa-check-square"></i>'
        ].join('');
};
