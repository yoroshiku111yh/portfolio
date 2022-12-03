
import { clearColorDark } from '../../ultilities/variable';
import SceneBase from '../../ultilities/sceneBase';
import * as THREE from 'three';
import { LoaderGLTF } from '../../ultilities/object3dLoader/gltf';
import { LoaderOBJ } from '../../ultilities/object3dLoader/obj';
import { OrbitControls } from '../../ultilities/jsm/controls/orbitControls';
import { RGBELoader } from '../../ultilities/rGBELoader';
import ShaderLiquidMarble from './../../../shaders/liquidMarble/index';
import { getResolutionVec3 } from '../../ultilities/resolution';
import gsap, { Power1 } from 'gsap';

export default class SceneBackgroundMain extends SceneBase {
    constructor({ $container, size = {}, srcModel = "", srcEnv = "" }) {
        super($container, size.width, size.height);
        this.resolution = getResolutionVec3({ W: this.W, H: this.H });
        this.srcModel = srcModel;
        this.srcEnv = srcEnv;
        this.isDebug = true;
        this.countBlob = 0;
        this.multiBlob = 10;
        this.init();
    }
    init() {
        this.start();
        ////
        this.renderer.autoClear = false;
        this.renderer.setClearColor(new THREE.Color("#000"));
        ////
        ////
        this.loadModel();
        this.initCamera();

        this.controls = new OrbitControls(this.camera, this.renderer.domElement);
        this.debugControl();

        this.update();
    }
    loadModel() {
        if (!this.srcModel) return;
        new LoaderOBJ({
            src: this.srcModel,
            resolve: (obj) => {
                this.testGlass(obj);
                setTimeout(() => {
                    this.testAnimate();
                }, 2000);
            },
            reject: (err) => {
                console.log(err)
            }
        })
    }
    updateCallback() {
        //this.camera.lookAt( this.mainScene.position );
        this.controls.update();
        this.renderer.clear();

        if (this.groupModel) {
            this.camera.lookAt(this.groupModel.position);
            this.matShader.getUniforms().iTime.value += 0.0015;
            this.blobModel(this.arModel, this.matShader.getUniforms().iTime.value);
        }
    }
    initCamera() {
        this.camera = new THREE.PerspectiveCamera(this.degCameraPerspective, this.W / this.H, this.minPerspective, this.maxPerspective);
        this.camera.position.set(2.14, -0.998, 8.047);
        this.mainScene.add(this.camera);
    }

    generateTexture() {

        const canvas = document.createElement('canvas');
        canvas.width = 2;
        canvas.height = 2;

        const context = canvas.getContext('2d');
        context.fillStyle = 'white';
        context.fillRect(0, 1, 2, 1);

        return canvas;

    }

    testGlass(obj) {
        this.groupModel = new THREE.Group();
        this.arModel = [];
        const hdrEquirect = new RGBELoader().load(
            this.srcEnv,
            () => {
                hdrEquirect.mapping = THREE.EquirectangularReflectionMapping;
            }
        )

        const options = {
            enableSwoopingCamera: false,
            enableRotation: true,
            transmission: 1,
            thickness: 1.5,
            roughness: 0.09,
            envMapIntensity: 1.5
        };
        this.material = new THREE.MeshPhysicalMaterial({
            transmission: options.transmission,
            thickness: options.thickness,
            roughness: options.roughness,
            envMap: hdrEquirect,
            metalness : 0,
            flatShading: false
        });
        this.matShader = new ShaderLiquidMarble({
            iResolution: {
                value: this.resolution
            },
            iTime: {
                value: 0.
            }
        });
        for (let i = 0; i < obj.children.length; i++) {
            const child = obj.children[i];
            const geo = child.geometry.clone();
            console.log(geo);
            const mesh = new THREE.Mesh(geo, this.material);
            this.groupModel.add(mesh);
            child.geometry.dispose();
            child.material.dispose();
            this.arModel.push(mesh);
        }
        this.groupModel.position.set(2, 0, -2);
        this.groupModel.rotateX(5);
        this.mainScene.add(this.groupModel);
    }
    debugControl() {
        if (!this.isDebug) return;
        this.controls.addEventListener("change", () => {
            console.log(this.controls.object.position);
        })
    }
    testAnimate(){
        gsap.to(this.material, {metalness : 1, duration : 0.5, ease : Power1.easeInOut});
    }
    blobModel(arModel = [], time = 0) {
        return;
        for (let z = 0; z < arModel.length; z++) {
            const model = arModel[z];
            const positions = model.geometry.attributes.position;
            var k = 5;
            for (var i = 0; i < positions.count; i++) {
                let x = positions.getX(i);
                let y = positions.getY(i);
                let z = positions.getZ(i);
                const p = new THREE.Vector3(x, y, z);
                p.multiplyScalar(1 + 0.005* noise.perlin3(p.x * k  , p.y * k , p.z * k + time*100));
                positions.setXYZ(i, p.x, p.y, p.z);
            }
            positions.needsUpdate  = true;
            model.geometry.computeVertexNormals();
            model.geometry.normalsNeedUpdate = true;
            model.geometry.verticesNeedUpdate = true;
        }
    }
}