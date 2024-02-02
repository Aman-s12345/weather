
import Navbar from "./components/Navbar";
import Home from "./pages/Home"


const App = () => {
  return (
        <div className="flex flex-col bg-gradient-to-r from-blue-900 to-blue-500 w-screen h-screen">
        <Navbar/>
        <Home/>
          
  </div>)
};

export default App;
