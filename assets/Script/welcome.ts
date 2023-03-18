// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

const {ccclass, property} = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {

    @property({type:cc.AudioClip})
    bgm: cc.AudioClip = null;

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {}

    start () {
        this.playBGM()
    }


    playBGM(){
        // ===================== TODO =====================
        // 1. Play music. The audio clip to play is this.bgm
        cc.audioEngine.playMusic(this.bgm, true);
        cc.log("helloworld");
        // ================================================

    }
    // update (dt) {}
}
