import React from 'react';
import ReactDOM from 'react-dom';




class RecipeDetail extends React.Component {
  constructor(props) {
    super(props);
	this.state = {
      recipeLines: null,
      isLoaded: false,
	  expanded: false
    };
	
  }
  
 static getDerivedStateFromProps(props, state) {
    return {stockCode: props.stock_code };
  } 
  
  loadRecipe() {
	  //console.log(this.props.stock_code);
	  ///#######this report is a stock list, need a report or a proper endpoint, will use as POC for now though
	fetch("http://st.omniaccounts.co.za:55683/Report/Recipe Export?Stock Code="+this.props.stock_code+"&"+this.props.credentials)
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
			
		      console.log(JSON.stringify(result.recipe_export));
		  
          this.setState({
            isLoaded: true,
            recipeLines: result.recipe_export
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
	 let recipeLines = this.state.recipeLines;
     if (!recipeLines) return 0;	 
	 return recipeLines.reduce((a, b) => a+b.ext_weight, 0); 
  }
  
  getTotalExcl = () => {
	 let recipeLines = this.state.recipeLines;
     if (!recipeLines) return 0;	 
	 return recipeLines.reduce((a, b) => a+b.excl_unit_selling_price, 0); 
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
     let formula = line.recipe_memo;
     
     //####TEST
     formula = "HM*5";
     
     if (!formula || formula === "")
       return line.quantity_required;
     
     formula = formula.replace("LM", this.props.length);
     formula = formula.replace("WM", this.props.width);
     formula = formula.replace("HM", this.props.height);
     
     console.log(formula);
     
     try {
       let qty = eval(formula);
       return qty;
     }
     catch(err) {
       document.getElementById("error").innerHTML = err.message;
       
     }     
     
   }
   
   calcUnitPrice = (line) => {
     //let formula = "if (this.props.build_type) this.props.discount1"; can let them put price formula somewhere too?
     
     
     //if (!formula || formula === "")
     //  return line.quantity_required;
     
     //formula = formula.replace("D1", this.props.length);
     //formula = formula.replace("D2", this.props.width);
     //formula = formula.replace("SP3", this.props.SellingPrice3);
     
     /*console.log(formula);
     
     try {
       let qty = eval(formula);
       return qty;
     }
     catch(err) {
       document.getElementById("error").innerHTML = err.message;
       
     } */
     
     let price = line.excl_unit_selling_price;
     
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
	  
    let subRecipe;
    if (line.has_sub_recipe)
      subRecipe = <RecipeDetail {...this.props} {...line} />;
    
	  
   return (<li>{this.calcQty(line)}x {line.stock_code} {line.stock_description} {this.calcExtPrice(line)} {subRecipe} </li>);
   
  }
   
  renderRecipeDetails = (recipeLines) => {
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
	    return (<div>{checkbox}<ul>{recipeLines.map((line) =>
      this.renderRecipeDetail(line))}</ul></div>);
  }
  
  renderRecipe = () => {
	//let quote = this.state.quote;  
	const { error, isLoaded, recipeLines } = this.state;
    if (error) return <h2>Error: {error}</h2>;
    if (!isLoaded) return <div>Loading...</div>;
	if (!recipeLines) return (<h2>Loading..</h2>);  
		
    return (<div>
	{this.renderRecipeDetails(recipeLines)}
		
	  <p>Total: {this.getTotalExcl()}</p>
	  </div>);
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