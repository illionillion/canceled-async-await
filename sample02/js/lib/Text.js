export default class Text {

    /**
     * 1パートのテキストのデータを格納する
     * @param {*} TextList テキストのオブジェクト
     * @param {*} state ゲームのステータスのオブジェクト
     */
    constructor(TextList,state){
        this.TextList=TextList
        this.state=state
        this.movingFlag=false;
        this.colorFlag=false;
        this.sizeFlag=false;
    }

    /**
     * タイマー処理
     * @param {*} s 遅らせる秒数
     * @returns Promise
     */
    timer(s){
        return new Promise((resolve,reject)=>{
            setTimeout(() => {
                resolve();
            }, s);
        })
    }

    timer2(func,s,flag){
        return new Promise((resolve,reject)=>{
            setTimeout(() => {
                if (flag) {
                    reject('rejected');
                    return;
                }
                func();
                console.log(flag);
                resolve('resolved');
            }, s);
        }).then((v)=>{
            console.log(v);
        }).catch((v)=>{
            console.log(v);
            console.log('error');
        })
    }

    async timer3(func,s,flag){
        try {
            const v = await new Promise((resolve, reject) => {
                setTimeout(() => {
                    if (!flag) {
                        reject('rejected');
                        return;
                    }
                    func();
                    console.log(flag);
                    resolve('resolved');
                }, s);
            });
            console.log(v);
        } catch (v_1) {
            console.log(v_1);
            console.log('error');
        }
    }

    /**
     * テキストを透明にして配置する
     */
    Loading(){

        if (this.state.msgindex>=this.TextList.length) {
            // alert('終了');
            // return;
            this.state.msgindex=0;
        }
        const msgfragment = document.createDocumentFragment();
        for (let i = 0; i < this.TextList[this.state.msgindex].length; i++) {
            const element = this.TextList[this.state.msgindex][i];
            if (element==='/') {
                // console.log(element);
                if (this.colorFlag) {
                    this.colorFlag=false;
                    continue;
                }
                this.colorFlag=true;
                continue;
            }
            if (element==='*') {
                // console.log(element);
                if (this.sizeFlag) {
                    this.sizeFlag=false;
                    continue;
                }
                this.sizeFlag=true;
                continue;
            }
            const span = document.createElement('span');
            span.innerText=element;
            span.className='op0';
            if (this.colorFlag) {
                span.classList.add('red');
            }
            if (this.sizeFlag) {
                span.classList.add('large');
            }
            msgfragment.appendChild(span);
        }
        this.colorFlag=false;
        document.getElementById('dialogue').innerHTML='';
        document.getElementById('dialogue').appendChild(msgfragment);
        this.state.msgindex++;
    
    }

    /**
     * アニメーション再生
     * @param {*} text cp0クラスがついているspanタグ
     */
    AnimationStart(text){
        const screen = document.getElementById('screen');

        (async()=>{
            this.movingFlag=true;
            for (const ele of text) {
                if (!this.movingFlag) {
                    console.log("stop");
                    break;
                }

                // await this.timer2(
                // await this.timer3(
                //     ()=>{ele.classList.remove('op0');},
                // 100,this.movingFlag);
                // 100,true);
                // console.log(ele);
                await this.timer(100);
                console.log(ele);
                ele.classList.remove('op0');

            }
            this.movingFlag=false;
            
        })();
    }

    /**
     * アニメーション再生中に画面タッチがされたら終了させる
     * @param {*} text cp0クラスがついているspanタグ
     */ 
    AnimationForcedEnd(text){
        text.forEach(element => {
            element.classList.remove('op0');
            this.movingFlag=false;

        });
    }

}