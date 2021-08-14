import * as THREE from "three";
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
