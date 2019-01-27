import './css/style.styl'

import * as THREE from 'three'

// import lensflareTexture from './images/textures/lensflare/lensflare0.png'

import Space from './js/Space.js'
import Star from './js/Star.js'
import Satellite from './js/Satellite.js';

let renderer, scene, camera = []
let right, up, at
let rotation = 0
let y = 0
let x = 0
let directions = {}
directions.forward = false
directions.backward = false
directions.left = false
directions.right = false
/**
 * Textures
 */
const textureLoader = new THREE.TextureLoader()
// const lensflare = new THREE.Lensflare()
//

/**
 * Lensflare
 */

// const light = new THREE.PointLight( 0xffffff, 1.5, 2000 )

// const textureFlare0 = textureLoader.load(lensflareTexture)
// lensflare.addElement( new THREE.LensflareElement( textureFlare0, 512, 0 ) )

// light.add( lensflare )

/**
 * Sizes
 */
const sizes = {}
sizes.width = window.innerWidth
sizes.height = window.innerHeight
//

/**
 * Sizes
 */
window.addEventListener('resize', () =>
{
    // Update sizes
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight
    
    // Update camera
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()
    
    // Update renderer
    renderer.setSize(sizes.width, sizes.height)
})


renderer = new THREE.WebGLRenderer()
renderer.setSize(sizes.width, sizes.height)
renderer.shadowMap.enabled = true
document.body.appendChild(renderer.domElement)

right = new THREE.Vector3()
up = new THREE.Vector3()
at = new THREE.Vector3()
    

camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 1, 4000)
camera.matrix.extractBasis(right,up,at)
camera.position.z = 150
camera.position.x = 0
scene = new THREE.Scene()
scene.add(camera) 

window.addEventListener("keydown", onKeyDown, false)
window.addEventListener("keyup", onKeyUp, false)

const animate = () =>  
{
    window.requestAnimationFrame(animate)
    camera.rotation.y += rotation
    camera.matrix.extractBasis(right,up,at)
    if(directions.forward) {
        camera.position.add(at.multiplyScalar(-2))
        camera.matrix.extractBasis(right,up,at)
    }
    if(directions.backward) {
        camera.position.add(at.multiplyScalar(2))
        camera.matrix.extractBasis(right,up,at)
    }
    if(directions.left) {
        camera.position.add(right.multiplyScalar(-2))
        camera.matrix.extractBasis(right,up,at)
    }
    if(directions.right) {
        camera.position.add(right.multiplyScalar(2))
        camera.matrix.extractBasis(right,up,at)
    }
    renderer.render(scene, camera)
}
animate()

function onKeyDown(e) {
    switch(e.keyCode) {
        case 37: // Left
        case 81: // Q
            directions.left = true
        break
 
        case 38: // Up
        case 90: // Z
            directions.forward = true
        break
 
        case 39: // Right
        case 68: // D
            directions.right = true
        break
 
        case 40: // Down
        case 83: // S
            directions.backward = true
        break
    }
}

function onKeyUp(e) {
    switch(e.keyCode) {
        case 37: // Left
        case 81: // Q
            directions.left = false
        break
 
        case 38: // Up
        case 90: // Z
            directions.forward = false
        break
 
        case 39: // Right
        case 68: // D
            directions.right = false
        break
 
        case 40: // Down
        case 83: // S
            directions.backward = false
        break
    }
}

/**
 * Cursor
 */
const cursor = {}
cursor.x = sizes.width / 2
cursor.y = sizes.height / 2

// const updateRotation = (x, y) => 
// {
//     camera.rotateY(x * - 0.01)
//     camera.rotateX(y * - 0.01)
// }
// window.addEventListener('mousemove', (_event) =>
// {
//     cursor.x += _event.movementX
//     cursor.y += _event.movementY
//     updateRotation(_event.movementX, _event.movementY)
// })

/**
 * Lights 
 */
const skyLight = new THREE.HemisphereLight( 0xffffbb, 0x080820, 5 )
skyLight.position.x = 0
scene.add(skyLight)
//

/**
 * Space background
 */
const space = new Space({textureLoader: textureLoader})
scene.add(space.container)
//

/**
 * Satellite
 */
const satellite = new Satellite()
scene.add(satellite.container)
//

/**
 * The Great bear
 */

const theGreatBearXY  =
{
    x1: 0,
    y1: 0,
    x2: -10,
    y2: -150,
    x3: 400,
    y3: -40,
    x4: 320,
    y4: -230,
    x5: -120,
    y5: 180,
    x6: -240,
    y6: 300,
    x7: -460,
    y7: 380,
}

const theGreatBear1 = new Star(theGreatBearXY.x1, theGreatBearXY.y1)
const theGreatBear2 = new Star(theGreatBearXY.x2, theGreatBearXY.y2)
const theGreatBear3 = new Star(theGreatBearXY.x3, theGreatBearXY.y3)
const theGreatBear4 = new Star(theGreatBearXY.x4, theGreatBearXY.y4)
const theGreatBear5 = new Star(theGreatBearXY.x5, theGreatBearXY.y5)
const theGreatBear6 = new Star(theGreatBearXY.x6, theGreatBearXY.y6)
const theGreatBear7 = new Star(theGreatBearXY.x7, theGreatBearXY.y7)

const firstConstellation = () => {scene.add(theGreatBear1.container, theGreatBear2.container, theGreatBear3.container, theGreatBear4.container, theGreatBear5.container, theGreatBear6.container, theGreatBear7.container)}
//

/**
 * Cassiopeia
 */
const cassiopeiaXY  =
{
    x1: 0,
    y1: 100,
    x2: 100,
    y2: -200,
    x3: 400,
    y3: 0,
    x4: -250,
    y4: 70,
    x5: -400,
    y5: 400,
}

const cassiopeia1 = new Star(cassiopeiaXY.x1, cassiopeiaXY.y1) 
const cassiopeia2 = new Star(cassiopeiaXY.x2, cassiopeiaXY.y2)
const cassiopeia3 = new Star(cassiopeiaXY.x3, cassiopeiaXY.y3)
const cassiopeia4 = new Star(cassiopeiaXY.x4, cassiopeiaXY.y4)
const cassiopeia5 = new Star(cassiopeiaXY.x5, cassiopeiaXY.y5)

const secondConstellation = () => {scene.add(cassiopeia1.container, cassiopeia2.container, cassiopeia3.container, cassiopeia4.container, cassiopeia5.container)}
//

/**
 * Cancer
 */

const cancerXY  =
{
    x1: 0,
    y1: 40,
    x2: -50,
    y2: 140,
    x3: 400,
    y3: -40,
    x4: 0,
    y4: -250,
    x5: -250,
    y5: 350,
}

const cancer1 = new Star(cancerXY.x1, cancerXY.y1) 
const cancer2 = new Star(cancerXY.x2, cancerXY.y2)
const cancer3 = new Star(cancerXY.x3, cancerXY.y3)
const cancer4 = new Star(cancerXY.x4, cancerXY.y4)
const cancer5 = new Star(cancerXY.x5, cancerXY.y5)

const thirdConstellation = () => {scene.add(cancer1.container, cancer2.container, cancer3.container, cancer4.container, cancer5.container)}
//

/**
 * Orion
 */

const orionXY  =
{
    x1: 0,
    y1: 0,
    x2: -100,
    y2: -50,
    x3: -300,
    y3: 500,
    x4: 50,
    y4: 530,
    x5: 200,
    y5: 400,
    x6: 80,
    y6: 70,
    x7: 300,
    y7: -380,
    x8: -150,
    y8: -400
}

const orion1 = new Star(orionXY.x1, orionXY.y1)
const orion2 = new Star(orionXY.x2, orionXY.y2)
const orion3 = new Star(orionXY.x3, orionXY.y3)
const orion4 = new Star(orionXY.x4, orionXY.y4)
const orion5 = new Star(orionXY.x5, orionXY.y5)
const orion6 = new Star(orionXY.x6, orionXY.y6)
const orion7 = new Star(orionXY.x7, orionXY.y7)
const orion8 = new Star(orionXY.x8, orionXY.y8)

const fourthConstellation = () => {scene.add(orion1.container, orion2.container, orion3.container, orion4.container, orion5.container, orion6.container, orion7.container, orion8.container)}
//

/**
 * Aries
 */
const ariesXY  =
{
    x1: 0,
    y1: 100,
    x2: 200,
    y2: -100,
    x3: 240,
    y3: -200,
    x4: -500,
    y4: 170,
}

const aries1 = new Star(ariesXY.x1, ariesXY.y1) 
const aries2 = new Star(ariesXY.x2, ariesXY.y2)
const aries3 = new Star(ariesXY.x3, ariesXY.y3)
const aries4 = new Star(ariesXY.x4, ariesXY.y4)

const fifthConstellation = () => {scene.add(aries1.container, aries2.container, aries3.container, aries4.container)}
//

/**
 * Cepheus
 */

const cepheusXY  =
{
    x1: -200,
    y1: 50,
    x2: 200,
    y2: -50,
    x3: -150,
    y3: -400,
    x4: -100,
    y4: 350,
    x5: 320,
    y5: 320,
}

const cepheus1 = new Star(cepheusXY.x1, cepheusXY.y1) 
const cepheus2 = new Star(cepheusXY.x2, cepheusXY.y2)
const cepheus3 = new Star(cepheusXY.x3, cepheusXY.y3)
const cepheus4 = new Star(cepheusXY.x4, cepheusXY.y4)
const cepheus5 = new Star(cepheusXY.x5, cepheusXY.y5)

const sixthConstellation = () => {scene.add(cepheus1.container, cepheus2.container, cepheus3.container, cepheus4.container, cepheus5.container)}
//

/**
 * Create buttons and interact 
 */

const tabStar = ["La grande Ourse", "Cassiopée", "Cancer", "Orion", "Bélier", "Céphée"]

const createDiv1 = document.createElement("div")
for (let i = 0; i < 6; i++) {
    const text = document.createTextNode(tabStar[i])
    const createButton = document.createElement("button")
    createDiv1.appendChild(createButton)
    createButton.appendChild(text)
    document.body.appendChild(createDiv1)
    createButton.addEventListener('click', () =>{
        if (i === 0) {
            scene.remove(scene.children[4], scene.children[5], scene.children[6], scene.children[7], scene.children[8], scene.children[9], scene.children[10], scene.children[11])
            firstConstellation()          
        }
        if (i === 1) {
            scene.remove(scene.children[4], scene.children[5], scene.children[6], scene.children[7], scene.children[8], scene.children[9], scene.children[10], scene.children[11])
            secondConstellation()
        }
        if (i === 2) {
            scene.remove(scene.children[4], scene.children[5], scene.children[6], scene.children[7], scene.children[8], scene.children[9], scene.children[10], scene.children[11])
            thirdConstellation()           
        }
        if (i === 3) {
            scene.remove(scene.children[4], scene.children[5], scene.children[6], scene.children[7], scene.children[8], scene.children[9], scene.children[10], scene.children[11])
            fourthConstellation()           
        }
        if (i === 4) {
            scene.remove(scene.children[4], scene.children[5], scene.children[6], scene.children[7], scene.children[8], scene.children[9], scene.children[10], scene.children[11])
            fifthConstellation()           
        }
        if (i === 5) {
            scene.remove(scene.children[4], scene.children[5], scene.children[6], scene.children[7], scene.children[8], scene.children[9], scene.children[10], scene.children[11])
            sixthConstellation()           
        }
    })
}


const loop = () =>
{
    window.requestAnimationFrame(loop)
    
    //Update camera
    y += 0.01
    x += 0.02
    camera.position.y = (Math.cos(y))*10
    camera.position.x = (Math.cos(x))*10    
}


loop()

// Hot

if(module.hot)
{
    module.hot.accept()

    module.hot.dispose(() =>
    {
        console.log('dispose')

    })
}