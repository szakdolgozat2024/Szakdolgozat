import MainPage from "./pages/MainPage";
import { Context } from "./context/Context";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./Layout";
import Kategoriak from "./pages/Kategoriak";
import Felhasznalo from "./pages/Felhasznalo";
import Kosar from "./pages/Kosar";


const test = { "link": ["https://backend.orbitvu.com/sites/default/files/image/cover-FURNITURE-studio%20%281%29_0.jpg",
                "https://www.archiproducts.com/images/sharingimage/1390.jpg", 
               "https://i0.wp.com/d2s30hray1l0uq.cloudfront.net/frontend/Prepare-your-furniture.jpg?fit=1024%2C512&ssl=1",
               "https://i.ytimg.com/vi/_BfUgCN7TYk/maxresdefault.jpg"]};
function App() {

  return (
    <Context.Provider value={test}>
      <BrowserRouter>
      <Routes>
      <Route path="/" element={<Layout/>}>
        <Route index element={<MainPage/>}/>
        <Route path="kategoriak" element={<Kategoriak />} />
        <Route path="felhasznalo" element={<Felhasznalo />} />
        <Route path="kosar" element={<Kosar />} />
      </Route>
    </Routes>
      </BrowserRouter>
    </Context.Provider>
  );
}

export default App;
