import logo from './logo.svg';
import './App.css';
import QuoteBuilder from './QuoteBuilder.js';


function getDefaultVal(name, defaultval) {
  let val = (new URLSearchParams(window.location.search)).get(name); //NB. is case sensitive!
  if (!val || val === "")
    val = defaultval;
  return val;
}

function App() {
    
  const credentials = "UserName="+getDefaultVal("UserName", "Guest")+"&Password="+getDefaultVal("Password", "Dev2021")+"&CompanyName="+getDefaultVal("CompanyName", "SA Example Company [Demo]");
  
  let refno = getDefaultVal("RefNo", "Q00008"); //NB. is case sensitive!
  
  
  return (
    <div className="App">
      <header className="App-header">
        
        <img src={logo} className="App-logo" alt="logo" />
        <div>
        <h1>Configurator</h1>
        <sup>Quote Builder</sup>
        </div>
      </header>
	  <QuoteBuilder reference={refno} credentials={credentials}/>
    
    </div>
  );
}

export default App;
