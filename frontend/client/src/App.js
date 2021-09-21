import './App.css';
import Map from "./pages/map"
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";
import Table from "./pages/table";
import { AppContext, createStore } from "./store/main.store";
import Apart from "./pages/apart";
import Favourites from "./pages/favourites";
import Parsing from "./pages/parsing";
import SearchForm from "./pages/form";

function App() {
    const stores = createStore()
    return (
        <div className="App">
            <AppContext.Provider value={stores}>
                <Router>
                    <header>
                        <img src="/img/logo.png" alt=""/>
                        <ul>
                            <li><Link to="/">Главная</Link></li>
                            <li><Link to="/map">Карта</Link></li>
                            <li><Link to="/favourites">Избранное</Link></li>
                            <li><Link to="/parse">Парсинг</Link></li>
                            <li><Link to="/form">Форма поиска</Link></li>
                        </ul>
                    </header>
                    <div className="content App-header">
                        <Switch>
                            <Route exact path="/map"><Map/></Route>
                        </Switch>
                        <Switch>
                            <Route exact path="/"><Table/></Route>
                        </Switch>
                        <Switch>
                            <Route exact path="/favourites"><Favourites/></Route>
                        </Switch>
                        <Switch>
                            <Route exact path="/parse"><Parsing/></Route>
                        </Switch>
                        <Switch>
                            <Route exact path="/aparts/:id" children={<Apart/>}/>
                        </Switch>
                        <Switch>
                            <Route exact path="/form" children={<SearchForm/>}/>
                        </Switch>
                    </div>
                </Router>
            </AppContext.Provider>
        </div>
    );
}

export default App;
