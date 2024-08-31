let shared = false;
const result = document.getElementById('result');
const panel = document.getElementById('panel');
const altText = document.getElementById('alt');
const message = document.getElementById('message');
const publish = document.getElementById('publish');
const useShareBtn = document.getElementById('useShareBtn');
const copyBtn = document.getElementById('copybtn');
const shareBtn = document.getElementById('share');		
let defaultId = makeid();
const idText = document.getElementById('id');
idText.value = defaultId;

let defaultmsg;

liff.init({ liffId: "2006185026-GjLBR0ml" })
.then(async () => {
    if (liff.isLoggedIn()) {
        let urlParams = new URLSearchParams(window.location.search);
        const params = urlParams.has('liff.state') ? new URLSearchParams(urlParams.get('liff.state')) : urlParams;
        const uid = params.get('id');
        const edit = params.get('edit');
        if (uid != null && (edit == null || !edit)) {			
            panel.style.display = 'none';
            let res = await fetchAsync({ method: "Load", id: uid });
            res = await res.json();
            defaultmsg = JSON.parse(res.pat);
            if (liff.isApiAvailable('shareTargetPicker')) {
                liff.shareTargetPicker([defaultmsg])
                .then(() => {
                    result.innerHTML = "傳送成功";
                    shared = true;
                }).catch((res) => {
                    result.innerHTML = "傳送尚未成功:" + JSON.stringify(res);
                });
            }
        }
        if (uid != null && edit) {
            shared = true;
            let res = await fetchAsync({ method: "Load", id: uid });
            res = await res.json();
            let msg = JSON.parse(res.pat);

            defaultId = uid;
            idText.value = uid;
            altText.value = msg.altText;
            message.value = JSON.stringify(msg.contents[0] || msg.contents);
        }
    } else {
        liff.login({ redirectUri: window.location.href });
    }
})
.catch(error => {
    console.error(error);
});

function setClipboard(value) {
    let tempInput = document.createElement("input");
    tempInput.style = "position: absolute; left: -1000px; top: -1000px";
    tempInput.value = value;
    document.body.appendChild(tempInput);
    tempInput.select();
    document.execCommand("copy");
    document.body.removeChild(tempInput);
}

copyBtn.addEventListener('click', function() {
    setClipboard('https://yourdomain.com/path/?id=' + idText.value + '&edit=1');
});

message.addEventListener('change', function() {
    if (shared) {
        defaultId = makeid();
        idText.value = defaultId;
        shared = false;
    }
});

publish.addEventListener('change', function() {
    useShareBtn.disabled = !publish.checked;
    idText.disabled = !publish.checked;
    if (!publish.checked)
        useShareBtn.checked = false;
});
