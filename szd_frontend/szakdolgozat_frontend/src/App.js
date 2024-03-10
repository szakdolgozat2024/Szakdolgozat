import MainPage from "./pages/MainPage";
import { Context } from "./context/Context";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import VasarloLayout from "./layouts/VasarloLayout";
import Kategoriak from "./pages/Kategoriak";
import Felhasznalo from "./pages/Felhasznalo";
import Kosar from "./pages/Kosar";
import Bejelentkezes from "./pages/Bejelentkezes";
import Regisztracio from "./pages/Regisztracio";
import VendegLayout from "./layouts/VendegLayout";
import useAuthContext from "./context/AuthContext";


const test = { "link": ["https://backend.orbitvu.com/sites/default/files/image/cover-FURNITURE-studio%20%281%29_0.jpg",
                "https://www.archiproducts.com/images/sharingimage/1390.jpg", 
               "https://i0.wp.com/d2s30hray1l0uq.cloudfront.net/frontend/Prepare-your-furniture.jpg?fit=1024%2C512&ssl=1",
               "https://i.ytimg.com/vi/_BfUgCN7TYk/maxresdefault.jpg"]};
function App() {

  const { user} = useAuthContext();

  return (
    <Context.Provider value={test}>
      <Routes>
      { user ? (
        <Route path="/" element={<VasarloLayout/>}>
        <Route index element={<MainPage/>}/>
        <Route path="kategoriak" element={<Kategoriak />} />
        <Route path="felhasznalo" element={<Felhasznalo />} />
        <Route path="kosar" element={<Kosar />} />
      </Route>
      ) : (
        <Route path="/" element={<VendegLayout/>}>
        <Route index element={<MainPage/>}/>
        <Route path="kategoriak" element={<Kategoriak />} />
        <Route path="felhasznalo" element={<Felhasznalo />} />
        <Route path="bejelentkezes" element={<Bejelentkezes/>} />
        <Route path="regisztracio" element={<Regisztracio/>} />
      </Route>
      )}
    </Routes>
    </Context.Provider>
  );
}

export default App;
