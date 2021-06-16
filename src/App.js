import logo from './logo.svg';
import './App.css';
import QuoteBuilder from './QuoteBuilder.js';

function App() {
  const credentials = "UserName=Guest&Password=Dev2021&CompanyName=SA Example Company [Demo]";
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <h1>
          Configurator
        </h1>
      </header>
	  <QuoteBuilder reference="Q00008" credentials={credentials}/>
    </div>
  );
}

export default App;
