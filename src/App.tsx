import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ErrorBoundary } from '@/components/ErrorBoundary';
import { Layout } from '@/components/layout/Layout';
import Home from '@/pages/Home';
import Schedule from '@/pages/Schedule';
import Notices from '@/pages/Notices';
import Profile from '@/pages/Profile';

function ErrorFallback() {
  return (
    <ErrorBoundary>
      <Home />
    </ErrorBoundary>
  );
}

export default function App() {
  return (
    <ErrorBoundary>
      <Router>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Navigate to="/home" replace />} />
            <Route path="home" element={<Home />} />
            <Route path="schedule" element={<Schedule />} />
            <Route path="notices" element={<Notices />} />
            <Route path="profile" element={<Profile />} />
            <Route path="*" element={<Navigate to="/home" replace />} />
          </Route>
        </Routes>
      </Router>
    </ErrorBoundary>
  );
}

export { ErrorFallback };
