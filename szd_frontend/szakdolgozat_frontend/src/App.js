import MainPage from "./pages/MainPage";
import { useState } from "react";
import { DataContext } from "./context/DataContext";
import { Routes, Route } from "react-router-dom";
import VasarloLayout from "./layouts/VasarloLayout";
import Kategoriak from "./pages/Kategoriak";
import Felhasznalo from "./pages/Felhasznalo";
import Kosar from "./pages/Kosar";
import Bejelentkezes from "./pages/Bejelentkezes";
import Regisztracio from "./pages/Regisztracio";
import VendegLayout from "./layouts/VendegLayout";
import useAuthContext from "./context/AuthContext";
import Modell from "./pages/Modell";
import Kategoria from "./pages/Kategoria";
import Admin from "./pages/Admin";
import Kereses from "./pages/Kereses";


/* const test = { "link": ["https://backend.orbitvu.com/sites/default/files/image/cover-FURNITURE-studio%20%281%29_0.jpg",
                "https://www.archiproducts.com/images/sharingimage/1390.jpg", 
               "https://i0.wp.com/d2s30hray1l0uq.cloudfront.net/frontend/Prepare-your-furniture.jpg?fit=1024%2C512&ssl=1",
               "https://i.ytimg.com/vi/_BfUgCN7TYk/maxresdefault.jpg"]}; */
               
function App() {

  /* const { user} = useAuthContext(); */
  const user = {name: "user",
  email: "user@email.com",
  hozzaferes: 1}; //0-vasarlo 1-admin
  return (

      <Routes>
      { user ? (
        <Route path="/" element={<VasarloLayout user = {user}/>}>
        <Route path={"termek/:termek" } element={<Modell />} />
        <Route path={"search/:kereses" } element={<Kereses/>}/>
        <Route path={"kategoriak/:kateg"} element={<Kategoria/>} />
        <Route index element={<MainPage/>}/>
        <Route path="kategoriak" element={<Kategoriak />} />
        <Route path="felhasznalo" element={<Felhasznalo />} />
        {user.hozzaferes ? (<Route path="admin" element={<Admin />} />) : (<Route path="kosar" element={<Kosar />} />)}
        
      </Route>
      ) : (
        <Route path="/" element={<VendegLayout/>}>
        <Route path={"termek/:termek" } element={<Modell />} />
        <Route path={"search/:kereses" } element={<Kereses/>}/>
        <Route path={"kategoriak/:kateg"} element={<Kategoria/>} />
        <Route index element={<MainPage/>}/>
        <Route path="kategoriak" element={<Kategoriak />} />
        <Route path="felhasznalo" element={<Felhasznalo />} />
        <Route path="bejelentkezes" element={<Bejelentkezes/>} />
        <Route path="regisztracio" element={<Regisztracio/>} />
        <Route path="modell" element={<Modell/>} />
        
      </Route>
      )}
    </Routes>

  );
}

export default App;
