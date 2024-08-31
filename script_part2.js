shareBtn.addEventListener('click', function() {
    if (defaultmsg) {
        liff.shareTargetPicker([defaultmsg])
        .then(() => {
            result.innerHTML = "傳送成功";
            shared = true;
        }).catch((res) => {
            result.innerHTML = "傳送尚未成功:" + JSON.stringify(res);
        });
        return;
    }

    result.innerHTML = "";
    if (altText.value == "") {
        result.innerHTML = "請輸入替代文字";
        return;
    }			
    let msg = "";
    try {
        msg = getMessage();
        if (publish.checked) {
            fetchAsync({ method: "Save", id: defaultId, desc: altText.value, pat: JSON.stringify(msg) });
        }
    } catch (ex) {
        result.innerHTML = "訊息格式不正確:" + JSON.stringify(ex);
    }
    if (liff.isApiAvailable('shareTargetPicker')) {
        if (msg != "") {
            liff.shareTargetPicker([msg])
            .then(() => {
                result.innerHTML = "傳送成功";
                shared = true;
            }).catch((res) => {
                result.innerHTML = "傳送尚未成功:" + JSON.stringify(res);
            });
        }							
    }
});			
