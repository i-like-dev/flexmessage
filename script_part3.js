const getMessage = () => {
    let msg = JSON.parse(message.value);
    if (useShareBtn.checked) {
        let share_btn = {
            "type": "box",
            "layout": "baseline",
            "contents": [
            {
                "type": "icon",
                "url": "https://cdn-icons-png.flaticon.com/512/1828/1828954.png",
                "size": "xxl"
            }],
            "action": {
              "type": "uri",
              "label": "action",
              "uri": 'https://yourdomain.com/path/?id=' + idText.value + "&openExternalBrowser=1"
            },
            "justifyContent": "center"
        };
        
        if (msg.footer == null) {
            msg.footer = { type: 'box', layout: 'vertical', contents: [] };
        }
        
        if (msg.footer.layout == 'vertical') {
            msg.footer.contents.push(share_btn);
        } else {
            let temp = msg.footer;
            msg.footer = { type: 'box', layout: 'vertical', contents: [] };
            msg.footer.contents.push(temp);
            msg.footer.contents.push(share_btn);
        }
    }
    
    return {
      "type": "flex",
      "altText": altText.value,
      "contents": msg
    };
}

function makeid() {
    var text = "";
    var possible = "ABCDEFGHIJKLMNPQRSTUVWXYZabcdefghijkmnpqrstuvwxyz23456789";

    for (var i = 0; i < 5; i++)
        text += possible.charAt(Math.floor(Math.random() * possible.length));

    return text;
}

function fetchAsync(payload) {
    let url = 'https://your-python-backend-url';
    return fetch(url, {
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',            
        }, 
        method: "POST", 
        body: JSON.stringify(payload)
    });
}
