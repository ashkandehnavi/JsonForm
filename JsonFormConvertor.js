var JsonFormConvertor = function () {

    var getValueOfObject = function (object, string) {
        if (string != undefined) {
            var spliter = string.split('.');
            if (spliter.length > 0) {
                var result = {};

                result = object[spliter[0]];
                if (result != undefined) {
                    for (var i = 1; i < spliter.length; i++) {
                        result = result[spliter[i]]
                    }
                    return result;
                }
                else {
                    return '---';
                }
            }
            else
                return '---';
        }
        else
            return '---';

    }
    var setValueToObject = function (object, string, value) {

        var items = string.split(".");
        var output = object;
        var ref = output;

        for (var i = 0; i < items.length - 1; i++) {
            if (ref[items[i]] == undefined)
                ref[items[i]] = {};
            ref = ref[items[i]];
        }

        if (value == undefined)
            ref[items[items.length - 1]] = null;
            //else if (Array.isArray(value))
            //    ref[items[items.length - 1]] = value;
        else
            ref[items[items.length - 1]] = value;

        return output;
    }

    var getData = function (container) {
        var obja = {};

        var elems = $(container + ' input');
        $.each(elems, function (i, o) {

            var type = $(o).attr('type');
            if (type == 'text' || type == 'email' || type == 'password' || type == 'tel' || type == 'number' || type == 'search' || type == 'url' || type == 'hidden')
                setValueToObject(obja, $(o).attr('data-bind'), $(o).val());
            else if (type == 'checkbox')
                setValueToObject(obja, $(o).attr('data-bind'), $(o).is(':checked'));
            else if (type == 'radio')
                setValueToObject(obja, $(o).attr('data-bind'), $("input[name='" + $(o).attr('name') + "']:checked").val());;
        });

        var selects = $('#frm select');
        $.each(selects, function (i, o) {
            setValueToObject(obja, $(o).attr('data-bind'), $(o).val());
        });

        return obja;
    }
    var setData = function (container, obj) {

        var elems = $(container + ' input');
        $.each(elems, function (i, o) {
            var elem = $(o);

            var type = elem.attr('type');
            var val = getValueOfObject(obj, elem.attr('data-bind'));

            if (type == 'text' || type == 'email' || type == 'password' || type == 'tel' || type == 'number' || type == 'search' || type == 'url' || type == 'hidden')
                elem.val(val);
            else if (type == 'checkbox')
                elem.prop('checked', val);
            else if (type == 'radio')
                elem.attr('value') == val ? elem.prop('checked', true) : elem.prop('checked', false);

        });

        var selects = $('#frm select');
        $.each(selects, function (i, o) {
            var elem = $(o);
            var val = getValueOfObject(obj, elem.attr('data-bind'));

            elem.val(val);
        });
    }

    return {
        getData: function (container) {
            return getData(container);
        },
        setData: function (container, obj) {
            setData(container, obj);
        }
    }
}