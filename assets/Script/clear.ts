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
    win: cc.AudioClip = null;

    @property(cc.Node)
    label:cc.Node = null;

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {}

    start () {

    }

    onBeginContact(contact, self, other){
        var real_score =  other.node.getComponent('player').score;
        if(other.node.name == 'player'){
            var score;
            firebase.database().ref('/'+firebase.auth().currentUser.uid).once('value',e=>{
                score = e.val().score;
            }).then(()=>{
                console.log("update score " + real_score);
                if(score < real_score){
                    
                    score = real_score;
                    firebase.database().ref('/'+firebase.auth().currentUser.uid).update({
                        score:score,
                        pass_stage_1:true
                    })
                }
            }).then(this.scheduleOnce(this.load,3))
            //cc.game.pause();
            this.appear();
            cc.audioEngine.playMusic(this.win,false);
            other.node.getComponent('player').wining();
        }
    }

    load(e){
        cc.director.loadScene("stage_select")
    }
    // update (dt) {}

    appear(){
        this.label.active = true;
    }
}
