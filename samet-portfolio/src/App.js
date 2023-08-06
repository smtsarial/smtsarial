import { useState, useRef, useEffect } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Points, PointMaterial } from '@react-three/drei'
import * as random from 'maath/random/dist/maath-random.esm'

export default function App() {
  return (
    <Canvas camera={{ position: [0, 0, 1] }}>
      <Stars />
    </Canvas>
  )
}

function Stars(props) {
  const ref = useRef()
  const [size,setSize] = useState([0.005])
  const [sphere] = useState(() => random.inSphere(new Float32Array(25000), { radius: 1.6 }))
  useFrame((state, delta) => {
    ref.current.rotation.x -= delta / 10
    ref.current.rotation.y -= delta / 15
  })
  
  useEffect(() => {
    const interval = setInterval(() => {
      var random = Math.random() * (0.05 - 0.001) + 0.001;
      setSize(random)
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <group rotation={[0, 0, Math.PI / 1]}>
      <Points ref={ref} positions={sphere} stride={3} frustumCulled={false} {...props}>
        <PointMaterial transparent color="#1bb367" size={size} sizeAttenuation={true} depthWrite={false} />
      </Points>
    </group>
  )
}
