import * as THREE from 'three'

import starDiffuseSource from '../images/textures/sun.jpg'

export default class Star
{
    constructor(_options, xPos)
    {
        this.textureLoader = _options.textureLoader
        
        this.container = new THREE.Object3D()
        this.xPos = xPos
        
        this.setStar()
    }
    setStar()
    {
        /**
         * Shader
         */

        const customMaterial = new THREE.ShaderMaterial( 
            {
                uniforms: {},
                vertexShader:
                `
                varying vec3 vNormal;
                void main() 
                {
                    vNormal = normalize( normalMatrix * normal );
                    gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
                }
                `,
                fragmentShader: 
                `
                varying vec3 vNormal;
                void main() 
                {
                    float intensity = pow( 0.7 - dot( vNormal, vec3( 0.0, 0.0, 0.3 ) ), 6.0 ); 
                    gl_FragColor = vec4( 1.0, 1.0, 1.0, 1.0 ) * intensity;
                }
                `,
                side: THREE.BackSide,
                blending: THREE.AdditiveBlending,
                transparent: true
            }   
        )
        //
        this.globe = {}
        this.globe.geometry = new THREE.SphereBufferGeometry(20, 45, 45)
        this.globe.material = new THREE.MeshStandardMaterial({
            map: this.textureLoader.load(starDiffuseSource),
            metalness: 0.3, 
            roughness: 0.8, 
            side: THREE.DoubleSide
        })
        this.globe.mesh = new THREE.Mesh(this.globe.geometry, customMaterial)
        this.globe.mesh.position.x = this.xPos
        this.globe.mesh.position.z = -200
        this.container.add(this.globe.mesh)
    }
}