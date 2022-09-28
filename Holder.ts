import { ZepetoScriptBehaviour } from 'ZEPETO.Script'
import { Transform, Object, Vector3, GameObject, Quaternion } from 'UnityEngine'

export default class Holder extends ZepetoScriptBehaviour {

    public holderName: string 
    public waypoints: Vector3[]

    MakeHolder(): Transform[] {

        const waypoints = Object.FindObjectsOfType<Transform>()
        return waypoints
    }

}