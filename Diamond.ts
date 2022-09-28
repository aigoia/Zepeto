import { Collider, Vector3, Quaternion, GameObject, Transform, Object } from 'UnityEngine'
import { ZepetoCharacter, ZepetoPlayer, ZepetoPlayers } from 'ZEPETO.Character.Controller'
import { ZepetoScriptBehaviour } from 'ZEPETO.Script'
import { UnityEvent } from "UnityEngine.Events"

export default class Diamond extends ZepetoScriptBehaviour {

    zepetoCharacter: ZepetoCharacter

    Start() {    

        // Zepeto character object
        ZepetoPlayers.instance.OnAddedLocalPlayer.AddListener(() => {
            this.zepetoCharacter = ZepetoPlayers.instance.LocalPlayer.zepetoPlayer.character
        })
    }

    OnTriggerEnter(collider: Collider) {

        if (this.zepetoCharacter == null || collider.gameObject != this.zepetoCharacter.gameObject) return
        
        this.gameObject.SetActive(false)
    }
}