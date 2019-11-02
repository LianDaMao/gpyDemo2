var dynamsoft = dynamsoft || {};

(function(){
	
    var ua = navigator.userAgent.toLowerCase(),
        _platform = navigator.platform.toLowerCase(),

        _bWin = (_platform == 'win32') || (_platform == 'win64') || (_platform == 'windows'),
		
        _nMSIE = ua.indexOf('msie'),
        _nTrident = ua.indexOf('trident'),
        _nRV = ua.indexOf('rv:'),
        _nEdge = ua.indexOf('edge'),

        _tmp = ua.match(/version\/([\d.]+).*safari/),
        _bSafari = _tmp ? !0 : !1,
        _nSafari = _tmp ? _tmp[1] : 0,

		_nFirefox = ua.indexOf('firefox'),
		_bFirefox = (_nFirefox != -1),
		
		_bEdge = _bWin && !_bFirefox && (_nEdge != -1),
		
		_indexOfChrome = ua.indexOf('chrome'),
		_bChrome =  !_bEdge && (_indexOfChrome != -1),

		_bIE = _bWin && !_bFirefox && !_bEdge && !_bChrome && (_nMSIE != -1 || _nTrident != -1 || _nRV != -1),

		_strBrowserVersion = '',
		_mainVer = 0;
	

	var _deviceType,
		bIsIpad = ua.match(/ipad/i) == "ipad",
		bIsIphoneOs = ua.match(/iphone os/i) == "iphone os",
		bIsMidp = ua.match(/midp/i) == "midp",
		bIsUc7 = ua.match(/rv:1.2.3.4/i) == "rv:1.2.3.4",
		bIsUc = ua.match(/ucweb/i) == "ucweb",
		bIsAndroid = ua.match(/android/i) == "android",
		bIsCE = ua.match(/windows ce/i) == "windows ce",
		bIsWM = ua.match(/windows mobile/i) == "windows mobile";
		
	if (bIsIpad || bIsIphoneOs || bIsMidp || bIsUc7 || bIsUc || bIsAndroid || bIsCE || bIsWM) {
		_deviceType = 'phone'; 
	} else {
		_deviceType = 'pc'; 
	}  


    if(_bEdge) {
		_tmp = ua.slice(_nEdge + 5);
		_tmp = _tmp.slice(0, _tmp.indexOf(' '));
		_strBrowserVersion = _tmp;
		
	} else if (_bChrome) {
		_tmp = ua.slice(_indexOfChrome + 7);
		_tmp = _tmp.slice(0, _tmp.indexOf(' '));
		_strBrowserVersion = _tmp;

    } else if (_bFirefox) {	// FF
        _tmp = ua.slice(_nFirefox + 8);
        _tmp = _tmp.slice(0, _tmp.indexOf(' '));
        _strBrowserVersion = _tmp;

    } else if (_bIE) {
        if (_nMSIE != -1) {
            // 'msie'
            _tmp = ua.slice(_nMSIE + 4);
            _tmp = _tmp.slice(0, _tmp.indexOf(';'));
            _strBrowserVersion = _tmp;
        } else if (_nRV != -1) {
            // 'rv:'
            _tmp = ua.slice(_nRV + 3);
            _tmp = _tmp.slice(0, _tmp.indexOf(';'));
            _tmp = _tmp.slice(0, _tmp.indexOf(')'));
            _strBrowserVersion = _tmp;
        } else if (_nTrident != -1) {
            // 'trident'
            _tmp = ua.slice(_nTrident + 7);
            _tmp = _tmp.slice(0, _tmp.indexOf(';'));
            _strBrowserVersion = _tmp;
        }


    } else if (_bSafari) {
        if (_tmp) {
            _strBrowserVersion = _tmp[1];
        }
    }

    if(_strBrowserVersion.indexOf('.') > -1)
        _mainVer = _strBrowserVersion.slice(0, _strBrowserVersion.indexOf('.')) * 1.0;
	
	dynamsoft.onlineNavInfo = {
		bWin: _bWin,
		
		bIE: _bIE,
		bEdge: _bEdge,
		bFirefox: _bFirefox,
		bChrome: _bChrome,
		bSafari: _bSafari,
		
		strVersion: _strBrowserVersion,
        mainVer: _mainVer,
		deviceType: _deviceType
		
	};
})();

function dcsMasterPage20180709() {
	
    var userAgentInfo = navigator.userAgent.toLowerCase();
    var Agents = ["android", "iphone",
                "symbianos", "windows phone",
                "ipad", "ipod"];
    var IsPC = true;
    for (var v = 0; v < Agents.length; v++) {
        if (userAgentInfo.indexOf(Agents[v]) >= 0) {
            IsPC = false;
            break;
        }
    }
    if (!IsPC) {
        location.href = "https://demo.dynamsoft.com/MBC/";
		return false;
    }

    function getDialog (content) {
		var isIe6 = !-[1,]&&!window.XMLHttpRequest;
        var arr = [];
		
        arr.push("<div style='position:fixed; left:0; top:0; font-family: verdana, sans-serif; width:100%; height:100%; *height:expression(document.documentElement.clientHeight+\"px\"); _position:absolute; _height:expression(document.documentElement.scrollHeight+\"px\"); z-index: 500000'>");
        // fog
        arr.push("<div style='position:absolute; left:0; top:0; width: 100%; height: 100%; z-index: 500000; background-color: #000; opacity: 0.3; filter: alpha(opacity:30)\\9;'></div>");
        // main dialog
        arr.push(   "<div class='position-fixed-cm' style='width: 392px; height: 274px; *margin-left:-196px; *margin-top:-137px; padding: 5px; z-index: 500002; border: 1px solid #e7e7e7; background-color: #f1f2f2; overflow-y:hidden;'>");
        arr.push(       "<div style='height: 264px; padding: 15px; border: 1px solid #e7e7e7; background-color: #fff;'>");
        arr.push(content);
        arr.push(       "</div>");
        arr.push("</div>");

        // iframe for ie6
        if(isIe6){
            arr.push("<iframe frameborder=0 style='position:absolute; left:0; top:0; width: 100%; height:100%; filter:alpha(opacity:0); z-index: 499999;'></iframe>");
        }
        arr.push("</div>");
		
        return arr.join('');
    };
	
	var isWin = (navigator.platform.toLowerCase().indexOf('win') != -1);
	
	if (isWin == true) {
		
		return true;
		
	} else {
		
		var content = ["<div style='line-height:26px;'>Currently, this demo only supports browsers on Windows.<br>"].join('');
		
		$('body').append(getDialog(content));
		
		return false;
	}
	
};
