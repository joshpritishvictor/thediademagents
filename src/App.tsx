import { domMax, LazyMotion, MotionConfig } from 'motion/react'
import { Route, Routes } from 'react-router-dom'
import Layout from './components/Layout'
import { routes } from './routes'

export default function App() {
  return (
    // Features load with the app (not lazily): elements that reveal on scroll need their
    // hidden start state applied at first render, including in the pre-rendered HTML,
    // or they are already visible by the time they come into view and never transition.
    // strict: errors if a full `motion.*` component sneaks in and bloats the bundle.
    <LazyMotion features={domMax} strict>
      {/* Honour the OS "reduce motion" setting for every animation */}
      <MotionConfig reducedMotion="user">
        <Routes>
          <Route element={<Layout />}>
            {routes.map(({ path, Component }) => (
              <Route key={path} path={path} element={<Component />} />
            ))}
          </Route>
        </Routes>
      </MotionConfig>
    </LazyMotion>
  )
}
