import { ZepetoScriptBehaviour } from 'ZEPETO.Script'
import { Transform, Object, Vector3, GameObject, Quaternion, Time } from 'UnityEngine'

export default class AnimationScript extends ZepetoScriptBehaviour {

    Start()
    {
        this.StartCoroutine(this.DoRoutine())
    }

    *DoRoutine() {

        const rotationAngle = new Vector3(0, 0, 10)
        const rotationSpeed = 10

        let floatSpeed = 0.04
        let goingUp = true
        let floatRate = 0.5
        let floatTimer = 0
    
        const startScale = new Vector3(0.2, 0.2, 0.2)
        const endScale = new Vector3(0.3, 0.3, 0.3)

        let scalingUp = true
        const scaleSpeed = 1
        const scaleRate = 0.5
        let scaleTimer = 0

        const thisTransform = this.GetComponent<Transform>()

        while (true)
        {
            thisTransform.Rotate(rotationAngle * rotationSpeed * Time.deltaTime)
            
            floatTimer += Time.deltaTime;
            const moveDir = new Vector3(0, 0, floatSpeed)
            thisTransform.Translate(moveDir)

            if (goingUp && floatTimer >= floatRate)
            {
                goingUp = false
                floatTimer = 0
                floatSpeed = -floatSpeed
            }

            else if (!goingUp && floatTimer >= floatRate)
            {
                goingUp = true
                floatTimer = 0
                floatSpeed = +floatSpeed
            }
                
            scaleTimer += Time.deltaTime

            if (scalingUp)
            {
                thisTransform.localScale = Vector3.Lerp(thisTransform.localScale, endScale, scaleSpeed * Time.deltaTime)
            }
            else if (!scalingUp)
            {
                thisTransform.localScale = Vector3.Lerp(thisTransform.localScale, startScale, scaleSpeed * Time.deltaTime)
            }

            if (scaleTimer >= scaleRate)
            {
                if (scalingUp) { scalingUp = false }
                else if (!scalingUp) { scalingUp = true }
                scaleTimer = 0;
            }

            yield null
        }
    }
}