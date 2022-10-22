import './style.css'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader.js'
import { TTFLoader } from 'three/examples/jsm/loaders/TTFLoader';
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader';
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 800);
const textureLoader = new THREE.TextureLoader();
const modelLoader = new GLTFLoader();
const textLoader = new FontLoader();

const dracoLoader = new DRACOLoader();
dracoLoader.setDecoderPath('/examples/js/libs/draco/');
modelLoader.setDRACOLoader(dracoLoader);

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// add orbit controls
const controls = new OrbitControls(camera, renderer.domElement);

// add directional light
const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
directionalLight.position.set(3, 3, 1);

const directionalLight2 = new THREE.DirectionalLight(0xaa00ff, 1);
directionalLight2.position.set(-7, 3, 3);

const pointLight = new THREE.PointLight( 0xffffaa, 1.2, 40 );
pointLight.position.x = 50;

const groundGeometry = new THREE.CircleGeometry(10, 32);
const groundMaterial = new THREE.MeshLambertMaterial({ color: 0xffff00, side: THREE.DoubleSide });
const groundTexture = textureLoader.load("./public/textures/marskorrels.jpg");
groundTexture.wrapS = THREE.RepeatWrapping;
groundTexture.wrapT = THREE.RepeatWrapping;
groundTexture.repeat.set(10, 10);

groundMaterial.map = groundTexture;
const ground = new THREE.Mesh(groundGeometry, groundMaterial);

ground.rotation.x = Math.PI / 2;

const houseBaseGeometry = new THREE.CylinderGeometry(1, 1, 1, 8);
const houseBaseMaterial = new THREE.MeshLambertMaterial({ color: 0xffffff });
const houseBaseTexture = textureLoader.load("./public/textures/metal.jpg");
houseBaseTexture.wrapS = THREE.RepeatWrapping;
houseBaseTexture.wrapT = THREE.RepeatWrapping;
houseBaseTexture.repeat.set(5, 2);

houseBaseMaterial.map = houseBaseTexture;
const houseBase = new THREE.Mesh(houseBaseGeometry, houseBaseMaterial);
houseBase.position.y = 0.5;



const houseLevelGeometry = new THREE.CylinderGeometry(0.8, 1, 1, 8);
const houseLevelMaterial = new THREE.MeshLambertMaterial({ color: 0xffffff });
const houseLevelTexture = textureLoader.load("./public/textures/metal.jpg");
houseLevelTexture.wrapS = THREE.RepeatWrapping;
houseLevelTexture.wrapT = THREE.RepeatWrapping;
houseLevelTexture.repeat.set(5, 2);

houseLevelMaterial.map = houseLevelTexture;
const houseLevel = new THREE.Mesh(houseLevelGeometry, houseLevelMaterial);
houseLevel.position.y = 1.25;
houseLevel.position.x = 0.5;

const houseLevel2Geometry = new THREE.CylinderGeometry(0.8, 1, 1, 8);
const houseLevel2Material = new THREE.MeshLambertMaterial({ color: 0xffffff });
const houseLevel2Texture = textureLoader.load("./public/textures/metal.jpg");
houseLevel2Texture.wrapS = THREE.RepeatWrapping;
houseLevel2Texture.wrapT = THREE.RepeatWrapping;
houseLevel2Texture.repeat.set(5, 2);

houseLevel2Material.map = houseLevel2Texture;
const houseLevel2 = new THREE.Mesh(houseLevel2Geometry, houseLevel2Material);
houseLevel2.position.y = 2;

const houseRoofGeometry = new THREE.SphereGeometry(1, 10, 32, 0, Math.PI * 2, 0, Math.PI / 2.5);
const houseRoofMaterial = new THREE.MeshLambertMaterial({ color: 0xffffff });
const houseRoofTexture = textureLoader.load("./public/textures/gold-foil.webp");
houseRoofTexture.wrapS = THREE.RepeatWrapping;
houseRoofTexture.wrapT = THREE.RepeatWrapping;
houseRoofTexture.repeat.set(10, 3);

houseRoofMaterial.map = houseRoofTexture;
const houseRoof = new THREE.Mesh(houseRoofGeometry, houseRoofMaterial);
houseRoof.thetalength = 0.5;
houseRoof.position.y = 2;

const windowGeometry = new THREE.CylinderGeometry(.2, .2, .2, 32);
const windowMaterial = new THREE.MeshLambertMaterial({ color: 0xffffff });
const windowTexture = textureLoader.load("./public/textures/window.jpg");
const fenetre = new THREE.Mesh(windowGeometry, windowMaterial);
windowMaterial.map = windowTexture;
scene.add(fenetre);
fenetre.position.x = 1.32;
fenetre.position.y = 1.3;
fenetre.rotation.z = 3.14 / 2;


const galaxyGeometry = new THREE.SphereGeometry(20, 10, 32, 0,);
const galaxyMaterial = new THREE.MeshLambertMaterial({ color: 0xffffff, side: THREE.DoubleSide });
const galaxyTexture = textureLoader.load("./public/textures/galaxy.png");
galaxyTexture.wrapS = THREE.RepeatWrapping;
galaxyTexture.wrapT = THREE.RepeatWrapping;
galaxyTexture.repeat.set(10, 10);

galaxyMaterial.map = galaxyTexture;
const galaxy = new THREE.Mesh(galaxyGeometry, galaxyMaterial);


const doorGeometry = new THREE.BoxGeometry(0.5, 0.8, 0.5);
const doorMaterial = new THREE.MeshLambertMaterial({ color: 0xffffff });
const doorTexture = textureLoader.load("./public/textures/door.jpg");

doorMaterial.map = doorTexture;
const door = new THREE.Mesh(doorGeometry, doorMaterial);
door.position.x = 0;
door.position.z = 0.75;
door.position.y = 0.4;


let shipModel;
const makeShipModel = (modelPath, px, py, pz, rx, ry, rz) => {
  modelLoader.load(modelPath, (gltf) => {
    gltf.scene.scale.set(0.5, 0.5, 0.5);
    shipModel = gltf.scene;
    scene.add(shipModel);
    shipModel.position.x = px;
    shipModel.position.y = py;
    shipModel.position.z = pz;
    shipModel.rotation.x = rx;
    shipModel.rotation.y = ry;
    shipModel.rotation.z = rz;
  });
}

makeShipModel("./public/models/space_ship.glb", -5, 0.2, -3, 0, 0.7, 0);

let shipModel2;
const makeShipModel2 = (modelPath, px, py, pz, rx, ry, rz) => {
  modelLoader.load(modelPath, (gltf) => {
    gltf.scene.scale.set(0.5, 0.5, 0.5);
    shipModel2 = gltf.scene;
    scene.add(shipModel2);
    shipModel2.position.x = px;
    shipModel2.position.y = py;
    shipModel2.position.z = pz;
    shipModel2.rotation.x = rx;
    shipModel2.rotation.y = ry;
    shipModel2.rotation.z = rz;
  });
}

makeShipModel2("./public/models/space_ship.glb", 0, 6, 0, 0, 0, 0);

let solarModel;
const makeSolarModel = (modelPath, px, py, pz, ry) => {
  modelLoader.load(modelPath, (gltf) => {
    gltf.scene.scale.set(0.008, 0.008, 0.008);
    solarModel = gltf.scene;
    scene.add(solarModel);
    solarModel.position.x = px;
    solarModel.position.y = py;
    solarModel.position.z = pz;
    solarModel.rotation.y = ry;
  });
}
for (let i = 0; i < 6; i++) {
  makeSolarModel("./public/models/solar-panel.glb", 6 - i, 0, 1.2 + i, -0.8);
}

let bush;
const makeBush = (modelPath, px, py, pz) => {
  modelLoader.load(modelPath, (gltf) => {
    gltf.scene.scale.set(0.6, 0.6, 0.6);
    bush = gltf.scene;
    scene.add(bush);
    bush.position.x = px;
    bush.position.y = py;
    bush.position.z = pz;
  });
}

let textMesh;
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
    //textMesh.rotation.y = 0.2;
    //textMesh.rotation.x = -.6;
  }
);

camera.position.x = 0;
camera.position.y = 8;
camera.position.z = 15;
camera.rotation.x = -0.5;

//add everything to scene
scene.add(pointLight, directionalLight, directionalLight2, ground, houseBase, houseLevel, houseLevel2, houseRoof, door, galaxy, fenetre);

//add bushes
for (let i = 0; i < 20; i++) {
  makeBush("./public/models/bush.glb", -5 + Math.random() * 8, 0, Math.random() * 8);
}

let t = 0;

function animate() {
  requestAnimationFrame(animate);

  t += 0.01;
  shipModel2.rotation.y -= 0.0085;
  shipModel2.position.x = 10 * Math.cos(t) + 0;
  shipModel2.position.z = 10 * Math.sin(t) + 0;

  pointLight.rotation.y -= 0.01;
  pointLight.position.x = 10 * Math.cos(t) + 0;
  pointLight.position.y = 10 * Math.sin(t) + 0;

  renderer.render(scene, camera);
};

animate();