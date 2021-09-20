import OmniReactComponent from './Omni.js';

class Login extends OmniReactComponent {
  
  constructor(props) {
    super(props);
	  this.state = {...this.state, 
                  credentials: null };
  }
  
  static getDerivedStateFromProps(props, state) {
    return {userName: props.userName };
  } 
  
  getLogonToken(credentials) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: '{ "quote" : '+JSON.stringify(credentials)+' }'
    };
    fetch(this.state.baseUrl+"/Logon/"+this.props.userName+"?"+this.state.credentials, requestOptions)
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
    
  }
  
  shouldComponentUpdate() {
    return true;
  }
  
  getSnapshotBeforeUpdate(prevProps, prevState) {
    document.getElementById("status").innerHTML = "Updating..";
    //"Before the update, the favorite was " + prevState.favoritecolor;	
	  return null; //??
  }
  componentDidUpdate() {
    document.getElementById("status").innerHTML = "";  
  }
  
  handleChange = (event) => {
    let nam = event.target.name;
    let val = event.target.value;
	  const credentials = { ...this.state.credentials, [nam]: val }
    this.setState(() => ({ credentials }))
  }
  
    
  submitForm = (event) => {
    event.preventDefault();
    this.setUserNameAndLogonToken(this.state.credentials.username, this.state.credentials.password);
    this.props.onLogon();
  }
  
  
  render() {
    //const [username, setUsername] = useState("");
    //const [password, setPassword] = useState("");
  
    return (
      <form onSubmit={this.submitForm}>
        <h1>Please enter your Omni logon details</h1>
        <div className="form-group">
        <label htmlFor="username">User Name: 
        <input
          type="text"
          name="userName"
          placeholder="User Name"
          className="form-control"
          onChange={this.handleChange}
        /></label></div>
        <div>
        <div className="form-group">
          <label htmlFor="password">Password: 
          <input
            type="password"
            name="password"
            placeholder="Password"
            className="form-control"
            onChange={this.handleChange}
          /></label></div>
        </div>
        <p id="status">{this.state.status}</p>
	      <button type="submit" action="login">Login</button>
      </form>
    );    
  }
}

export default Login;