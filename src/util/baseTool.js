var querystring = require('querystring');
export const platformId = 1; //平台id ,oms 为1
import _ from 'lodash';

const createUUID = (len, radix) => {
    var chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'.split('');
    var uuid = [], i;
    radix = radix || chars.length;
    if (len) {
        for (i = 0; i < len; i++) uuid[i] = chars[0 | Math.random() * radix];
    } else {
        var r;
        uuid[8] = uuid[13] = uuid[18] = uuid[23] = '-';
        uuid[14] = '4';
        for (i = 0; i < 36; i++) {
            if (!uuid[i]) {
                r = 0 | Math.random() * 16;
                uuid[i] = chars[(i == 19) ? (r & 0x3) | 0x8 : r];
            }
        }
    }
    return uuid.join('');
}

//设置cookie
export const setCookie = function (cookieName, value, expiretimes) {
    var exdate = new Date();
    var domain = document.domain.replace(/.*\.(.*\..*)/g, '$1');
    exdate.setTime(exdate.getTime() + expiretimes);
    document.cookie = cookieName + "=" + escape(value) + ";path=/;domain=" + domain + ";" +
        ((expiretimes == null) ? "" : ";expires=" + exdate.toGMTString());
};

//获取cookie
export const getCookie = function (cookieName) {
    if (document.cookie.length > 0) {
        var c_start = document.cookie.indexOf(cookieName + "=");
        if (c_start != -1) {
            c_start = c_start + cookieName.length + 1;
            var c_end = document.cookie.indexOf(";", c_start);
            if (c_end == -1) c_end = document.cookie.length
            return unescape(document.cookie.substring(c_start, c_end))
        }
        return "";
    }
    return "";
};


/**
 *
 * @param {*} componentName  组件名称
 * @param {*} index //组件序号
 */
export const getRef = (componentName, index) => {
    var uuid = componentName + createUUID(8, index);//位数，基数 ，基数必须是数字
    // console.log(uuid);
    return uuid
}


//参数序列化
export const objTodata = (obj) => {
    const arr = []
    for (let o in obj) {
        if (obj[o]) {
            arr.push(o + '=' + obj[o])
        }
    }
    return arr.join('&')
}


export const getUrlParams = (url) => {
    if (!url) {
        url = location.href;
    }
    var queryArr = url.split('?');
    var querys = queryArr.length > 1 ? querystring.parse(queryArr[1]) : {};
    return querys;
}

export const getOneUrlParams = (attrKey, url) => {
    var urlParams = getUrlParams(url);
    return urlParams[attrKey] ? urlParams[attrKey] : '';
}

/**
 * token过期的时候跳转登录页面
 */
export const jumpToLoginPage = () => {
    location.href = 'http://admin.admin.com/';
}

/**
 * 没权限的时候跳转没权限警告页面页面
 */
export const jumpToUnauthorizedPage = () => {
    location.href = 'http://admin.admin.com/nopower.html';
}

//通过名字获取是否有操作权限
export const isEntryVisableByName = (name, operateData) => {
    if (operateData[encodeURI(name)]) {
        return true;
    } else {
        return false;
    }
}


export const getLoginInfo = () => {
    var token = '', platformId = '';
    if (window.localStorage) {
        var loginToken = localStorage.getItem('loginToken'); //保存登录token
        var srmStore = localStorage.getItem('srm'); //保存登录token
        token = loginToken ? loginToken : '';
        platformId = srmStore ? JSON.parse(srmStore)['platformId'] : '';
    } else {
        //Cookie.get("menuTitle", arrDisplay);	
    }
    return {token: token, platformId: platformId};
}

export const getLoginAccount = () => {
    var loginAccount = '';
    if (window.localStorage) {
        var store = localStorage.getItem('loginAccount'); //保存登录token
        loginAccount = store ? JSON.parse(store) : {};
    } else {
        //Cookie.get("menuTitle", arrDisplay);	
    }
    return loginAccount;
}

export const setLoginAccount = (data) => {
    if (window.localStorage) {
        data = _.omitBy(data, _.isUndefined); //删除undefined参数
        localStorage.setItem("loginAccount", JSON.stringify(data));	 //保存platformId在crm的key值下面
    } else {
        //Cookie.write("menuTitle", arrDisplay);	
    }
}


export const setLoginInfo = () => {
    var params = getUrlParams(location.href);
    if (params.platformId && params.token) {
        if (window.localStorage) {
            localStorage.setItem("srm", JSON.stringify({platformId: params.platformId}));	 //保存platformId在crm的key值下面
            localStorage.setItem("loginToken", params.token);  //保存登录token
        } else {
            //Cookie.write("menuTitle", arrDisplay);	
        }
    }
};


export const datasaddkey = (obj) => obj.map((v, i) => {
    if (!v.key) {
        v.key = ++i
    }
    return v
})


export const objToarrsort = (obj) => {
    var arr = [], arr2 = [], newarr;
    for (let i in obj) {
        if (i.match(/\d+$/g)) {
            arr.push([i, obj[i]]);
        } else {
            arr2.push([i, obj[i]]);
        }
    }

    arr.sort((a, b) => a[0].match(/\d+$/g).join('') * 1 - b[0].match(/\d+$/g).join('') * 1)
    newarr = [...arr, ...arr2]
    return newarr;
}

export const sortarrToobj = (arr) => {
    const params = {}
    for (let i = 0, len = arr.length; i < len; i++) {
        const re = /\d+$/g;
        const arr0 = arr[i][0]
        const arr1 = arr[i][1]
        if (re.test(arr0)) {
            const key = arr0.replace(/(.*?)\d+/, '$1')
            if (Reflect.has(params, key)) {
                params[key].push(arr1)
            } else {
                params[key] = []
                params[key].push(arr1)
            }

        } else {
            params[arr0] = arr1
        }
    }
    return params
}


export const objvaluesformat = (params) => {
    const newparams = {}
    for (let o in params) {
        if (typeof params[o] === 'object') {
            if (params[o].constructor === Array) {
                if (typeof params[o][0] == 'object' && params[o][0] && params[o][0].format) {
                    newparams[o] = params[o].map(v => v ? v.format("YYYY-MM-DD") : '').join(',')
                } else if (typeof params[o][0] == 'object' && params[o][0] && params[o][0].status) {
                    newparams[o] = params[o].map(v => (v.response ? v.response.key : v.url).replace(/.*com/g, '')).join('@')
                } else if (typeof params[o][0] == 'object' && params[o][0].constructor == Array && params[o][0][0] && params[o][0][0].status) {
                    newparams[o] = params[o].map(v => v.map(k => (k.response ? k.response.key : k.url).replace(/.*com/g, '')).join('@')).join(',')
                } else {
                    newparams[o] = params[o].join(',')
                }
            } else {
                if(params[o].format){
                    newparams[o] = params[o].format("YYYY-MM-DD")
                }else if(params[o].label){
                    newparams[o] = params[o].label
                }
            }
        } else {
            if (params[o]) {
                newparams[o] = params[o]
            }
        }
    }
    return newparams
}


export const timestampFromat = (v, t = 1) => {
    const date = new Date(v);
    let y = date.getFullYear();
    let m = date.getMonth() + 1;
    m = m < 10 ? ('0' + m) : m;
    let d = date.getDate();
    d = d < 10 ? ('0' + d) : d;
    let h = date.getHours();
    h = h < 10 ? ('0' + h) : h;
    let minute = date.getMinutes();
    minute = minute < 10 ? ('0' + minute) : minute;
    let second = date.getSeconds();
    second = second < 10 ? ('0' + second) : second;
    return t == 1 ? y + '-' + m + '-' + d : y + '-' + m + '-' + d + ' ' + h + ':' + minute + ':' + second;
}


(function () {
    if (!('flex' in document.body.style)) {
        const root = document.getElementById('root');
        const first = document.body.firstChild;
        var html = document.createElement("div");
        html.innerHTML = `<div style='line-height: 50px;background: #ff0000; color: #ffffff;
position: absolute;top: 0px;left:0px; width: 100%;z-index: 99999;text-align: center;'
 onclick="javascript:this.style.display='none'">您的浏览器版本过低，为了更好的体验，请您升级浏览器！
 <a style="color:#108ee9" href="http://se.360.cn/" target="_blank" rel='nofollow'>点击更新</a> </div>`
        document.body.insertBefore(html, first);
        root.style.display = 'none'
    }
})();