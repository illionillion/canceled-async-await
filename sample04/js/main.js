"use strict";
(()=>{

    function asyncSetTimeout(msec, func = () => {}){
        let timeoutId
        let r
        const exec = () => new Promise((res) => {
                r = res
                timeoutId = setTimeout(async () => {
                    timeoutId = null
                    await func()
                    res()
                },msec)
            })
        return {
            exec,
            cancel: () => {
                if (timeoutId) {
                  clearTimeout(timeoutId)
                  timeoutId = null
                  r()
                }
            }
        }
    }

    const msList = [1000,3000,5000,2000,6000];
    let cancel;

    window.addEventListener('load',()=>{
        document.getElementById('startBtn').addEventListener('click',(e)=>{
            (async()=>{
                let count =0;
                const asyncFunc = () => {
                    count++;
                    console.log(count+'：OK：'+new Date());
                }

                for (const v of msList) {
                    const a = asyncSetTimeout(v,asyncFunc)
                    cancel = a.cancel;
                    document.getElementById('cancelBtn').addEventListener('click',(e)=>{
                        console.log(e.target.value);
                        cancel();//キャンセルさせる
                    })
                    await a.exec() // ここで設定した時間分処理を待ったあとasyncFuncを実行する
                    console.log(count);

                }
                // const a = asyncSetTimeout(1000,asyncFunc)
                // await a.exec() // ここで設定した時間分処理を待ったあとasyncFuncを実行する
                // const b = asyncSetTimeout(5000,asyncFunc)
                // await b.exec() // ここで設定した時間分処理を待ったあとasyncFuncを実行する
                // const c = asyncSetTimeout(2000,asyncFunc)
                // await c.exec() // ここで設定した時間分処理を待ったあとasyncFuncを実行する
            })();
        })
    })
})()

