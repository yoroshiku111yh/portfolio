
import { clearColorDark } from '../../ultilities/variable';
import SceneBase from './../../ultilities/sceneBase';
import * as THREE from 'three';
import { LoaderGLTF } from './../../ultilities/object3dLoader/gltf';
import { LoaderOBJ } from './../../ultilities/object3dLoader/obj';
import { OrbitControls } from '../../ultilities/jsm/controls/orbitControls';

export default class SceneBackgroundMain extends SceneBase {
    constructor({ $container, size = {}, srcModel = "" }) {
        super($container, size.width, size.height);
        this.srcModel = srcModel;
        this.isDebug = true;
        this.init();
    }
    init() {
        this.start();
        ////
        this.renderer.autoClear = false;
        this.renderer.setClearColor(new THREE.Color(clearColorDark));
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
        if(this.groupModel){
            this.camera.lookAt(this.groupModel.position);
        }
    }
    initCamera() {
        this.camera = new THREE.PerspectiveCamera(this.degCameraPerspective, this.W / this.H, this.minPerspective, this.maxPerspective);
        this.camera.position.set(5.19, -0.84, -0.14);
        this.mainScene.add(this.camera);
    }
    testGlass(obj) {
        //const model = obj.scene.children[0];
        this.groupModel = new THREE.Group();
        const options = {
            enableSwoopingCamera: false,
            enableRotation: true,
            transmission: 1,
            thickness: 1.5,
            roughness: 0.07,
            envMapIntensity: 1.5
        };
        const material = new THREE.MeshPhysicalMaterial({
            transmission: options.transmission,
            thickness: options.thickness,
            roughness: options.roughness,
            //envMap: hdrEquirect
        });
        for(let i = 0 ; i < obj.children.length; i++){
            const child = obj.children[i];
            const geo = child.geometry.clone();
            const mesh = new THREE.Mesh(geo, material);
            this.groupModel.add(mesh);
            child.geometry.dispose();
            child.material.dispose();
        }
        this.groupModel.position.set(2, 0, -2);
        this.groupModel.rotateX(5);
        this.mainScene.add(this.groupModel);
    }
    debugControl(){
        if(!this.isDebug) return;
        this.controls.addEventListener("change", () => {
              console.log(this.controls.object.position);
        })
    }
}