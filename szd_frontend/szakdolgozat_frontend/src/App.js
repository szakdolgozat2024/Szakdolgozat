import MainPage from "./components/MainPage";
import { Context } from "./context/Context";


const test = { "link": ["https://backend.orbitvu.com/sites/default/files/image/cover-FURNITURE-studio%20%281%29_0.jpg",
                "https://www.archiproducts.com/images/sharingimage/1390.jpg", 
               "https://i0.wp.com/d2s30hray1l0uq.cloudfront.net/frontend/Prepare-your-furniture.jpg?fit=1024%2C512&ssl=1",
               "https://i.ytimg.com/vi/_BfUgCN7TYk/maxresdefault.jpg"]};
function App() {

  return (
    <div className="App">
      <header className="App-header">
        <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css" rel="stylesheet"
          integrity="sha384-T3c6CoIi6uLrA9TneNEoa7RxnatzjcDSCmG1MXxSR1GAsXEV/Dwwykc2MPK8M2HN" crossorigin="anonymous"></link>
      </header>
      <Context.Provider value={test}>
        <MainPage></MainPage>
      </Context.Provider>
    </div>
  );
}

export default App;
