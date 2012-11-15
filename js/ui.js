function button( options ){
    var _default = {
        'Id' : '',
        'Value' : '',
        'Click' : '',
        'Class' : ''
    };

    var setting = {};
    for(var key in _default){
        setting[key] = options && options[key] !== undefined ?
            options[key] : _default[key];
    }

    var button = document.createElement('input');
    button.type = 'button';
    button.id = toStr(setting.Id);
    button.value = toStr(setting.Value);
    button.onclick = setting.Click;
    button.countClick = 0;
    button.className = toStr(setting.Class);
    button.onmousedown = click.calculation;

    return button;
}
function input( options ){
    var _default = {
        'Id' : '',
        'Value' : '',
        'Change' : '',
        'Class' : ''
    };

    var setting = {};
    for(var key in _default){
        setting[key] = options && options[key] !== undefined ?
            options[key] : _default[key];
    }

    var input = document.createElement('input');
    input.type = 'text';
    input.id = toStr(setting.Id);
    input.value = toStr(setting.Value);
    input.onchange = setting.Change;
    input.className = toStr(setting.Class);

    return input;
}
function select( options ){
    var _default = {
        'Id' : '',
        'Value' : [{'title':'','value':''}],
        'Change' : '',
        'Class' : '',
        'Click' : function(){}
    };

    var setting = {};
    for(var key in _default){
        setting[key] = options && options[key] !== undefined ?
            options[key] : _default[key];
    }

    var select = document.createElement('select');
    select.id = toStr(setting.Id);
    select.onchange = setting.Change;
    select.className = toStr(setting.Class);
    select.onclick = setting.Click;
    for(var i = 0; i < setting.Value.length; i++){
        select.options[select.options.length] = new Option(setting.Value[i].title,setting.Value[i].value);
    }

    return select;
}