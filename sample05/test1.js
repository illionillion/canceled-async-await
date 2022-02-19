"use strict";

const sleep = (ss) => { 
    return new Promise((resolve,reject) => {
        setTimeout(
            () => {
                console.log(ss);
                resolve();
            }, 
        ss);
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