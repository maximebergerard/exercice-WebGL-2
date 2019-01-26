import './css/style.styl'

import * as THREE from 'three'

// import lensflareTexture from './images/textures/lensflare/lensflare0.png'

import Space from './js/Space.js'
import Star from './js/Star.js'

let renderer, scene, camera = []
let right, up, at
let rotation = 0
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
camera.position.y = 0
camera.position.x = 0
camera.rotateY(0)   
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
const space = new Space({
    textureLoader: textureLoader
})
scene.add(space.container)
//

/**
 * Star
 */
const grandeOursX  =
{
    x1: 0,
    x2: 50
}

const grandeOurs = new Star({textureLoader: textureLoader},grandeOursX.x1)
scene.add(grandeOurs.container)
const grandeOurs1 = new Star({textureLoader: textureLoader},grandeOursX.x2)
scene.add(grandeOurs1.container)
//

/**
 * Create a button
 */

const tabStar = ["La grande Ours", "Cassiopé", "La petite Ours"]

const createDiv1 = document.createElement("div")
for (let i = 0; i < 3; i++) {
    const text = document.createTextNode(tabStar[i])
    const createButton = document.createElement("button")
    createDiv1.appendChild(createButton)
    createButton.appendChild(text)
    document.body.appendChild(createDiv1)
    createButton.addEventListener('click', () =>{
        console.log(i)
    })
}

// Hot

if(module.hot)
{
    module.hot.accept()

    module.hot.dispose(() =>
    {
        console.log('dispose')

    })
}