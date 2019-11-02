// whether video container is visable
var isOnVideo = true;

document.getElementById("btn-grab").onclick = function () {
    if (!isOnVideo) return;

    var funCaptureImage = function () {
        setTimeout(function () {
            makeInImageViewerStatus();
        }, 50);
    };
    DWObject.Addon.Webcam.CaptureImage(funCaptureImage, funCaptureImage);

    if (DWObject.ErrorCode !== 0) {
        alert('Capture error: ' + DWObject.ErrorString);
    }
    else {
        appendMessage('Grab an image successfully.<br />');
        updatePageInfo();
    }

    makeInImageViewerStatus();
};

document.getElementById("btn-switch").onclick = function () {
    if (isOnVideo == false) {
        makeInPlayVideoStatus();
    } else {
        makeInImageViewerStatus();
    }
};


function makeInPlayVideoStatus() {

    DWObject.Addon.Webcam.StopVideo();
    setTimeout(function () {
        DWObject.Width = 647;
        DWObject.Height = 572;
        DWObject.Addon.Webcam.PlayVideo(DWObject, 80, function () { });
        isOnVideo = true;

        $('.D_dcsButtons').show();
        $('.D_dwtButtons').hide();
        $('#divEdit').hide();
        $('#btnGroupBtm').hide();

        document.getElementById("btn-grab").style.backgroundColor = "";
        document.getElementById("btn-grab").style.borderColor = "";
        document.getElementById("btn-grab").style.cursor = "";
        document.getElementById("btn-switch").value = "Switch to Image Viewer";

    }, 30);
}

function makeInImageViewerStatus(iwebcamSourceCount) {

    DWObject.Width = 583;
    DWObject.Height = 513;

    if (iwebcamSourceCount == undefined || iwebcamSourceCount != 0)
        DWObject.Addon.Webcam.StopVideo();
    isOnVideo = false;

    $('#divEdit').show();
    $('#btnGroupBtm').show();

    document.getElementById("btn-grab").style.backgroundColor = "#aaa";
    document.getElementById("btn-grab").style.borderColor = "#aaa";
    document.getElementById("btn-grab").style.cursor = "default";
    document.getElementById("btn-switch").value = "Switch to Video Viewer";
}

function webcam_source_onchange(iwebcamSourceCount) {
    var selWebcamSource = document.getElementById("webcamsource");
    var curIndex = -1;
    if (selWebcamSource)
        curIndex = selWebcamSource.selectedIndex;

    var bDcsIndex = false, dcsIndex = -1;

    if (curIndex >= DWTSourceCount) {
        bDcsIndex = true;
        dcsIndex = curIndex - DWTSourceCount;
    }

    if (bDcsIndex) {
        // show webcam
        if (document.getElementById("divWebcamType"))
            document.getElementById("divWebcamType").style.display = "";
        if (document.getElementById("divProductDetail"))
            document.getElementById("divProductDetail").style.display = "none";
        if (document.getElementById("divWebcamDetail"))
            document.getElementById("divWebcamDetail").style.display = "";

        DWObject.Addon.Webcam.SelectSource(document.getElementById("webcamsource").options[document.getElementById("webcamsource").selectedIndex].value);
        makeInPlayVideoStatus();

    }
    else {
        makeInImageViewerStatus(iwebcamSourceCount);

        // show dwt
        if (document.getElementById("divWebcamType"))
            document.getElementById("divWebcamType").style.display = "none";
        if (document.getElementById("divProductDetail"))
            document.getElementById("divProductDetail").style.display = "";

        $('.D_dcsButtons').hide();
        $('.D_dwtButtons').show();

        source_onchange();
    }

}