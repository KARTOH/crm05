// Обьект управления "Окном даных"
var win = {
    'menu':{
        'Id':'menu',
        'get':function () {
            return document.getElementById(this.Id);
        },
        'add':function (object) {
            this.get().appendChild(object);
        },
        'clear':function () {
            this.get().innerHTML = '';
        },
        'addPoint':function(object){
            var _default = {
                'id' : '',
                'top' : {},
                'bottom' : [],
                'control' : []
            };
            var setting = {};
            for(var key in _default){
                setting[key] = object && object[key] !== undefined ? object[key] : _default[key];
            }

            var top = setting.top;
            this.top.add(button({
                'Value' : top.title,
                'Id' : 'top-menu-'+setting.id,
                'Click' : function(){
                    view_menu_detail.view(this);
                }
            }));

            var bottom = setting.bottom;
            var bottom_conteiner = document.createElement('div');
            bottom_conteiner.id = 'bottom-conteiner-'+setting.id;
            for(var i = 0; i < bottom.length; i++){
                bottom_conteiner.appendChild(button({
                    'Value' : setting.bottom[i].title,
                    'Id' : setting.bottom[i].id
                }));
            }
            this.bottom.add(bottom_conteiner);

            var control = setting.control;
            var control_conteiner = document.createElement('div');
            control_conteiner.id = 'control-conteiner-'+setting.id;
            for(i = 0; i < control.length; i++){
                control_conteiner.appendChild(button({
                    'Value' : setting.control[i].title,
                    'Id' : setting.control[i].id
                }));
            }
            this.control.add(control_conteiner);
        },
        'top':{
            'Id':'top-menu',
            'get':function () {
                return document.getElementById(this.Id);
            },
            'add':function (object) {
                this.get().appendChild(object);
            },
            'clear':function () {
                this.get().innerHTML = '';
            }
        },
        'bottom':{
            'Id':'bottom-menu',
            'get':function () {
                return document.getElementById(this.Id);
            },
            'add':function (object) {
                this.get().appendChild(object);
            },
            'clear':function () {
                this.get().innerHTML = '';
            }
        },
        'control':{
            'Id':'control-menu',
            'get':function () {
                return document.getElementById(this.Id);
            },
            'add':function (object) {
                this.get().appendChild(object);
            },
            'clear':function () {
                this.get().innerHTML = '';
            }
        }
    },
    'main':{
        'Id':'main',
        'get':function () {
            return document.getElementById(this.Id);
        },
        'add':function (object) {
            this.get().appendChild(object);
        },
        'clear':function () {
            this.get().innerHTML = '';
        },
        'title':{
            'Id':'main-title',
            'get':function () {
                return document.getElementById(this.Id);
            },
            'add':function (object) {
                this.get().appendChild(object);
            },
            'clear':function () {
                this.get().innerHTML = '';
            }
        },
        'content':{
            'Id':'main-content',
            'get':function () {
                return document.getElementById(this.Id);
            },
            'add':function (object) {
                this.get().appendChild(object);
            },
            'clear':function () {
                this.get().innerHTML = '';
            }
        },
        'control':{
            'Id':'main-control',
            'get':function () {
                return document.getElementById(this.Id);
            },
            'add':function (object) {
                this.get().appendChild(object);
            },
            'clear':function () {
                this.get().innerHTML = '';
            }
        }
    },
    'footer':{
        'Id':'footer',
        'get':function () {
            return document.getElementById(this.Id);
        },
        'add':function (object) {
            this.get().appendChild(object);
        },
        'clear':function () {
            this.get().innerHTML = '';
        },
        'addPanel':function (name, id) {
            var panel = document.createElement('div');
            panel.className = 'footer-detail';
            panel.id = 'footer-detail-' + id;

            var title = document.createElement('div');
            title.className = 'footer-detail-title';
            title.id = 'footer-detail-title-' + id;
            panel.appendChild(title);

            var content = document.createElement('div');
            content.className = 'footer-detail-content';
            content.id = 'footer-detail-content-' + id;
            panel.appendChild(content);

            this.content.add(panel);

            var titleButton = button({
                'Value':name,
                'Id':'footer-detail-title-'+id,
                'Click':function(){
                    view_footer_detail.view(this);
                }
            });
            this.control.add(titleButton);
        },
        'control':{
            'Id':'footer-control',
            'get':function () {
                return document.getElementById(this.Id);
            },
            'add':function (object) {
                this.get().appendChild(object);
            },
            'clear':function () {
                this.get().innerHTML = '';
            }
        },
        'content':{
            'Id':'footer-content',
            'get':function () {
                return document.getElementById(this.Id);
            },
            'add':function (object) {
                this.get().appendChild(object);
            },
            'clear':function () {
                this.get().innerHTML = '';
            }
        }
    }
};

/**
 * Преобразует в строку
 * @param str - параметр приобразования
 * @return string
 */
function toStr(str){
    if(typeof str === "string" || str == String(str)){
        return str;
    }

    if(!str){
        return '';
    }

    else if(typeof str == 'object'){
        if(str.toString !== undefined){
            return str.toString();
        }

        return '';
    }

    return '';
}

/**
 * Генерирует UUID
 * @return {String}
 * @constructor
 */
function UUID() {
    var s = [];
    var hexDigits = "0123456789abcdef";
    for (var i = 0; i < 36; i++) {
        s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1);
    }
    s[14] = "4";  // bits 12-15 of the time_hi_and_version field to 0010
    s[19] = hexDigits.substr((s[19] & 0x3) | 0x8, 1);  // bits 6-7 of the clock_seq_hi_and_reserved to 01
    s[8] = s[13] = s[18] = s[23] = "-";

    var uuid = s.join("");
    return uuid;
}

/**
 * Обьект поддсчета нажатий
 * @type {Object}
 */
var click = {
    'store' : {},
    'calculation' : function(){
        if(this.clickId === undefined){
            click.create(this);
        }
        else{
            click.push(this);
        }
    },
    'create' : function(elem){
        var uuid = UUID();
        if(elem.className === undefined){
            elem.className = '';
        }
        elem.className += ' click_'+uuid;
        elem.clickId = uuid;
        elem.countClick = 1;

        click.store[uuid] = setTimeout('click.remove("click_'+uuid+'")',400);
    },
    'push' : function(elem){
        var uuid = elem.clickId;
        clearTimeout(click.store[uuid]);
        elem.countClick++;
        click.store[uuid] = setTimeout('click.remove("click_'+uuid+'")',400);
    },
    'remove' : function(Class){
        var elem = document.getElementsByClassName(Class);
        if(!elem.length){
            return;
        }

        elem = elem[0];
        delete click.store[elem.clickId];
        elem.countClick = 0;
    }
};

/**
 * Функция добавления CSS Класса
 * @param elem HTMLObject
 * @param Class String
 */
function addClass(elem,Class){
    if(elem.className === undefined){
        elem.className = '';
    }

    elem.className += ' '+Class;
}

/**
 * Функция удаления CSS класса
 * @param elem HTMLObject
 * @param Class String
 */
function removeClass(elem,Class){
    if(elem.className === undefined){
        elem.className = '';
        return;
    }

    elem.className = elem.className.replace(new RegExp(Class),'');
    elem.className = elem.className.replace(/ {1,}/g,'');
}

// Обьект управления Вклатками Футера
var view_footer_detail = {
    'view_class' : 'activ-detail',
    'hidden' : function(){
        var view = document.getElementsByClassName(this.view_class);
        if(!view.length){
            return;
        }

        for(var i = 0; i < view.length; i++){
            removeClass(view[i],this.view_class);
        }
    },
    'view' : function(elem){
        this.hidden();

        var id = elem.id.replace(/^footer-detail-title-/,'');

        var detail = document.getElementById('footer-detail-'+id);
        if(!detail){
            return;
        }

        addClass(detail,this.view_class);
    }
};

// Обьект Управления вкладками меню
var view_menu_detail = {
    'view_class' : 'activ-menu',
    'hidden' : function(){
        var view = document.getElementsByClassName(this.view_class);
        if(!view.length){
            return;
        }

        for(var i = 0; i < view.length; i++){
            removeClass(view[i],this.view_class);
        }
    },
    'view' : function(elem){
        debugger;
        this.hidden();

        var id = elem.id.replace(new RegExp('top-menu-'),'');

        var bottom_conteiner = document.getElementById('bottom-conteiner-'+id);
        var control_conteiner = document.getElementById('control-conteiner-'+id);

        if(!bottom_conteiner || !control_conteiner){
            return;
        }

        addClass(bottom_conteiner,this.view_class);
        addClass(control_conteiner,this.view_class);
    }
};