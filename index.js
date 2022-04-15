window.addEventListener("contextmenu",e => e.preventDefault())

function resizeCanvas(ratio = 1){
    const canvas = document.querySelector('canvas')
    if(window.innerWidth > window.innerHeight){
        const pixels = Math.floor(window.innerHeight * ratio)
        canvas.width = pixels
        canvas.height = pixels
        return pixels
    }
        const pixels = Math.floor(window.innerWidth * ratio)
        canvas.width = pixels
        canvas.height = pixels
    return pixels
}

function fillBackground(color = "#FFF"){
    const canvas = document.querySelector('canvas')
    const context = canvas.getContext('2d')
    context.save()
    context.fillStyle = color
    context.fillRect(0,0,canvas.width,canvas.height)
    context.restore()
}

function fillCircle(color = "#000", ratio = 0.9){
    const canvas = document.querySelector('canvas')
    const context = canvas.getContext('2d')
    const center = Math.floor(canvas.width / 2)
    const radius = Math.floor(ratio * center)
    context.save()
    context.fillStyle = color
    context.translate(center,center)
    context.beginPath()
    context.arc(0, 0, radius, 0, Math.PI*2)
    context.fill()
    context.restore()
}

class Blade{
    constructor(color = "#FFF", ratio = 0.9){
        this.canvas = document.querySelector('canvas')
        this.context = this.canvas.getContext('2d')
        this.color = color
        this.lineWidth = 0.5
        this.maxLines = this.canvas.width * 8
        this.maxRadii = 72
        
        this.center = Math.floor(this.canvas.width / 2)
        this.radius = Math.floor(ratio * this.center)
        
        this.radiusAngle = 0
        this.radiusRotations = Math.floor(fxrand() * this.maxRadii) + 20
        this.radiusVelocity = Math.PI * 2 / this.radiusRotations

        this.circAngle = Math.PI / 2 * fxrand()
        this.circRotations = Math.floor(this.maxLines / this.radiusRotations)
        this.circVelocity = Math.PI * 2 / this.circRotations
    }

    rotateRadius(){
        this.radiusAngle += this.radiusVelocity
    }

    rotateCirc(){
        this.circAngle += this.circVelocity
    }

    drawBladeLine({context} = this){
        context.save()
        context.strokeStyle = this.color
        context.lineWidth = this.lineWidth
        context.translate(this.center, this.center)
        context.rotate(this.radiusAngle)
        context.translate(this.radius, 0)
        context.rotate(this.circAngle)
        context.beginPath()
        context.moveTo(0,0)
        context.lineTo(this.radius * 2, 0)
        context.stroke()
        context.restore()
    }

    drawBlades(){
        for(let i = 0; i < this.radiusRotations; i++){
            for(let j = 0; j < this.circRotations; j++){
                this.drawBladeLine()
                this.rotateCirc()
            }
            this.rotateRadius()
        }
        
    }
}

resizeCanvas()
fillBackground()
fillCircle()

const blade1 = new Blade()
blade1.drawBlades()

window.$fxhashFeatures = {
    "Radius Count": blade1.radiusRotations,
    "Circumference Count": blade1.circRotations
}