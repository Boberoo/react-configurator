//import React from 'react';
//import ReactDOM from 'react-dom';
import RecipeDetail from './RecipeDetail.js';
import OmniReactComponent from './Omni.js';




class QuoteBuilder extends OmniReactComponent {
  constructor(props) {
    super(props);
	this.state = {...this.state, 
      quote: null
    };
	
  }
  
 static getDerivedStateFromProps(props, state) {
    return {reference: props.reference };
  } 
  
  loadQuote() {
    const url = this.state.baseUrl+"/Quote/"+this.props.reference+"?"+this.state.credentials;
    
    //console.log(url);
	  
	  fetch(url)
      .then((res) => {
		  if (!res.ok) { 
		    return res.text().then(text => {throw text});
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
			    //console.log(error);
          this.setState({
            isLoaded: true,
            error
          });
        }
      )  
    //this.setState({quote: {acc_no: "1234", build_type: "Trailer", height: 4, width: 3, length: 9.5}});
	
  }
  
  saveQuote(quote) {
    const requestOptions = {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: '{ "quote" :  '+JSON.stringify(quote)+'  }'
    };
    fetch(this.state.baseUrl+"/Quote/"+this.props.reference+"?"+this.state.credentials, requestOptions)
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
    document.getElementById("status").innerHTML =
    //"Before the update, the favorite was " + prevState.favoritecolor;
	"Updating..";
	return null; //??
  }
  componentDidUpdate() {
    document.getElementById("status").innerHTML = "";
    //"The updated favorite is " + this.state.favoritecolor;
	//"Ready";
  }
  
  handleQuoteMasterChange = (event) => {
    let nam = event.target.name;
    let val = event.target.value;
	const quote = { ...this.state.quote, [nam]: val }
    this.setState(() => ({ quote }))
    //this.setState({...this.state.quote, [nam]: val});
	
  }
  
  DoPriceChanged = (index, newVal) => {
    //console.log("ssssssssssssasasas")
    const { error, isLoaded, quote } = this.state;
    //console.log(isLoaded);
    if (isLoaded && quote) {
      //quote.quote_lines[index].selling_price = newVal;
      //console.log(quote);
      //this.setState(() => ({ quote }));
      this.state.quote.quote_lines[index].selling_price = newVal;
    }
  }
  
   submitQuote = (event) => {
    event.preventDefault();
    //###do some basic validation?
    //alert("You are submitting " + this.state.reference);
    this.saveQuote(this.state.quote);
    //alert(this.state.statusmessage);
  }
  
  renderQuoteDetails = (quote) => {
	  return (<ul>{quote.quote_lines.map((line, index) =>
	  <li key={line.line_no}>{line.quantity}x {line.stock_code} {line.description} <RecipeDetail {...quote} {...line} lineindex={index} OnPriceChanged={this.DoPriceChanged} credentials={this.props.credentials}/></li>)}</ul>); 
	  
	  //NB. the ... makes it pass the object properties individually
  }
  
  renderQuoteMaster = () => {
	//let quote = this.state.quote;  
	const { error, isLoaded, quote } = this.state;
    if (error) return <h2>Error: {error}</h2>;
    if (!isLoaded) return <div>Loading...</div>;
	if (!quote) return (<h2>Loading..</h2>);  
		
    return (<div><span className="form-group"><label>
          Select the build type:
          <select name="build_type" value={quote.build_type} onChange={this.handleQuoteMasterChange}>
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
		value={quote.length}
        onChange={this.handleQuoteMasterChange}
      /></label></span>
      <span className="form-group"><label> Width:
      <input
        type='number'
        name='width'
		value={quote.width}
        onChange={this.handleQuoteMasterChange}
      /></label></span>
	  <span className="form-group"><label> Height:
      <input
        type='number'
        name='height'
		value={quote.height}
        onChange={this.handleQuoteMasterChange}
      /></label></span>
	  <p>Volume: {this.getVolume()+" cubic metres"}</p>
	  
	  {this.renderQuoteDetails(quote)}
	  <p className="grand-total">Total: {this.getTotalExcl().toLocaleString(undefined, {maximumFractionDigits:2})}</p>
    <p id="statusmessage">{this.state.statusmessage}</p>
	  </div>);
  }
  
  
  render() {
    //const carname = "Ford";
    //console.log(this.props);
    return (
      <form onSubmit={this.submitQuote}>
      <h1>Enter the type and dimensions</h1>
      
    <p id="status">{this.state.status}</p>
	  {this.renderQuoteMaster()}
	  <button type="submit" action="save">Save Quote</button> <button type="submit" action="saveas">Save As New Quote</button> <button type="submit" action="saveasrev">Save As Revised Quote</button>
      </form>
    );
  }
}

export default QuoteBuilder;