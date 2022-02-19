"use strict";

const sleep = (ss) => { 
    return new Promise((resolve,reject) => {
        // const t= setTimeout(
        setTimeout(
            () => {
                // if ((ss/1000)%5==0) {
                //     reject('5の倍数');
                //     clearTimeout(t);
                //     return;
                // }
                console.log(ss);
                resolve();
            }, 
        ss);
    }).catch((v)=>{
        console.log(v);
    })
}

(async ()=>{
    for (let i = 1; i <= 10; i++) {
        await sleep(i*1000);
        console.log(i);
        // sleep(i*1000)
        // .then(()=>{
        //     console.log(i);
        // })
        
    }
    console.log('終了');
})();