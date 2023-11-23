import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store";
import Profile from "./pages/Profile";
import Home from "./pages/Home";
import About from "./pages/About";
import { AuthProvider } from "./components/AuthProvider";
import AuthPage from "./pages/AuthPage";

//<Route path="/braces" element={<Braces/>}/>
export default function App() {

  return (
    <AuthProvider>
      <Provider store={store}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/login" element={<AuthPage />} />
            <Route path="*" element={<AuthPage />} />
            
          </Routes>
        </BrowserRouter>
      </Provider>
    </AuthProvider>
  )
}
