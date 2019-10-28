// Uses: bootstrap 4.1

var dialog = new function () {

    var information = function (params) {

        message = params.message;
        title = params.title;
        callback = params.callback;
        btncaption = params.btncaption;

        var el = document.getElementById('modal_dialog_simple_information');
        if (!el) {
            // create dialog elements
            var ele = document.createElement('div');
            ele.setAttribute('id', 'modal_dialog_simple_information');
            ele.className = 'modal fade';
            ele.setAttribute('tabindex', '-1');
            ele.setAttribute('role', 'dialog');
            document.body.appendChild(ele);
            var ih =
                '    <div class="modal-dialog" role="document"> ' +
                '        <div class="modal-content"> ' +
                '            <div class="modal-header"> ' +
                '                <h5 id="modal_dialog_simple_information_title" class="modal-title">Dialog title</h5> ' +
                '                <button type="button" class="close" data-dismiss="modal" aria-label="Close"> ' +
                '                    <span aria-hidden="true">&times;</span> ' +
                '                </button> ' +
                '            </div> ' +
                '            <div class="modal-body"> ' +
                '                <p><span id="modal_dialog_simple_information_text">Dialog text</span></p> ' +
                '            </div> ' +
                '            <div class="modal-footer"> ' +
                '                <button type="button" class="btn btn-primary" data-dismiss="modal"> ' +
                '                    <span id="modal_dialog_simple_information_button">ОК</span> ' +
                '                </button> ' +
                '            </div> ' +
                '        </div> ' +
                '    </div> ';

            ele.innerHTML = ih;
            while (ele.innerHTML === "") {
                ele.innerHTML = ih;
            } 
        }
        let dlg = $('#modal_dialog_simple_information');
        let ttl = $('#modal_dialog_simple_information_title');
        let msg = $('#modal_dialog_simple_information_text');
        let btn = $('#modal_dialog_simple_information_button');

        if (!title) title = document.title;
        ttl.text(title);
        msg.text(message);
        if (!btncaption) btn.text(btncaption);

        dlg.unbind();
        dlg.on('hidden.bs.modal', function () {
            if (callback)
                callback();
            document.body.removeChild(dlg);
        });

        dlg.modal('show');
    };

    var error = function (params) {
        information(params);
    };

    var confirmation = function (params) {

        message = params.message;
        title = params.title;
        callback = params.callback;
        btncapyes = params.btncapyes;
        btncapno = params.btncapno;

        var el = document.getElementById('modal_dialog_simple_confirmation');
        if (!el) {
            // create dialog elements
            var ele = document.createElement('div');
            ele.setAttribute('id', 'modal_dialog_simple_confirmation');
            ele.className = 'modal fade';
            ele.setAttribute('tabindex', '-1');
            ele.setAttribute('role', 'dialog');
            document.body.appendChild(ele);
            var ih =
                '    <div class="modal-dialog" role="document"> ' +
                '        <div class="modal-content"> ' +
                '            <div class="modal-header bg-light"> ' +
                '                <h5 id="modal_dialog_simple_confirmation_title" class="modal-title">Dialog title</h5> ' +
                '                <button type="button" class="close" data-dismiss="modal" aria-label="Close"> ' +
                '                    <span aria-hidden="true">&times;</span> ' +
                '                </button> ' +
                '            </div> ' +
                '            <div class="modal-body"> ' +
                '                <p><span id="modal_dialog_simple_confirmation_text">Dialog text</span></p> ' +
                '            </div> ' +
                '            <div class="modal-footer bg-light"> ' +
                '               <button type="button" class="btn btn-success"> ' +
                '                   <span id="modal_dialog_simple_confirmation_yes">Да</span> ' +
                '               </button> ' +
                '               <button type="button" class="btn btn-secondary" data-dismiss="modal"> ' +
                '                   <span id="modal_dialog_simple_confirmation_no">Нет</span> ' +
                '               </button> ' +
                '            </div> ' +
                '        </div> ' +
                '    </div> ';

            ele.innerHTML = ih;
            while (ele.innerHTML === "") {
                ele.innerHTML = ih;
            }
        }
        let dlg = $('#modal_dialog_simple_confirmation');
        let ttl = $('#modal_dialog_simple_confirmation_title');
        let msg = $('#modal_dialog_simple_confirmation_text');
        let bty = $('#modal_dialog_simple_confirmation_yes');
        let btn = $('#modal_dialog_simple_confirmation_no');

        if (!title) title = document.title;
        ttl.text(title);
        msg.text(message);
        if (!btncapyes) bty.text(btncapyes);
        if (!btncapno) btn.text(btncapno);

        var evtTrigger = undefined;

        dlg.unbind();
        bty.unbind();

        bty.on('click', function () {
            evtTrigger = 'yes';
            dlg.modal('hide');
        });

        dlg.on('hidden.bs.modal', function () {
            if (callback)
                callback( evtTrigger === 'yes' );
        });

        dlg.modal('show');
    };

    return {
        information: information,
        error: error,
        confirmation: confirmation
    };
}
