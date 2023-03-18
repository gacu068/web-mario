const {ccclass, property} = cc._decorator;
//declare const firebase: any;


@ccclass
export default class NewClass extends cc.Component {

    
    // LIFE-CYCLE CALLBACKS:
    @property(cc.Node)
    player:cc.Node = null;
    // onLoad () {}

    start () {
        cc.audioEngine.stopMusic();
        var id = firebase.auth().currentUser.uid;
        var life;
        firebase.database().ref('/'+firebase.auth().currentUser.uid).once('value',e=>{
            life = e.val().life;
        }).then(()=>{
            this.load2(life);
            console.log(life);
            //alert(life);
        }).then(this.scheduleOnce(this.load,3))
        //this.node.getComponent(cc.Label).string = "5";
        //this.scheduleOnce(this.load,3)
    }

    load(e){
        cc.director.loadScene("stage1")
    }

    load2(e){
        this.getComponent(cc.Label).string = e;
    }

    // update (dt) {}
}
