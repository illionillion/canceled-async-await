window.addEventListener('load', e =>{

    let stop = () => false;
    function speak(lang, text) {
        return new Promise((resolve, reject) => {
            let speakend = cancel => {
                speakend = () => false;
                if (cancel) speechSynthesis.cancel();
                resolve(cancel);
                return cancel;
            };
            stop = () => speakend(true);
            let u = new SpeechSynthesisUtterance(text);
            u.lang = lang;
            u.onend = u.onerror = () => speakend(false);
            speechSynthesis.speak(u);
        });
    }

    let texts = [];
    for (let tr of Array.from(table.getElementsByTagName("tr"))) {
        let [lang, text] = Array.from(tr.getElementsByTagName("td")).map(
            td => td.textContent
        );
        texts.push([tr, lang, text]);
        // console.log(texts);
    }

    button.onclick = async function() {
        if (stop()) return;
        button.textContent = "Stop";
        for (let [element, lang, text] of texts) {
            element.classList.add("speaking");
            let cancel = await speak(lang, text);
            element.classList.remove("speaking");
            if (cancel) break;
        }
        button.textContent = "Start";
    };
})