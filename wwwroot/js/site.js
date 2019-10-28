// Please see documentation at https://docs.microsoft.com/aspnet/core/client-side/bundling-and-minification
// for details on configuring this project to bundle and minify static web assets.

// Write your JavaScript code.

var helper = new function () {


    var fillSelect = function ( select, data, selected, placeholdertext ) {
        select.empty();
        if (placeholdertext)
            select.append('<option selected="true" disabled>' + placeholdertext + '</option>');
        var index = 0;
        $.each(data, function (i, entry) {
            if (entry.id === selected) index = i;
            select.append($('<option value="' + entry.id + '">' + entry.name + '</option>'));
        });
        select.prop('selectedIndex', index);
    };

    var fillSelectUrl = function (select, url, selected, placeholdertext) {
        $.getJSON(url, function (data) {
            if (data) 
                fillSelect(select, data.data, selected, placeholdertext);

        });
    };

    var chooseSelect = function (select, id) {
        var index = 0;
        $(select).find('option').each(function (i, opt) {
            if (opt.value === id) {
                $(opt).attr('selected', 'selected');
                $(select).attr('selectedIndex', i);
                index = i;
            } else $(opt).removeAttr('selected');
        });
        select.prop('selectedIndex', index);
    };

    var pickSelect = function ( select ) {

    };

    return {
        fillSelect: fillSelect,
        fillSelectUrl: fillSelectUrl,
        chooseSelect: chooseSelect,
        pickSelect: pickSelect
    };
};