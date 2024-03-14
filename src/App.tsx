import { ErrorBoundary } from 'react-error-boundary';
import GenericError from './ui/components/GenericError';
import MainLayout from './ui/components/MainLayout';
import './ui/styles/globals.css';

const App: React.FC = () => {
  return (
    <div className="container mx-auto">
      <ErrorBoundary fallback={<GenericError />}>
        <MainLayout />
      </ErrorBoundary>
    </div>
  );
};

export default App;
