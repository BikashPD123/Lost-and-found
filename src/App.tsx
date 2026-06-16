
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AdminLayout } from './components/AdminLayout';
import { Dashboard } from './pages/Dashboard';
import { ReportItem } from './pages/ReportItem';
import { ItemsList } from './pages/ItemsList';
import { Settings } from './pages/Settings';
import { Landing } from './pages/Landing';
import { Splash } from './pages/Splash';
import { Profile } from './pages/Profile';
import { ItemsProvider } from './context/ItemsContext';
import { AuthProvider } from './context/AuthContext';
import { ThemeProvider } from './context/ThemeContext';
import { Login } from './pages/Login';

function App() {
  return (
    <ThemeProvider>
    <AuthProvider>
      <ItemsProvider>
        <Router>
          <Routes>
            <Route path="/" element={<Splash />} />
            <Route path="/home" element={<Landing />} />
            <Route path="/login" element={<Login />} />
            <Route path="/app" element={<AdminLayout />}>
              <Route index element={<Dashboard />} />
              <Route path="report-lost" element={<ReportItem type="Lost" />} />
              <Route path="report-found" element={<ReportItem type="Found" />} />
              <Route path="items" element={<ItemsList />} />
              <Route path="profile" element={<Profile />} />
              <Route path="settings" element={<Settings />} />
            </Route>
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Router>
      </ItemsProvider>
    </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
