import * as THREE from "three";
import { sample } from "lodash"

export function GenerateTorus(radius, tube, radialSegments, tubularSegments, pos, rot, color) {
    const tgeometry = new THREE.TorusGeometry(radius, tube, radialSegments, tubularSegments);

    const tmaterial = new THREE.MeshStandardMaterial({
        color: color,
    });
    const torus = new THREE.Mesh(tgeometry, tmaterial);
    if (pos) {
        torus.position.set(pos.x, pos.y, pos.z)
    }
    if (rot) {
        torus.rotation.set(rot.x, rot.y, rot.z)
    }
    return torus
}

export function addStar() {
    let size = Math.random();
    const geometry = new THREE.BoxGeometry(size, size, size);
    const material = new THREE.MeshStandardMaterial({
        color: 0x51e5ff,
        wireframe: true,
    });
    const star = new THREE.Mesh(geometry, material);

    const [x, y, z, r] = Array(4)
        .fill()
        .map(() => THREE.MathUtils.randFloatSpread(150));

    star.position.set(x, y, z);
    star.rotation.set(r, r, r);
    scene.add(star);
}

export function addCart(starOptions, scene) {
    let curStar = sample(starOptions).clone()
    const [x, y, z, r] = Array(4)
        .fill()
        .map(() => THREE.MathUtils.randFloatSpread(150));

    curStar.scale.x = 1
    curStar.scale.y = 0.5
    curStar.scale.z = 1
    curStar.position.set(x, y, z);
    curStar.rotation.set(r, r, r);

    scene.add(curStar);
}