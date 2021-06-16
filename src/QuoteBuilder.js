import React from 'react';
import ReactDOM from 'react-dom';
import RecipeDetail from './RecipeDetail.js';




class QuoteBuilder extends React.Component {
  constructor(props) {
    super(props);
	this.state = {
      quote: null,
      isLoaded: false
    };
	
  }
  
 static getDerivedStateFromProps(props, state) {
    return {reference: props.reference };
  } 
  
  loadQuote() {
	  
	fetch("http://st.omniaccounts.co.za:55683/Quote/"+this.props.reference+"?"+this.props.credentials)
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
          this.setState({
            isLoaded: true,
            quote: result.quote
          });
        },
        // Note: it's important to handle errors here
        // instead of a catch() block so that we don't swallow
        // exceptions from actual bugs in components.
        (error) => {
			
          this.setState({
            isLoaded: true,
            error
          });
        }
      )  
    //this.setState({quote: {acc_no: "1234", build_type: "Trailer", height: 4, width: 3, length: 9.5}});
	
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
  
  getTotalExcl = () => {
	 let quote = this.state.quote;
     if (!quote) return 0;	 
	 return quote.quote_lines.reduce((a, b) => a+b.ext_price, 0); 
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
  
   submitQuote = (event) => {
    event.preventDefault();
    alert("You are submitting " + this.state.reference);
  }
  
  renderQuoteDetails = (quote) => {
	  return (<ul>{quote.quote_lines.map((line) =>
	  <li>{line.quantity}x {line.stock_code} {line.description} <RecipeDetail {...line} credentials={this.props.credentials}/></li>)}</ul>); 
	  
	  //NB. the ... makes it pass the object properties individually
  }
  
  renderQuoteMaster = () => {
	//let quote = this.state.quote;  
	const { error, isLoaded, quote } = this.state;
    if (error) return <h2>Error: {error}</h2>;
    if (!isLoaded) return <div>Loading...</div>;
	if (!quote) return (<h2>Loading..</h2>);  
		
    return (<div><label>
          Select the build type:
          <select name="build_type" value={quote.build_type} onChange={this.handleQuoteMasterChange}>
            <option value="Semi-Rigid">Semi-Rigid</option>
            <option value="Trailer">Trailer</option>
            <option value="Repair">Repair</option>
            <option value="Parts">Parts</option>
          </select>
        </label>
		<label>Length:
      <input
        type='number'
        name='length'
		value={quote.length}
        onChange={this.handleQuoteMasterChange}
      /></label>
      <label>Width:
      <input
        type='number'
        name='width'
		value={quote.width}
        onChange={this.handleQuoteMasterChange}
      /></label>
	  <label>Height:
      <input
        type='number'
        name='height'
		value={quote.height}
        onChange={this.handleQuoteMasterChange}
      /></label>
	  <p>Volume: {this.getVolume()+" cubic metres"}</p>
	  
	  {this.renderQuoteDetails(quote)}
	  <p>Total: {this.getTotalExcl()}</p>
	  </div>);
  }
  
  
  render() {
    const carname = "Ford";
    return (
      <form onSubmit={this.submitQuote}>
      <h1>Enter the type and dimensions</h1>
      <p id="status"></p>
	  {this.renderQuoteMaster()}
	  
      </form>
    );
  }
}

export default QuoteBuilder;