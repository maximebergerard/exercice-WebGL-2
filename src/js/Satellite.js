import * as THREE from 'three'
import {MTLLoader, OBJLoader} from 'three-obj-mtl-loader'

import satelliteObject from '../assets/satellite.obj'
import satelliteMaterials from '../assets/satellite.mtl'

export default class Satellite
{
    constructor()
    {
        this.container = new THREE.Object3D()

        this.setSatellite()
    }
    
    setSatellite()
    {
        this.satellite = {}

        this.satellite.mtlLoader = new MTLLoader()
        this.satellite.objLoader = new OBJLoader()
        
        this.satellite.mtlLoader.load(satelliteMaterials, (materials) => {
            materials.preload()
            this.satellite.objLoader.setMaterials(materials)
            this.satellite.objLoader.load(satelliteObject, (object) => {
                this.object = object

                this.object.scale.x = 1
                this.object.scale.y = 1
                this.object.scale.z = 1
                this.object.position.z = -400
                this.object.position.x = -400

                function rotateObject(object, degreeX = 0, degreeY = 0, degreeZ = 0) {
                    object.rotateX(THREE.Math.degToRad(degreeX))
                    object.rotateY(THREE.Math.degToRad(degreeY))
                    object.rotateZ(THREE.Math.degToRad(degreeZ))
                }
                rotateObject(this.object, 0, -30, 0)
        
                this.container.add(this.object)
            })
        })
    }
}