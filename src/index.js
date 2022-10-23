import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader';
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry';

class Scene {
    constructor() {
        this.scene = new THREE.Scene();
        this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 800);
        this.camera.position.x = 0;
        this.camera.position.y = 8;
        this.camera.position.z = 15;
        this.camera.rotation.x = -0.5;

        this.renderer = new THREE.WebGLRenderer();
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        document.body.appendChild(this.renderer.domElement);

        this.renderer.setSize(window.innerWidth, window.innerHeight);

        this.controls = new OrbitControls(this.camera, this.renderer.domElement);

        this.clock = new THREE.Clock();

    }

    init() {
        this.addLights();
        this.addTextures();
        this.addModels();
        this.addText();
        this.render();

    }

    addLights() {
        // add directional light
        this.directionalLight = new THREE.DirectionalLight(0xffffff, 1);
        this.directionalLight.position.set(3, 3, 1);

        this.directionalLight2 = new THREE.DirectionalLight(0xaa00ff, 1);
        this.directionalLight2.position.set(-7, 3, 3);

        this.pointLight = new THREE.PointLight(0xffffaa, 1.2, 40);
        this.pointLight.position.x = 50;

        this.scene.add(this.directionalLight, this.directionalLight2, this.pointLight);
    }

    addTextures() {
        const textureLoader = new THREE.TextureLoader();

        this.galaxyGeometry = new THREE.SphereGeometry(20, 10, 32, 0,);
        this.galaxyMaterial = new THREE.MeshLambertMaterial({ color: 0xffffff, side: THREE.DoubleSide });
        this.galaxyTexture = textureLoader.load("./public/textures/galaxy.png");
        this.galaxyTexture.wrapS = THREE.RepeatWrapping;
        this.galaxyTexture.wrapT = THREE.RepeatWrapping;
        this.galaxyTexture.repeat.set(10, 10);
        this.galaxyMaterial.map = this.galaxyTexture;
        this.galaxy = new THREE.Mesh(this.galaxyGeometry, this.galaxyMaterial);


        this.groundGeometry = new THREE.CircleGeometry(10, 32);
        this.groundMaterial = new THREE.MeshLambertMaterial({ color: 0xffff00, side: THREE.DoubleSide });
        this.groundTexture = textureLoader.load("./public/textures/marskorrels.jpg");
        this.groundTexture.wrapS = THREE.RepeatWrapping;
        this.groundTexture.wrapT = THREE.RepeatWrapping;
        this.groundTexture.repeat.set(10, 10);
        this.groundMaterial.map = this.groundTexture;
        this.ground = new THREE.Mesh(this.groundGeometry, this.groundMaterial);
        this.ground.rotation.x = Math.PI / 2;


        this.houseBaseGeometry = new THREE.CylinderGeometry(1, 1, 1, 8);
        this.houseBaseMaterial = new THREE.MeshLambertMaterial({ color: 0xffffff });
        this.houseBaseTexture = textureLoader.load("./public/textures/metal.jpg");
        this.houseBaseTexture.wrapS = THREE.RepeatWrapping;
        this.houseBaseTexture.wrapT = THREE.RepeatWrapping;
        this.houseBaseTexture.repeat.set(5, 2);
        this.houseBaseMaterial.map = this.houseBaseTexture;
        this.houseBase = new THREE.Mesh(this.houseBaseGeometry, this.houseBaseMaterial);
        this.houseBase.position.y = 0.5;


        this.houseLevelGeometry = new THREE.CylinderGeometry(0.8, 1, 1, 8);
        this.houseLevelMaterial = new THREE.MeshLambertMaterial({ color: 0xffffff });
        this.houseLevelTexture = textureLoader.load("./public/textures/metal.jpg");
        this.houseLevelTexture.wrapS = THREE.RepeatWrapping;
        this.houseLevelTexture.wrapT = THREE.RepeatWrapping;
        this.houseLevelTexture.repeat.set(5, 2);
        this.houseLevelMaterial.map = this.houseLevelTexture;
        this.houseLevel = new THREE.Mesh(this.houseLevelGeometry, this.houseLevelMaterial);
        this.houseLevel.position.y = 1.25;
        this.houseLevel.position.x = 0.5;


        this.houseLevel2Geometry = new THREE.CylinderGeometry(0.8, 1, 1, 8);
        this.houseLevel2Material = new THREE.MeshLambertMaterial({ color: 0xffffff });
        this.houseLevel2Texture = textureLoader.load("./public/textures/metal.jpg");
        this.houseLevel2Texture.wrapS = THREE.RepeatWrapping;
        this.houseLevel2Texture.wrapT = THREE.RepeatWrapping;
        this.houseLevel2Texture.repeat.set(5, 2);
        this.houseLevel2Material.map = this.houseLevel2Texture;
        this.houseLevel2 = new THREE.Mesh(this.houseLevel2Geometry, this.houseLevel2Material);
        this.houseLevel2.position.y = 2;


        this.houseRoofGeometry = new THREE.SphereGeometry(1, 10, 32, 0, Math.PI * 2, 0, Math.PI / 2.5);
        this.houseRoofMaterial = new THREE.MeshLambertMaterial({ color: 0xffffff });
        this.houseRoofTexture = textureLoader.load("./public/textures/gold-foil.webp");
        this.houseRoofTexture.wrapS = THREE.RepeatWrapping;
        this.houseRoofTexture.wrapT = THREE.RepeatWrapping;
        this.houseRoofTexture.repeat.set(10, 3);
        this.houseRoofMaterial.map = this.houseRoofTexture;
        this.houseRoof = new THREE.Mesh(this.houseRoofGeometry, this.houseRoofMaterial);
        this.houseRoof.thetalength = 0.5;
        this.houseRoof.position.y = 2;


        this.windowGeometry = new THREE.CylinderGeometry(.2, .2, .2, 32);
        this.windowMaterial = new THREE.MeshLambertMaterial({ color: 0xffffff });
        this.windowTexture = textureLoader.load("./public/textures/window.jpg");
        this.fenetre = new THREE.Mesh(this.windowGeometry, this.windowMaterial);
        this.windowMaterial.map = this.windowTexture;
        this.fenetre.position.x = 1.32;
        this.fenetre.position.y = 1.3;
        this.fenetre.rotation.z = 3.14 / 2;


        this.doorGeometry = new THREE.BoxGeometry(0.5, 0.8, 0.5);
        this.doorMaterial = new THREE.MeshLambertMaterial({ color: 0xffffff });
        this.doorTexture = textureLoader.load("./public/textures/door.jpg");
        this.doorMaterial.map = this.doorTexture;
        this.door = new THREE.Mesh(this.doorGeometry, this.doorMaterial);
        this.door.position.x = 0;
        this.door.position.z = 0.75;
        this.door.position.y = 0.4;

        this.scene.add(this.galaxy, this.ground, this.houseBase, this.houseLevel, this.houseLevel2, this.houseRoof, this.fenetre, this.door);

    }

    addModels() {
        this.modelLoader = new GLTFLoader();

        this.modelLoader.load(
            "./public/models/space_ship.glb",
            (gltf) => {
                this.ship = gltf.scene;
                this.ship.scale.set(0.5, 0.5, 0.5);

                this.ship.position.x = -5;
                this.ship.position.y = 0.2;
                this.ship.position.z = -3;
                this.ship.rotation.y = 0.7;

                this.scene.add(this.ship);
            }
        );

        this.modelLoader.load(
            "./public/models/space_ship.glb",
            (gltf) => {
                this.flyingShip = gltf.scene;
                this.flyingShip.scale.set(0.5, 0.5, 0.5);

                this.scene.add(this.flyingShip);
            }
        );

        for (let i = 0; i < 6; i++) {
            this.modelLoader.load(
                "./public/models/solar-panel.glb",
                (gltf) => {
                    this.solar = gltf.scene;
                    this.solar.scale.set(0.008, 0.008, 0.008);
                    this.solar.rotation.y = -0.8;

                    this.solar.position.x = 6 - i;
                    this.solar.position.z = 1.2 + i;
                    this.scene.add(this.solar);

                }
            );
        }

        for (let i = 0; i < 6; i++) {
            this.modelLoader.load(
                "./public/models/bush.glb",
                (gltf) => {
                    this.bush = gltf.scene;
                    this.bush.scale.set(1,1,1);

                    this.bush.position.x = -5 + Math.random() * 8;
                    this.bush.position.z = Math.random() * 8;
                    this.scene.add(this.bush);
                    console.log("bush added on" + this.bush.position.x + " " + this.bush.position.z);
                }
            );
        }

    }

    addText() {
        const textLoader = new FontLoader();
        textLoader.load(
            './public/fonts/TheWildBreathofZelda_Regular.json',
            (droidFont) => {
                this.textGeometry = new TextGeometry("welcome to ricky's space station", {
                    size: 1,
                    height: .4,
                    font: droidFont,
                });
                this.textMaterial1 = new THREE.MeshLambertMaterial({ color: 0xffffff });
                this.textMaterial2 = new THREE.MeshLambertMaterial({ color: 0xaaffff });
                this.textMesh = new THREE.Mesh(this.textGeometry, [this.textMaterial1, this.textMaterial2]);
                this.textMesh.position.x = -8.5;
                this.textMesh.position.y = 6;
                this.textMesh.position.z = 0;
                this.scene.add(this.textMesh);
            }
        );

    }

    render() {
        requestAnimationFrame(this.render.bind(this));
        this.controls.update();
        let t = 0;
        let r = 12;

        if (this.flyingShip) {
            t = this.clock.getElapsedTime() * 0.1 * Math.PI;
            this.flyingShip.position.set(
                Math.cos(t + Math.PI * 0.5 * 0) * r,
                6,
                Math.sin(t + Math.PI * 0.5 * 0) * r,
            )
            this.flyingShip.rotation.y = -t + Math.PI * 0.2 * r;
        }

        if (this.pointLight) {
            t = this.clock.getElapsedTime() * 0.3 * Math.PI;
            this.pointLight.rotation.y -= 0.02;
            this.pointLight.position.x = 10 * Math.cos(t) + 0;
            this.pointLight.position.y = 10 * Math.sin(t) + 0;
        }
        this.renderer.render(this.scene, this.camera);

    };

}

export default Scene;


