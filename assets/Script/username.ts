const {ccclass, property} = cc._decorator;
//declare const firebase: any;
@ccclass
export default class score extends cc.Component {

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {}

    start () {
        var id = firebase.auth().currentUser.uid;
        var name;
        firebase.database().ref('/'+firebase.auth().currentUser.uid).once('value',e=>{
            name = e.val().name;
        }).then(()=>{
            this.change_name(name);
            console.log('name2 is'+ name);
            } 
        )
        
    }
    

    update (dt) {
        

        
    }

    change_name(name:string){
        this.getComponent(cc.Label).string = name;
        //console.log(name);
        //alert(name);
    }
}
