//import React from 'react';
//import ReactDOM from 'react-dom';
import OmniReactComponent from './Omni.js';


function ROUNDUP(num, precision) {
  
  
  if (!precision) //make an optional param
    precision = 0;
    
  //console.log(precision);
  //console.log(10**precision);
  
  return Math.round((num+(0.499/10**precision)) * 10**precision) / 10**precision;
}

class RecipeDetail extends OmniReactComponent {
  constructor(props) {
    super(props);
    this.state = {...this.state, 
      recipe: null,
	    expanded: false
    };
    
  }
  
 static getDerivedStateFromProps(props, state) {
    return {stockCode: props.stock_code };
  } 
  
  loadRecipe() {
	  //console.log(this.props.stock_code);
	  ///#######this report is a stock list, need a report or a proper endpoint, will use as POC for now though
	//fetch("http://st.omniaccounts.co.za:55683/Report/Recipe Export?Stock Code="+this.props.stock_code+"&"+this.props.credentials)
  //fetch("http://st.omniaccounts.co.za:55683/Stock Recipe/"+this.props.stock_code+"?"+this.props.credentials)
  fetch(this.state.baseUrl+"/Stock Recipe/"+this.props.stock_code+"?"+this.state.credentials)
      .then((res) => {
		  if (!res.ok) { 
		    return res.text().then(text => {throw text});
		  } 
		  else {
		    //res.text().then(text => {console.log(text)});
		    return res.json();
		  }
		  })
      .then(
        (result) => {
			
		      console.log(JSON.stringify(result));
		  
          this.setState({
            isLoaded: true,
            recipe: result.stock_recipe
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
  }
  
  componentDidMount() {
    setTimeout(() => {
      
	  this.loadRecipe()
    }, 100)
  }
  
  shouldComponentUpdate() {
    return true;
  }
  
  getWeight = () => {
	 let recipe = this.state.recipe;
     if (!recipe) return 0;	 
	 return recipe.recipe_lines.reduce((a, b) => a+b.ext_weight, 0); 
  }
  
  getTotalExcl = () => {
	 let recipe = this.state.recipe;
     if (!recipe) return 0;	 
	 return recipe.recipe_lines.reduce((a, b) => a+this.calcExtPrice(b), 0); 
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
  
  handleRecipeMasterChange = (event) => {
    let nam = event.target.name;
    let val = event.target.value;
	const recipe = { ...this.state.recipe, [nam]: val }
    this.setState(() => ({ recipe }))
    //this.setState({...this.state.quote, [nam]: val});
	
  }
  
  
  handleInputChange = (event) => {
    let nam = event.target.name;
    const val = event.target.type === 'checkbox' ? event.target.checked : event.target.value;
	this.setState({[nam]: val});
	
  }
   
   calcQty = (line) => {
     let formula = line.memo;
     
     //####TEST
     //formula = "HM*5";
     
     if (!formula || formula === "")
       return line.quantity_required;
     
     //####CUSTOM RULES#### - sort of
     
     formula = formula.replace("LM", this.props.length);
     formula = formula.replace("WM", this.props.width);
     formula = formula.replace("HM", this.props.height);
     formula = formula.replace("L", this.props.length*1000);
     formula = formula.replace("W", this.props.width*1000);
     formula = formula.replace("H", this.props.height*1000);
     
     //console.log(ROUNDUP(8500/1220)); //should be 7 add to unit tests?
     //console.log((8500/1220));
     //console.log(eval('ROUNDUP(8500/1220),0')); NB eval evaluates this to 0, no error - the comma in this formula should have been inside the brackets
     
     try {
       let qty = ROUNDUP(eval(formula), 3); //always make max 3 decimal places
       console.log(formula+" = "+qty);
       return qty;
     }
     catch(err) {
       const message = "Error on formula "+formula+": "+err.message;
       console.log(message);
       document.getElementById("status").innerHTML = message
       
     }     
     
   }
   
   calcUnitPrice = (line) => {
     //####CUSTOM RULES####
     //let formula = "if (this.props.build_type) this.props.discount1"; can let them put price formula somewhere too? Maybe have a memo on the Job Category..?
         
     //if (!formula || formula === "")
     //  return line.quantity_required;
     
     //formula = formula.replace("D1", this.props.length);
     //formula = formula.replace("D2", this.props.width);
     //formula = formula.replace("SP3", line.selling_price_3);
     
     /*console.log(formula);
     
     try {
       let qty = eval(formula);
       return qty;
     }
     catch(err) {
       document.getElementById("error").innerHTML = err.message;
       
     } */
     
     //let price = line.stock_selling_price_3;
     let price = 100; //####need to look up from stock code - unless we make the recipe a report, and add those on as calc fields
     
     if (this.props.build_type === "Trailer")
       price *= 1.3
     else if (this.props.build_type === "Semi-Rigid")
       price *= 1.5;
     else if (this.props.build_type === "Parts")
       price *= 5.5;
     

     return price;
     
   }
   
   calcExtPrice = (line) => {
     return this.calcUnitPrice(line) * this.calcQty(line);
   }
   
   renderRecipeDetail = (line) => {
	  
    //let subRecipe; just use a report that expands all detail, and includes the necessary stock info too, ie SP3 and discount 1..5
    //if (line.manufacture_sub_recipe)
    //  subRecipe = <RecipeDetail {...this.props} {...line} />;
    
	  
   //return (<li key={line.seq_no}>{this.calcQty(line)}x {line.stock_code} {line.stock_description} {this.calcExtPrice(line).toLocaleString(undefined, {maximumFractionDigits:2})} {subRecipe} </li>);
   //return (<li key={line.seq_no}>{this.calcQty(line)}x {line.stock_code} {line.stock_description} {this.calcExtPrice(line).toLocaleString(undefined, {maximumFractionDigits:2})} </li>);
   return (<tr key={line.seq_no}><td align="Right">{this.calcQty(line)}</td><td align="Left">{line.stock_code}</td><td>{line.stock_description}</td><td align="Right">{this.calcExtPrice(line).toLocaleString(undefined, {maximumFractionDigits:2})}</td></tr>);
   
  }
   
  renderRecipeDetails = (recipe) => {
	  const expanded = this.state.expanded;
	  const checkbox = <label>
          Expand:
          <input
            name="expanded"
            type="checkbox"
            checked={this.state.expanded}
            onChange={this.handleInputChange} />
        </label>;
        
	  if (!expanded)
	    return checkbox;	  
	  else
	    return (<span>{checkbox}<table className="table-center recipe-detail"><tbody>{recipe.recipe_lines.map((line) =>
      this.renderRecipeDetail(line))}</tbody></table></span>);
  }
  
  renderRecipe = () => {
	//let quote = this.state.quote;  
	const { error, isLoaded, recipe } = this.state;
  if (error) 
    if (error.includes("does not have a recipe"))
      return <sup>{error}</sup>;
    else
      return <h2>Error: {error}</h2>;
  if (!isLoaded) return <div>Loading...</div>;
	if (!recipe) return (<h2>Loading..</h2>);  
  
  const total = this.getTotalExcl();
  
  if (this.props.OnPriceChanged) {
    this.props.OnPriceChanged(this.props.lineindex, total);
  }
		
   return (<span><b>Total: {total.toLocaleString(undefined, {maximumFractionDigits:2})}</b>&nbsp;
	{this.renderRecipeDetails(recipe)}
		
	  
	  </span>);
  }
  
  
  render() {
    
    return (
	<div>
	<p id="status"></p>
      
      
	  {this.renderRecipe()}
	  
      </div>
    );
  }
}

export default RecipeDetail;