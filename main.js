import "./style.css";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";

// Camera and Render
const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);

const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector("#bg"),
});

renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
camera.position.setZ(30);
camera.position.setX(-3);

// Torus
const tgeometry = new THREE.TorusGeometry(10, 0.11, 3, 100);

const tmaterial = new THREE.MeshStandardMaterial({
  color: 0xff6347,
});

const torus = new THREE.Mesh(tgeometry, tmaterial);

const t2geometry = new THREE.TorusGeometry(10, 0.11, 3, 100);

const t2material = new THREE.MeshStandardMaterial({
  color: 0xff7777,
});

const torus2 = new THREE.Mesh(t2geometry, t2material);
scene.add(torus, torus2);

// point light
const pointLight = new THREE.PointLight(0xffffff);

pointLight.position.set(5, 5, 5);

// ambient light
const ambientLight = new THREE.AmbientLight(0xaaaaaa);

scene.add(pointLight, ambientLight);

// point light helper
// const sphereSize = 1;
// const lightHelper = new THREE.PointLightHelper(pointLight, sphereSize);
// const gridHelper = new THREE.GridHelper(200, 50);
// scene.add(lightHelper, gridHelper);

// const controls = new OrbitControls(camera, renderer.domElement);
// Loader
const loader = new GLTFLoader();

loader.load(
  "models/office.glb",
  function (gltf) {
    gltf.scene.position.z = -1;
    gltf.scene.position.y = -1;
    gltf.scene.position.x = -0.5;
    gltf.scene.rotation.y = -1;
    gltf.scene.rotation.x = 0.15;
    scene.add(gltf.scene);
  },
  undefined,
  function (error) {
    console.error(error);
  }
);
var monitor;
loader.load(
  "models/monitor.glb",
  function (glmonitor) {
    monitor = glmonitor;
    monitor.scene.position.x = 0.8;
    monitor.scene.position.z = 10.9;
    monitor.scene.position.y = 0.1;
    scene.add(monitor.scene);
  },
  undefined,
  function (error) {
    console.error(error);
  }
);
// Background
const spaceTexture = new THREE.TextureLoader().load("space.jpg");
scene.background = spaceTexture;

// Avatar
const meTexture = new THREE.TextureLoader().load("me.png");
const me = new THREE.Mesh(
  new THREE.BoxGeometry(3, 3, 3),
  new THREE.MeshBasicMaterial({ map: meTexture })
);
// scene.add(me);

// Moon
const moonTexture = new THREE.TextureLoader().load("moon.jpg");
const moonNormal = new THREE.TextureLoader().load("normal.jpg");

const moon = new THREE.Mesh(
  new THREE.SphereGeometry(3, 32, 32),
  new THREE.MeshStandardMaterial({ map: moonTexture, normalMap: moonNormal })
);
moon.position.z = 30;
moon.position.x = -10;

scene.add(moon);

// Stars
function addStar() {
  const geometry = new THREE.SphereGeometry(0.25, 24, 24);
  const material = new THREE.MeshStandardMaterial({ color: 0xffffff });
  const star = new THREE.Mesh(geometry, material);

  const [x, y, z] = Array(3)
    .fill()
    .map(() => THREE.MathUtils.randFloatSpread(150));

  star.position.set(x, y, z);
  scene.add(star);
}

Array(300).fill().forEach(addStar);

function moveCamera() {
  const t = document.body.getBoundingClientRect().top;

  moon.rotation.x += 0.05;
  moon.rotation.y += 0.075;
  moon.rotation.z += 0.05;

  me.rotation.x -= 0.01;
  me.rotation.y -= 0.01;

  camera.position.z = t * -0.01;
  camera.position.x = t * -0.0002;
  camera.position.y = t * -0.0002;
}
document.body.onscroll = moveCamera;
moveCamera();

//Update loop
function animate() {
  requestAnimationFrame(animate);
  // this rotation can probably be some kind of function
  torus.rotation.x += 0.014;
  torus.rotation.y += 0.01;
  torus.rotation.z += 0.011;
  torus2.rotation.x -= 0.01;
  torus2.rotation.y -= 0.013;
  torus2.rotation.z -= 0.017;
  monitor.scene.rotation.y -= 0.01;
  renderer.render(scene, camera);
}

animate();
