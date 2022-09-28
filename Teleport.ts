import { Collider, Vector3, Quaternion, Object } from 'UnityEngine'
import { ZepetoCharacter, ZepetoPlayer, ZepetoPlayers } from 'ZEPETO.Character.Controller'
import { ZepetoScriptBehaviour } from 'ZEPETO.Script'
import GameManager from './GameManager'

export default class Teleport extends ZepetoScriptBehaviour 
{
    zepetoCharacter: ZepetoCharacter
    gameManager: GameManager

    Start() {

        // Zepeto character object
        ZepetoPlayers.instance.OnAddedLocalPlayer.AddListener(() => {
            this.zepetoCharacter = ZepetoPlayers.instance.LocalPlayer.zepetoPlayer.character
        })

        this.gameManager = Object.FindObjectOfType<GameManager>()
    }

    OnTriggerEnter(collider: Collider) {
        
        if (this.zepetoCharacter == null || collider.gameObject != this.zepetoCharacter.gameObject) return

        // Teleport to Origin Position
        this.zepetoCharacter.Teleport(new Vector3(0, 1, 0), Quaternion.identity)
        this.gameManager.ResetAll()
    }
}           