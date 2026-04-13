import { Suspense, lazy } from 'react'
import LoadingSpinner from './components/LoadingSpinner'

const LazyComponent = lazy(() =>  import('./components/LazyComponent'));

function App() {
  return (
    <Suspense fallback={<LoadingSpinner />}>
      <LazyComponent />
    </Suspense>
  )
}

export default App
