import VideoPlayer from './components/video';
import Sidebar from './components/options';
import Notifications from './components/notifications';
import './App.css';

function App() {
  return (
    <div>
    <VideoPlayer />
    <Sidebar>
      <Notifications />
    </Sidebar>
  </div>
  );
}

export default App;
