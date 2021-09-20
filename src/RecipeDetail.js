import OmniReactComponent from './Omni.js';


/***Start of Custom Functions***/

//Note: these functions are uppercase, as they are simulating the Excel equivalents, and that is how they are formatted in the expressions the end user created
function ROUNDUP(num, precision) {  
  if (!precision) //is an optional param
    precision = 0;
  
  return Math.round((num+(0.499/10**precision)) * 10**precision) / 10**precision;
}

//not sure if needed, but Omni Trucks test data contains these, and I see it is a valid Excel function too:
//To round down to the nearest specified place, use the ROUNDDOWN function. >> useful for when qty is negative, and you want to round "up"
function ROUNDDOWN(num, precision) { 
  if (!precision) //is an optional param
    precision = 0;
  
  return Math.trunc(num * 10**precision) / 10**precision;
}

function IIF(condition, trueresult, falseresult) {
  if (condition)
    return trueresult
  else
    return falseresult;
}

/***End of custom functions***/


class RecipeDetail extends OmniReactComponent {
  constructor(props) {
    super(props);
    this.state = {...this.state, 
      recipe_lines: null,
      expanded: false
    };    
  }
  
  static getDerivedStateFromProps(props, state) {
    return {stockCode: props.stock_code };
  } 
  
  loadRecipe() {
    //console.log(this.props.stock_code);
    //const url = this.state.baseUrl+"/Stock Recipe/"+this.props.stock_code+"?CompanyName="+encodeURIComponent(this.state.companyName);
    //const url = this.state.baseUrl+"/Report/Recipe Export - Individual?IFGCode="+encodeURIComponent(this.props.stock_code)+"&CompanyName="+encodeURIComponent(this.state.companyName);
    const url = this.state.baseUrl+"/Report/Configurator Recipe Detail?IFGCode="+encodeURIComponent(this.props.stock_code)+"&CompanyName="+encodeURIComponent(this.state.companyName);
    
    //console.log(url);
        
    const auth = 'Basic ' + Buffer.from(this.state.userName + ':' + this.state.password).toString('base64');
    
  //#######this report is a stock list, need a report or a proper endpoint, will use as POC for now though
  //fetch("http://st.omniaccounts.co.za:55683/Report/Recipe Export?Stock Code="+this.props.stock_code+"&"+this.props.credentials)
  //fetch("http://st.omniaccounts.co.za:55683/Stock Recipe/"+this.props.stock_code+"?"+this.props.credentials)
  //fetch(this.state.baseUrl+"/Stock Recipe/"+this.props.stock_code+"?"+this.state.credentials)
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
          return res.text().then(text => {throw text});
      } 
      else {
        //res.text().then(text => {console.log(text)});
        return res.json();
      }
      })
      .then(
        (result) => {
          //console.log(JSON.stringify(result));
      
          this.setState({
            isLoaded: true,
            //recipe: result.stock_recipe
            //recipe_lines: result.recipe_export___individual
            recipe_lines: result.configurator_recipe_detail
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
   let recipe_lines = this.state.recipe_lines;
     if (!recipe_lines) return 0;	 
   return recipe_lines.reduce((a, b) => a+b.ext_weight, 0); 
  }
  
  getTotalExcl = () => {
   let recipe_lines = this.state.recipe_lines;
     if (!recipe_lines) return 0;	 
   return recipe_lines.reduce((a, b) => a+this.calcExtPrice(b), 0); 
  }
  
  getSnapshotBeforeUpdate(prevProps, prevState) {
    document.getElementById("status").innerHTML = "Updating..";
    //"Before the update, the favorite was " + prevState.favoritecolor; example of what can be done here	
    return null; //??need to return anything?
  }
  
  componentDidUpdate() {
    document.getElementById("status").innerHTML = "";
    //"The updated favorite is " + this.state.favoritecolor; example of what can be done here
  }
  
  handleRecipeMasterChange = (event) => {
    let nam = event.target.name;
    let val = event.target.value;
    const recipe_lines = { ...this.state.recipe_lines, [nam]: val };
    this.setState(() => ({ recipe_lines }));
  } 
  
  handleInputChange = (event) => {
    let nam = event.target.name;
    const val = event.target.type === 'checkbox' ? event.target.checked : event.target.value;
    this.setState({[nam]: val});
  }
  
  calcId = (line) => {
    return line.parent_stock_code +'_'+ line.sequence_number.toString();
  }
   
  calcQty = (line) => {
     //let formula = line.memo;
     let formula = line.recipe_memo;
     
     if (line.has_recipe === "Y") return 0; //skip main recipe and intermediate recipe, only add up the parts
     
     //eg formula = "ROUNDUP(HM*5,1)";
     
     if (!formula || formula === "")
       //return line.quantity_required;
       return line.quantity;
     
     formula = formula.toUpperCase();
     
     //####CUSTOM RULES#### - supports Length, Width and Height and Excel type formulae
     
     formula = formula.replace(/LM/g, this.props.length*1.0); //the *1.0 is in case you type in 02 in the input box, javascript calc then gives errors about quartets
     formula = formula.replace(/WM/g, this.props.width*1.0);
     formula = formula.replace(/HM/g, this.props.height*1.0);
     formula = formula.replace(/\bL\b/g, this.props.length*1000);
     formula = formula.replace(/\bW\b/g, this.props.width*1000); //the \b makes sure it's not the W in ROUNDDOWN() for example
     formula = formula.replace(/\bH\b/g, this.props.height*1000);
           
     //console.log(ROUNDUP(8500/1220)); //should be 7 add to unit tests?
     //console.log((8500/1220));
     //console.log(eval('ROUNDUP(8500/1220),0')); NB eval evaluates this to 0, no error - the comma in this formula should have been inside the brackets
     
     //need to maybe do some safety check on formula before calling eval? Maybe limit the length? 
     
     try {
       let qty = line.quantity * ROUNDUP(eval(formula), 3); //always make max 3 decimal places
       //console.log(formula+" = "+qty);
       return qty;
     }
     catch(err) {
       const message = "Error on formula "+formula+": "+err.message;
       console.log(message); //NB. leave in, not a regular temp debug message
       document.getElementById("status").innerHTML = message       
     }         
   }
   
   calcUnitPrice = (line) => {
     //####CUSTOM RULES#### maybe build type can contain the discount level number to use, and be changed to get the lookup list from Omni, eg. Trailer - 1, Repairs - 3, etc
     
     let price = line.stock_unit_selling_price_3; //this is usually the min selling price / landed cost / break even price in most systems
     
     if (this.props.build_type === "Trailer")
       price *= (1+Math.abs(line.stock_discount_2)/100)   //use abs(), as theoretially these should be captured as negative discounts, but they may have captured them as positives
     else if (this.props.build_type === "Semi-Rigid")
       price *= (1+Math.abs(line.stock_discount_1)/100);
     else if (this.props.build_type === "Parts")
       price *= (1+Math.abs(line.stock_discount_5)/100);
     
     price = ROUNDUP(price, 1); //must be rounded to at least 2 dec place. Customer wants the price prettier though so making nearest 10c - could maybe also use MROUND to 0.05?

     return price;     
   }
   
   calcExtPrice = (line) => {
     return Math.round(this.calcUnitPrice(line) * this.calcQty(line), 2);
   }
   
   renderRecipeDetail = (line) => {	  
    //let subRecipe; just use a report that expands all detail, and includes the necessary stock info too, ie SP3 and discount 1..5
    //if (line.manufacture_sub_recipe)
    //  subRecipe = <RecipeDetail {...this.props} {...line} />;
    
    if (line.has_recipe === "Y") return null;
    if (line.has_recipe === "N" && !line.parent_stock_code) return null; //ideally want no recipe items at all, but one line does get returned, so need to check for this here
    
   //return (<li key={line.seq_no}>{this.calcQty(line)}x {line.stock_code} {line.stock_description} {this.calcExtPrice(line).toLocaleString(undefined, {maximumFractionDigits:2})} {subRecipe} </li>);
   //return (<li key={line.seq_no}>{this.calcQty(line)}x {line.stock_code} {line.stock_description} {this.calcExtPrice(line).toLocaleString(undefined, {maximumFractionDigits:2})} </li>);
   //return (<tr key={line.seq_no}><td align="Right">{this.calcQty(line)}</td><td align="Left">{line.stock_code}</td><td>{line.stock_description}</td><td>{line.recipe_memo}</td><td align="Right">{this.calcExtPrice(line).toLocaleString(undefined, {maximumFractionDigits:2})}</td></tr>);
   //return (<tr key={line.sequence_number}><td align="Right">{this.calcQty(line)}</td><td align="Left">{line.stock_code}</td><td>{line.stock_description}</td><td>{line.recipe_memo}</td><td align="Right">{this.calcExtPrice(line).toLocaleString(undefined, {maximumFractionDigits:2})}</td></tr>);
   //return (<tr key={this.calcId(line)}><td align="Right">{this.calcQty(line)}</td><td align="Left">{line.stock_code}</td><td>{line.stock_description}</td><td>{line.recipe_memo}</td><td align="Right">{this.calcExtPrice(line).toLocaleString(undefined, {minimumFractionDigits:2, maximumFractionDigits:2})}</td></tr>);
   return (<tr key={this.calcId(line)}><td align="Right">{this.formatQty(this.calcQty(line))}</td><td align="Left">{line.stock_code}</td><td>{line.stock_description}</td><td>{line.recipe_memo}</td><td align="Right">{this.formatPrice(this.calcExtPrice(line))}</td></tr>);   
  }
   
  renderRecipeDetails = (recipe_lines) => {
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
      return (<span>{checkbox}<table className="table-center recipe-detail"><tbody>{recipe_lines.map((line) => this.renderRecipeDetail(line))}</tbody></table></span>);
  }
  
  renderRecipe = () => {
    const { error, isLoaded, recipe_lines } = this.state;
    
    if (error) 
      if (error.includes("does not have a recipe"))
        return <sup>{error}</sup>;
      else
        return <h2>Error: {error}</h2>;
      
    if (!isLoaded) return <div>Loading...</div>;
    if (!recipe_lines) return (<h2>Loading..</h2>); 

    if (recipe_lines.length === 0)
      return <sup>No recipe</sup>;  
  
    if (recipe_lines.length === 1 && recipe_lines.stock_parent_code == null)
      return <sup>No recipe.</sup>;  
  
    const total = this.getTotalExcl();
  
    if (this.props.OnPriceChanged) {
      this.props.OnPriceChanged(this.props.lineindex, total);
    } 
    
    return (<span><b>Total: {total.toLocaleString(undefined, {minimumFractionDigits:2, maximumFractionDigits:2})}</b>&nbsp;{this.renderRecipeDetails(recipe_lines)}</span>);
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