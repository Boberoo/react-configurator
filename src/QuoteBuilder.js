import RecipeDetail from './RecipeDetail.js';
import Login from './Login.js';
import OmniReactComponent from './Omni.js';


class QuoteBuilder extends OmniReactComponent {
  
  constructor(props) {
    super(props);
    this.refreshTimeout = null;
    this.state = {...this.state, 
      quote: null, action: "save", total: 0.0
    };
  }
  
  static getDerivedStateFromProps(props, state) {
    return {reference: props.reference };
  } 
  
  loadQuote() {
    const url = this.state.baseUrl+"/Quote/"+encodeURIComponent(this.props.reference)+"?CompanyName="+encodeURIComponent(this.state.companyName);
    
    //console.log(url);
    
    const auth = 'Basic ' + Buffer.from(this.state.userName + ':' + this.state.password).toString('base64');
	  
	  fetch(url, 
          { method: 'GET',
            mode: 'cors',
            redirect: 'follow',
            credentials: 'include', //without this, authorizaion header won't get passed through to cross origin call
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
              'Authorization': auth
            }
          })
      .then((res) => {
        if (!res.ok) {         
          return res.text().then(text => {console.log(text); throw text;});
        } 
        else {
          return res.json();
        }
      })
      .then(
        (result) => {
          //console.log(result);
          this.setState({
            isLoaded: true,
            quote: result.quote
          });
        },
        // Note: it's important to handle errors here
        // instead of a catch() block so that we don't swallow
        // exceptions from actual bugs in components.
        (error) => {
          console.log(JSON.stringify(error));
          this.setState({
            isLoaded: true,
            error
          });
        }
      )  
  }
  
  saveQuote = (quote, action) => {
    
    const auth = 'Basic ' + Buffer.from(this.state.userName + ':' + this.state.password).toString('base64');    
    let restMethod = 'POST';
    
    let url = this.state.baseUrl+"/Quote/";
    if (action === "saveasrev") {
      url += encodeURIComponent(this.props.reference+"-1");
    }
    else if (action === "saveas") {
      //new quote, don't specify a reference  
      //clear quote.source_type..?
    }
    else { //(action == "save")
      url += this.props.reference;
      restMethod = 'PUT';
    }
    
    url += "?CompanyName="+encodeURIComponent(this.state.companyName);
    
    const requestOptions = {
        method: restMethod,
        mode: 'cors',
        redirect: 'follow',
        credentials: 'include', //without this, authorizaion header won't get passed through to cross origin call
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': auth
        },
        body: '{ "quote" : '+JSON.stringify(quote)+' }'
    };
    
    fetch(url, requestOptions)
      .then((res) => {
        if (!res.ok) { 
          return res.text().then(text => {throw text});
        } 
        else {
          return res.text();
        }
      })
      .then(data => this.setState({ statusmessage: data }),
        // Note: it's important to handle errors here
        // instead of a catch() block so that we don't swallow
        // exceptions from actual bugs in components.
        (error) => {			
          this.setState({
            //isLoaded: true,
            statusmessage: "Error: "+error
          });
        });
  }
  
  componentDidMount() {
    setTimeout(() => {      
    this.loadQuote()
    }, 100)
  }
  
  shouldComponentUpdate() {
    return true;
  }
  
  getVolume = () => {
   let quote = this.state.quote;
   if (!quote) return 0;	 
   return quote.width * quote.length * quote.height;
  }
  
  getExtPrice = (line) => {
   if (line.selling_price_per) 
     return line.quantity * line.selling_price / line.selling_price_per
   else
     return line.quantity * line.selling_price;
  }
  
  getTotalExcl = () => {
   let quote = this.state.quote;
   if (!quote) return 0;	 
   return quote.quote_lines.reduce((a, b) => a+this.getExtPrice(b), 0); 
  }
  
  getSnapshotBeforeUpdate(prevProps, prevState) {
    document.getElementById("status").innerHTML = "Updating..";
    //"Before the update, the favorite was " + prevState.favoritecolor; just an example of how this can be used if need be
    return null; //??need to return anything?
  }
  componentDidUpdate() {
    document.getElementById("status").innerHTML = "";
    //"The updated favorite is " + this.state.favoritecolor; just an example of how this can be used if need be 
  }
  
  handleQuoteMasterChange = (event) => {
    let nam = event.target.name;
    let val = event.target.value;
    const quote = { ...this.state.quote, [nam]: val }
    this.setState(() => ({ quote }))	
  }
  
  handleInput = e => {
    this.setState({[e.target.name]: e.target.value});     
  }
  
  doPriceChanged = (index, newVal) => {
    const { error, isLoaded, quote } = this.state;
    if (isLoaded && quote) {
      if (this.refreshTimeout)
         clearTimeout(this.refreshTimeout);
      //quote.quote_lines[index].selling_price = newVal;
      //console.log(quote);
      //this.setState(() => ({ quote }));
      this.state.quote.quote_lines[index].selling_price = newVal;
      this.refreshTimeout = setTimeout(() =>{ this.setState({ total:  this.getTotalExcl() }); }, 50);     
    }
  }
     
  submitQuote = (event) => {
    event.preventDefault();
    //###do some basic validation?
    //alert("You are submitting " + this.state.reference);
    //alert(event.target.action);
    //alert(this.state.action);
    this.saveQuote(this.state.quote, this.state.action);
    //alert(this.state.statusmessage);    
  }
  
  renderQuoteDetails = (quote) => {
    return (<ul>{quote.quote_lines.map((line, index) =>
    <li key={line.line_no}>{line.quantity}x {line.stock_code} {line.description} <RecipeDetail {...quote} {...line} lineindex={index} OnPriceChanged={this.doPriceChanged} credentials={this.props.credentials}/></li>)}</ul>); 	  
    //NB. the ... makes it pass the object properties individually
  }
  
  renderQuoteMaster = () => {
    const { error, isLoaded, quote } = this.state;
    if (error) return <h2>Error: {error}</h2>;
    if (!isLoaded) return <div>Loading...</div>;
    if (!quote) return (<h2>Loading..</h2>);  
  
    //NB. uses label inside span to	keep the label and input together no matter what the screen width, but uses optimal space all the time
    return (<div>
            <span className="form-group"><label>Select the build type:
              <select name="build_type" className="form-control" value={quote.build_type} onChange={this.handleQuoteMasterChange}>
                <option value="Semi-Rigid">Semi-Rigid</option>
                <option value="Trailer">Trailer</option>
                <option value="Repair">Repair</option>
                <option value="Parts">Parts</option>
              </select>
            </label></span>
            <span className="form-group"><label> Length:
              <input
                type='number'
                name='length'
                className="form-control"
                value={quote.length}
                onChange={this.handleQuoteMasterChange}
              /></label></span>
              <span className="form-group"><label> Width:
              <input
                type='number'
                name='width'
                className="form-control"
                value={quote.width}
                onChange={this.handleQuoteMasterChange}
              /></label></span>
            <span className="form-group"><label> Height:
              <input
                type='number'
                name='height'
                className="form-control"
                value={quote.height}
                onChange={this.handleQuoteMasterChange}
              /></label></span>
            <p>Volume: {this.formatQty(this.getVolume())+" cubic metres"}</p>
            {this.renderQuoteDetails(quote)}
            <p className="grand-total">Total: {this.formatPrice(this.getTotalExcl())}</p>
            <p id="statusmessage">{this.state.statusmessage}</p>
            </div>);
  }
  
  
  render() {
    if (!this.getUserName()) {
      return (<Login onLogon={this.DoLogonChanged}/>);
    }
    
    return (
      <form onSubmit={this.submitQuote}>
        <h1>Enter the type and dimensions</h1>      
        <p id="status">{this.state.status}</p>
        {this.renderQuoteMaster()}
        <button type="submit" name="action" value="save" onClick={this.handleInput}>Save Quote</button> <button type="submit" name="action" value="saveas" onClick={this.handleInput}>Save As New Quote</button> <button type="submit" name="action" value="saveasrev" onClick={this.handleInput}>Save As Revised Quote</button>
      </form>
    );
  }
}

export default QuoteBuilder;