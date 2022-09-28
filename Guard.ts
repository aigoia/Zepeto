import { ZepetoScriptBehaviour } from 'ZEPETO.Script'
import { Transform, Object, Vector3, GameObject, Quaternion, WaitForSeconds, Time, Mathf } from 'UnityEngine'
import Holder from './Holder'

export default class Guard extends ZepetoScriptBehaviour {

    public guardName: string 

    Start() {    

        const holderList = Object.FindObjectsOfType<Holder>()
        const holder = holderList.find(i => i.holderName == this.guardName)
        const waypoints = holder.waypoints
        // waypoints.forEach(i => console.log(i))

        this.StartCoroutine(this.PathRoutine(waypoints))
    }

    *TurnRoutine(lookTarget: Vector3) {

        const thisTransform = this.GetComponent<Transform>()
        const turnSpeed = 90
        const toLook = (lookTarget - thisTransform.position).normalized
        const targetAngle = 90 - Mathf.Atan2(toLook.z, toLook.x) * Mathf.Rad2Deg

        while (Mathf.Abs(Mathf.DeltaAngle(thisTransform.eulerAngles.y, targetAngle)) > 0.05)
        {
            const angle = Mathf.MoveTowardsAngle(thisTransform.eulerAngles.y, targetAngle, turnSpeed * Time.deltaTime)
            thisTransform.eulerAngles = Vector3.up * angle
            yield null
        }
    }

    *PathRoutine(waypoints: Vector3[]) {

        const wait = new WaitForSeconds(0.3)
        const speed = 5

        const thisTransform = this.GetComponent<Transform>()
        thisTransform.position = waypoints[0]
        let index = 1
        let targetPoint = waypoints[index]

        while(true)
        {
            thisTransform.position = Vector3.MoveTowards(thisTransform.position, targetPoint, speed * Time.deltaTime)

            if (thisTransform.position == targetPoint)
            {
                yield wait
                index = (index + 1) % waypoints.length
                targetPoint = waypoints[index]
                yield this.StartCoroutine(this.TurnRoutine(targetPoint))
                thisTransform.LookAt(targetPoint)
            }
            yield null
        }
    }
}