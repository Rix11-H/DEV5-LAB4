import './style.css'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader.js'

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 800 );
const textureLoader = new THREE.TextureLoader();
const modelLoader = new GLTFLoader();

const dracoLoader = new DRACOLoader();
dracoLoader.setDecoderPath( '/examples/js/libs/draco/' );
modelLoader.setDRACOLoader( dracoLoader );

const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

// add orbit controls
const controls = new OrbitControls(camera, renderer.domElement);

// add grid helper
const gridHelper = new THREE.GridHelper(200, 50);
//scene.add(gridHelper);

// add directional light
const directionalLight = new THREE.DirectionalLight( 0xffffff, 1 );
directionalLight.position.set( 3, 3, 1 );
scene.add( directionalLight );

const directionalLight2 = new THREE.DirectionalLight( 0xaa00ff, 1 );
directionalLight2.position.set( -7, 3, 3 );
scene.add( directionalLight2 );


// add directional light helper
const directionalLightHelper = new THREE.DirectionalLightHelper( directionalLight2, 2 );
scene.add( directionalLightHelper );


const groundGeometry = new THREE.CircleGeometry( 10, 32 );
const groundMaterial = new THREE.MeshLambertMaterial( {color: 0xffff00, side: THREE.DoubleSide} );
const groundTexture = textureLoader.load("./public/textures/marskorrels.jpg");
groundTexture.wrapS = THREE.RepeatWrapping;
groundTexture.wrapT = THREE.RepeatWrapping;
groundTexture.repeat.set( 10, 10 );

groundMaterial.map = groundTexture;
const ground = new THREE.Mesh( groundGeometry, groundMaterial );

ground.rotation.x = Math.PI / 2;
scene.add( ground );

const houseBaseGeometry = new THREE.CylinderGeometry( 1, 1, 1, 8 );
const houseBaseMaterial = new THREE.MeshLambertMaterial( { color: 0xffffff } );
const houseBaseTexture = textureLoader.load("./public/textures/metal.jpg");
houseBaseTexture.wrapS = THREE.RepeatWrapping;
houseBaseTexture.wrapT = THREE.RepeatWrapping;
houseBaseTexture.repeat.set( 5, 2 );

houseBaseMaterial.map = houseBaseTexture;
const houseBase = new THREE.Mesh( houseBaseGeometry, houseBaseMaterial );
scene.add( houseBase );
houseBase.position.y = 0.5;

const houseLevelGeometry = new THREE.CylinderGeometry( 0.8, 1, 1, 8 );
const houseLevelMaterial = new THREE.MeshLambertMaterial( { color: 0xffffff } );
const houseLevelTexture = textureLoader.load("./public/textures/metal.jpg");
houseLevelTexture.wrapS = THREE.RepeatWrapping;
houseLevelTexture.wrapT = THREE.RepeatWrapping;
houseLevelTexture.repeat.set( 5, 2 );

houseLevelMaterial.map = houseLevelTexture;
const houseLevel = new THREE.Mesh( houseLevelGeometry, houseLevelMaterial );
scene.add( houseLevel );
houseLevel.position.y = 1.25;
houseLevel.position.x = 0.5;

const houseLevel2Geometry = new THREE.CylinderGeometry( 0.8, 1, 1, 8 );
const houseLevel2Material = new THREE.MeshLambertMaterial( { color: 0xffffff } );
const houseLevel2Texture = textureLoader.load("./public/textures/metal.jpg");
houseLevel2Texture.wrapS = THREE.RepeatWrapping;
houseLevel2Texture.wrapT = THREE.RepeatWrapping;
houseLevel2Texture.repeat.set( 5, 2 );

houseLevel2Material.map = houseLevel2Texture;
const houseLevel2 = new THREE.Mesh( houseLevel2Geometry, houseLevel2Material );
scene.add( houseLevel2 );
houseLevel2.position.y = 2;

const houseRoofGeometry = new THREE.SphereGeometry( 1,10,32,0,Math.PI*2,0,Math.PI/2.5 );
const houseRoofMaterial = new THREE.MeshLambertMaterial( { color: 0xffffff } );
const houseRoofTexture = textureLoader.load("./public/textures/gold-foil.webp");
houseRoofTexture.wrapS = THREE.RepeatWrapping;
houseRoofTexture.wrapT = THREE.RepeatWrapping;
houseRoofTexture.repeat.set( 10, 10 );

houseRoofMaterial.map = houseRoofTexture;
const houseRoof = new THREE.Mesh( houseRoofGeometry, houseRoofMaterial );
scene.add( houseRoof );
houseRoof.thetalength = 0.5;
houseRoof.position.y = 2;

const galaxyGeometry = new THREE.SphereGeometry( 20,10,32,0, );
const galaxyMaterial = new THREE.MeshLambertMaterial( { color: 0xffffff, side: THREE.DoubleSide } );
const galaxyTexture = textureLoader.load("./public/textures/galaxy.png");
galaxyTexture.wrapS = THREE.RepeatWrapping;
galaxyTexture.wrapT = THREE.RepeatWrapping;
galaxyTexture.repeat.set( 10, 10 );

galaxyMaterial.map = galaxyTexture;
const galaxy = new THREE.Mesh( galaxyGeometry, galaxyMaterial );
scene.add( galaxy );

const doorGeometry = new THREE.BoxGeometry( 0.5, 0.8, 0.5 );
const doorMaterial = new THREE.MeshLambertMaterial( { color: 0xffffff } );
const doorTexture = textureLoader.load("./public/textures/door.jpg");

doorMaterial.map = doorTexture;
const door = new THREE.Mesh( doorGeometry, doorMaterial );
scene.add( door );
door.position.x = 0;
door.position.z = 0.75;
door.position.y = 0.4;

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
for(let i = 0; i < 6; i++) {
    makeSolarModel("./public/models/solar-panel.glb", 2 + Math.random()* 4 , 0 , Math.random()* 4 , -0.6);
}

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

camera.position.x = 0;
camera.position.y = 8;
camera.position.z = 15;
camera.rotation.x = -0.5;

let t = 0;

function animate() {
  requestAnimationFrame( animate );

  t += 0.01;
  shipModel2.rotation.y -= 0.0085;
  shipModel2.position.x = 10*Math.cos(t) + 0;
  shipModel2.position.z = 10*Math.sin(t) + 0;


  renderer.render( scene, camera );
};

animate();