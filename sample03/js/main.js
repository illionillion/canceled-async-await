"use strict";

(()=>{
    console.log("ok");
    let lyrics =[
        'かえるのうたが',
        'きこえてくるよ',
        'ぐわぁ',
        'ぐわぁ',
        'ぐわぁ',
        'ぐわぁ',
        'ゲロゲロゲロゲロ',
        'ぐわぁっぐわぁっぐわぁっ'
    ]

    function speak(num){

        for (const [i,parts] of lyrics.entries()) {
            console.log(`${num}：${parts}`);
            const speak   = new SpeechSynthesisUtterance();
            speak.text  = parts;
            speak.rate  = 1; // 読み上げ速度 0.1-10 初期値:1 (倍速なら2, 半分の倍速なら0.5, )
            speak.pitch = 0;// 声の高さ 0-2 初期値:1(0で女性の声) 
            speak.lang  = 'ja-JP'; //(日本語:ja-JP, アメリカ英語:en-US, イギリス英語:en-GB, 中国語:zh-CN, 韓国語:ko-KR)
          
            // sleep(2000);
            speechSynthesis.speak(speak);
    
        }

    }
    function timer(s){
        return new Promise((resolve,reject)=>{
            setTimeout(() => {
                console.log('fin');
                resolve();
            }, s);
        })
    }
    window.addEventListener('load',e=>{
        document.getElementById('startBtn').addEventListener('click',e=>{

            (async ()=>{

                for (let i = 0; i < 3; i++) {
                    console.log(i);
                    speak(i);
                    await timer(
                        function(){}
                    ,100000)
                }
            })();
        })
    })
})();