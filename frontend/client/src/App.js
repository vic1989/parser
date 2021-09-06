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

function App() {
    const stores = createStore()
    return (
        <div className="App">
            <AppContext.Provider value={stores}>
                <Router>
                    <header>
                        <ul>
                            <li><Link to="/">Главная</Link></li>
                            <li><Link to="/map">Карта</Link></li>
                        </ul>
                    </header>
                    <div className="content App-header">
                        <Switch>
                            <Route exact path="/map"><Map/></Route>
                        </Switch>
                        <Switch>
                            <Route exact path="/"><Table/></Route>
                        </Switch><Switch>
                            <Route exact path="/aparts/:id" children={<Apart/>}/>
                        </Switch>
                    </div>
                </Router>
            </AppContext.Provider>
        </div>
    );
}

export default App;
