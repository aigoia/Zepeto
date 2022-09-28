import { ZepetoScriptBehaviour } from 'ZEPETO.Script'
import { Transform, Object, Vector3, GameObject, Quaternion, Time } from 'UnityEngine'
import { UnityEvent } from 'UnityEngine.Events'
import Diamond from './Diamond'

export default class GameManager extends ZepetoScriptBehaviour {

    diamondList: Diamond[]

    Start()
    {
        this.diamondList = Object.FindObjectsOfType<Diamond>()
    }

    public ResetAll() {

        this.diamondList.forEach(i => i.gameObject.SetActive(true))
    }
}