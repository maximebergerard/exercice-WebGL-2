import * as THREE from 'three'

export default class Star
{
    constructor(xPos, yPos)
    {        
        this.container = new THREE.Object3D()
        this.xPos = xPos
        this.yPos = yPos
        
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
                    gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1 );
                }
                `,
                fragmentShader: 
                `
                varying vec3 vNormal;
                void main() 
                {
                    float intensity = pow( 0.5 - dot( vNormal, vec3( 0.0, 0.0, 0.5 ) ), 6.0 ); 
                    gl_FragColor = vec4( 1.0, 1.3, 1.3, 1.5 ) * intensity;
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
        this.globe.mesh = new THREE.Mesh(this.globe.geometry, customMaterial)
        this.globe.mesh.position.x = this.xPos
        this.globe.mesh.position.y = this.yPos - 80
        this.globe.mesh.position.z = -500
        this.container.add(this.globe.mesh)
    }
}