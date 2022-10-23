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

        this.renderer = new THREE.WebGLRenderer({
            canvas: document.body.appendChild(renderer.domElement),
            antialias: true,
            alpha: true
        });

        this.renderer.setSize(window.innerWidth, window.innerHeight);

        this.controls = new OrbitControls(this.camera, this.renderer.domElement);

    }

    init() {
        this.addLights();
        this.addTextures();
        this.addModels();
        this.addText();

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
        this.galaxyMaterial.map = galaxyTexture;
        this.galaxy = new THREE.Mesh(galaxyGeometry, galaxyMaterial);



        this.groundGeometry = new THREE.CircleGeometry(10, 32);
        this.groundMaterial = new THREE.MeshLambertMaterial({ color: 0xffff00, side: THREE.DoubleSide });
        this.groundTexture = textureLoader.load("./public/textures/marskorrels.jpg");
        this.groundTexture.wrapS = THREE.RepeatWrapping;
        this.groundTexture.wrapT = THREE.RepeatWrapping;
        this.groundTexture.repeat.set(10, 10);
        this.groundMaterial.map = groundTexture;
        this.ground = new THREE.Mesh(groundGeometry, groundMaterial);
        this.ground.rotation.x = Math.PI / 2;


        this.houseBaseGeometry = new THREE.CylinderGeometry(1, 1, 1, 8);
        this.houseBaseMaterial = new THREE.MeshLambertMaterial({ color: 0xffffff });
        this.houseBaseTexture = textureLoader.load("./public/textures/metal.jpg");
        this.houseBaseTexture.wrapS = THREE.RepeatWrapping;
        this.houseBaseTexture.wrapT = THREE.RepeatWrapping;
        this.houseBaseTexture.repeat.set(5, 2);
        this.houseBaseMaterial.map = houseBaseTexture;
        this.houseBase = new THREE.Mesh(houseBaseGeometry, houseBaseMaterial);
        this.houseBase.position.y = 0.5;



        this.houseLevelGeometry = new THREE.CylinderGeometry(0.8, 1, 1, 8);
        this.houseLevelMaterial = new THREE.MeshLambertMaterial({ color: 0xffffff });
        this.houseLevelTexture = textureLoader.load("./public/textures/metal.jpg");
        this.houseLevelTexture.wrapS = THREE.RepeatWrapping;
        this.houseLevelTexture.wrapT = THREE.RepeatWrapping;
        this.houseLevelTexture.repeat.set(5, 2);
        this.houseLevelMaterial.map = houseLevelTexture;
        this.houseLevel = new THREE.Mesh(houseLevelGeometry, houseLevelMaterial);
        this.houseLevel.position.y = 1.25;
        this.houseLevel.position.x = 0.5;


        this.houseLevel2Geometry = new THREE.CylinderGeometry(0.8, 1, 1, 8);
        this.houseLevel2Material = new THREE.MeshLambertMaterial({ color: 0xffffff });
        this.houseLevel2Texture = textureLoader.load("./public/textures/metal.jpg");
        this.houseLevel2Texture.wrapS = THREE.RepeatWrapping;
        this.houseLevel2Texture.wrapT = THREE.RepeatWrapping;
        this.houseLevel2Texture.repeat.set(5, 2);
        this.houseLevel2Material.map = houseLevel2Texture;
        this.houseLevel2 = new THREE.Mesh(houseLevel2Geometry, houseLevel2Material);
        this.houseLevel2.position.y = 2;


        this.houseRoofGeometry = new THREE.SphereGeometry(1, 10, 32, 0, Math.PI * 2, 0, Math.PI / 2.5);
        this.houseRoofMaterial = new THREE.MeshLambertMaterial({ color: 0xffffff });
        this.houseRoofTexture = textureLoader.load("./public/textures/gold-foil.webp");
        this.houseRoofTexture.wrapS = THREE.RepeatWrapping;
        this.houseRoofTexture.wrapT = THREE.RepeatWrapping;
        this.houseRoofTexture.repeat.set(10, 3);
        this.houseRoofMaterial.map = houseRoofTexture;
        this.houseRoof = new THREE.Mesh(houseRoofGeometry, houseRoofMaterial);
        this.houseRoof.thetalength = 0.5;
        this.houseRoof.position.y = 2;


        this.windowGeometry = new THREE.CylinderGeometry(.2, .2, .2, 32);
        this.windowMaterial = new THREE.MeshLambertMaterial({ color: 0xffffff });
        this.windowTexture = textureLoader.load("./public/textures/window.jpg");
        this.fenetre = new THREE.Mesh(windowGeometry, windowMaterial);
        this.windowMaterial.map = windowTexture;
        this.fenetre.position.x = 1.32;
        this.fenetre.position.y = 1.3;
        this.fenetre.rotation.z = 3.14 / 2;


        this.doorGeometry = new THREE.BoxGeometry(0.5, 0.8, 0.5);
        this.doorMaterial = new THREE.MeshLambertMaterial({ color: 0xffffff });
        this.doorTexture = textureLoader.load("./public/textures/door.jpg");
        this.doorMaterial.map = doorTexture;
        this.door = new THREE.Mesh(doorGeometry, doorMaterial);
        this.door.position.x = 0;
        this.door.position.z = 0.75;
        this.door.position.y = 0.4;

        this.scene.add(galaxy, ground, houseBase, houseLevel, houseLevel2, houseRoof, fenetre, door);

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

                this.flyingShip.position.y = 6;

                this.scene.add(this.flyingShip);
            }
        );

        this.modelLoader.load(
            "./public/models/solar-panel.glb",
            (gltf) => {
                this.solar = gltf.scene;
                this.solar.scale.set(0.008, 0.008, 0.008);

                for (let i = 0; i < 6; i++) {
                    this.solar.position.x = 6 - i;
                    this.solar.position.z = 1.2 + i;
                    this.solar.rotation.y = -0.8;
                    this.scene.add(this.solar);
                }
            }
        );

        this.modelLoader.load(
            "./public/models/bush.glb",
            (gltf) => {
                this.bush = gltf.scene;
                this.bush.scale.set(0.008, 0.008, 0.008);

                for (let i = 0; i < 6; i++) {
                    this.bush.position.x = -5 + Math.random() * 8;
                    this.bush.position.z = Math.random() * 8;
                    this.scene.add(this.bush);
                }
            }
        );


    }

    addText() {
        this.textLoader = new FontLoader();
        textLoader.load(
            './public/fonts/TheWildBreathofZelda_Regular.json',
            (droidFont) => {
                const textGeometry = new TextGeometry("welcome to ricky's space station", {
                    size: 1,
                    height: .4,
                    font: droidFont,
                });
                const textMaterial1 = new THREE.MeshLambertMaterial({ color: 0xffffff });
                const textMaterial2 = new THREE.MeshLambertMaterial({ color: 0xaaffff });
                textMesh = new THREE.Mesh(textGeometry, [textMaterial1, textMaterial2]);
                textMesh.position.x = -8.5;
                textMesh.position.y = 6;
                textMesh.position.z = 0;
                scene.add(textMesh);
            }
        );

    }

    run() {
        this.render();
    }

    animate() {
        let t = 0;
        requestAnimationFrame(this.run.bind(this));
        this.controls.update();
        this.renderer.render(this.scene, this.camera);

        if (this.flyingShip) {
            t += 0.01;
            this.flyingShip.rotation.y -= 0.0085;
            this.flyingShip.position.x = 10 * Math.cos(t) + 0;
            this.flyingShip.position.z = 10 * Math.sin(t) + 0;
        }

        if (this.pointLight) {
            this.pointLight.rotation.y -= 0.02;
            this.pointLight.position.x = 10 * Math.cos(t) + 0;
            this.pointLight.position.y = 10 * Math.sin(t) + 0;
        }
    };

}

export default Scene;


