(this.webpackJsonpconfigurator=this.webpackJsonpconfigurator||[]).push([[0],{11:function(module,__webpack_exports__,__webpack_require__){"use strict";var C_Users_Maya_configurator_node_modules_babel_preset_react_app_node_modules_babel_runtime_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__(2),C_Users_Maya_configurator_node_modules_babel_preset_react_app_node_modules_babel_runtime_helpers_esm_objectSpread2__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__(1),C_Users_Maya_configurator_node_modules_babel_preset_react_app_node_modules_babel_runtime_helpers_esm_classCallCheck__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__(4),C_Users_Maya_configurator_node_modules_babel_preset_react_app_node_modules_babel_runtime_helpers_esm_createClass__WEBPACK_IMPORTED_MODULE_3__=__webpack_require__(7),C_Users_Maya_configurator_node_modules_babel_preset_react_app_node_modules_babel_runtime_helpers_esm_inherits__WEBPACK_IMPORTED_MODULE_4__=__webpack_require__(6),C_Users_Maya_configurator_node_modules_babel_preset_react_app_node_modules_babel_runtime_helpers_esm_createSuper__WEBPACK_IMPORTED_MODULE_5__=__webpack_require__(5),_Omni_js__WEBPACK_IMPORTED_MODULE_6__=__webpack_require__(8),react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__=__webpack_require__(0),react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7___default=__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__);function ROUNDUP(e,t){return t||(t=0),Math.round((e+.499/Math.pow(10,t))*Math.pow(10,t))/Math.pow(10,t)}var RecipeDetail=function(_OmniReactComponent){Object(C_Users_Maya_configurator_node_modules_babel_preset_react_app_node_modules_babel_runtime_helpers_esm_inherits__WEBPACK_IMPORTED_MODULE_4__.a)(RecipeDetail,_OmniReactComponent);var _super=Object(C_Users_Maya_configurator_node_modules_babel_preset_react_app_node_modules_babel_runtime_helpers_esm_createSuper__WEBPACK_IMPORTED_MODULE_5__.a)(RecipeDetail);function RecipeDetail(props){var _this;return Object(C_Users_Maya_configurator_node_modules_babel_preset_react_app_node_modules_babel_runtime_helpers_esm_classCallCheck__WEBPACK_IMPORTED_MODULE_2__.a)(this,RecipeDetail),_this=_super.call(this,props),_this.getWeight=function(){var e=_this.state.recipe;return e?e.recipe_lines.reduce((function(e,t){return e+t.ext_weight}),0):0},_this.getTotalExcl=function(){var e=_this.state.recipe;return e?e.recipe_lines.reduce((function(e,t){return e+_this.calcExtPrice(t)}),0):0},_this.handleRecipeMasterChange=function(e){var t=e.target.name,_=e.target.value,r=Object(C_Users_Maya_configurator_node_modules_babel_preset_react_app_node_modules_babel_runtime_helpers_esm_objectSpread2__WEBPACK_IMPORTED_MODULE_1__.a)(Object(C_Users_Maya_configurator_node_modules_babel_preset_react_app_node_modules_babel_runtime_helpers_esm_objectSpread2__WEBPACK_IMPORTED_MODULE_1__.a)({},_this.state.recipe),{},Object(C_Users_Maya_configurator_node_modules_babel_preset_react_app_node_modules_babel_runtime_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_0__.a)({},t,_));_this.setState((function(){return{recipe:r}}))},_this.handleInputChange=function(e){var t=e.target.name,_="checkbox"===e.target.type?e.target.checked:e.target.value;_this.setState(Object(C_Users_Maya_configurator_node_modules_babel_preset_react_app_node_modules_babel_runtime_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_0__.a)({},t,_))},_this.calcQty=function(line){var formula=line.memo;if(!formula||""===formula)return line.quantity_required;formula=formula.replace("LM",_this.props.length),formula=formula.replace("WM",_this.props.width),formula=formula.replace("HM",_this.props.height),formula=formula.replace("L",1e3*_this.props.length),formula=formula.replace("W",1e3*_this.props.width),formula=formula.replace("H",1e3*_this.props.height);try{var qty=ROUNDUP(eval(formula),3);return console.log(formula+" = "+qty),qty}catch(err){var message="Error on formula "+formula+": "+err.message;console.log(message),document.getElementById("status").innerHTML=message}},_this.calcUnitPrice=function(e){var t=100;return"Trailer"===_this.props.build_type?t*=1.3:"Semi-Rigid"===_this.props.build_type?t*=1.5:"Parts"===_this.props.build_type&&(t*=5.5),t},_this.calcExtPrice=function(e){return _this.calcUnitPrice(e)*_this.calcQty(e)},_this.renderRecipeDetail=function(e){return Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsxs)("tr",{children:[Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsx)("td",{align:"Right",children:_this.calcQty(e)}),Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsx)("td",{align:"Left",children:e.stock_code}),Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsx)("td",{children:e.stock_description}),Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsx)("td",{align:"Right",children:_this.calcExtPrice(e).toLocaleString(void 0,{maximumFractionDigits:2})})]},e.seq_no)},_this.renderRecipeDetails=function(e){var t=_this.state.expanded,_=Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsxs)("label",{children:["Expand:",Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsx)("input",{name:"expanded",type:"checkbox",checked:_this.state.expanded,onChange:_this.handleInputChange})]});return t?Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsxs)("span",{children:[_,Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsx)("table",{className:"table-center recipe-detail",children:Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsx)("tbody",{children:e.recipe_lines.map((function(e){return _this.renderRecipeDetail(e)}))})})]}):_},_this.renderRecipe=function(){var e=_this.state,t=e.error,_=e.isLoaded,r=e.recipe;if(t)return t.includes("does not have a recipe")?Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsx)("sup",{children:t}):Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsxs)("h2",{children:["Error: ",t]});if(!_)return Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsx)("div",{children:"Loading..."});if(!r)return Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsx)("h2",{children:"Loading.."});var a=_this.getTotalExcl();return _this.props.OnPriceChanged&&_this.props.OnPriceChanged(_this.props.lineindex,a),Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsxs)("span",{children:[Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsxs)("b",{children:["Total: ",a.toLocaleString(void 0,{maximumFractionDigits:2})]}),"\xa0",_this.renderRecipeDetails(r)]})},_this.state=Object(C_Users_Maya_configurator_node_modules_babel_preset_react_app_node_modules_babel_runtime_helpers_esm_objectSpread2__WEBPACK_IMPORTED_MODULE_1__.a)(Object(C_Users_Maya_configurator_node_modules_babel_preset_react_app_node_modules_babel_runtime_helpers_esm_objectSpread2__WEBPACK_IMPORTED_MODULE_1__.a)({},_this.state),{},{recipe:null,expanded:!1}),_this}return Object(C_Users_Maya_configurator_node_modules_babel_preset_react_app_node_modules_babel_runtime_helpers_esm_createClass__WEBPACK_IMPORTED_MODULE_3__.a)(RecipeDetail,[{key:"loadRecipe",value:function(){var e=this;fetch(this.state.baseUrl+"/Stock Recipe/"+this.props.stock_code+"?"+this.state.credentials).then((function(e){return e.ok?e.json():e.text().then((function(e){throw e}))})).then((function(t){console.log(JSON.stringify(t)),e.setState({isLoaded:!0,recipe:t.stock_recipe})}),(function(t){e.setState({isLoaded:!0,error:t})}))}},{key:"componentDidMount",value:function(){var e=this;setTimeout((function(){e.loadRecipe()}),100)}},{key:"shouldComponentUpdate",value:function(){return!0}},{key:"getSnapshotBeforeUpdate",value:function(e,t){return document.getElementById("status").innerHTML="Updating..",null}},{key:"componentDidUpdate",value:function(){document.getElementById("status").innerHTML=""}},{key:"render",value:function(){return Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsxs)("div",{children:[Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsx)("p",{id:"status"}),this.renderRecipe()]})}}],[{key:"getDerivedStateFromProps",value:function(e,t){return{stockCode:e.stock_code}}}]),RecipeDetail}(_Omni_js__WEBPACK_IMPORTED_MODULE_6__.a);__webpack_exports__.a=RecipeDetail},16:function(e,t,_){},17:function(e,t,_){},19:function(e,t,_){"use strict";_.r(t);var r=_(3),a=_.n(r),n=_(10),s=_.n(n),i=(_(16),_.p+"static/media/logo.6ce24c58.svg"),o=(_(17),_(2)),c=_(1),u=_(4),l=_(7),d=_(6),p=_(5),h=_(11),m=_(8),b=_(0),O=function(e){Object(d.a)(_,e);var t=Object(p.a)(_);function _(e){var r;return Object(u.a)(this,_),(r=t.call(this,e)).getVolume=function(){var e=r.state.quote;return e?e.width*e.length*e.height:0},r.getExtPrice=function(e){return e.selling_price_per?e.quantity*e.selling_price/e.selling_price_per:e.quantity*e.selling_price},r.getTotalExcl=function(){var e=r.state.quote;return e?e.quote_lines.reduce((function(e,t){return e+r.getExtPrice(t)}),0):0},r.handleQuoteMasterChange=function(e){var t=e.target.name,_=e.target.value,a=Object(c.a)(Object(c.a)({},r.state.quote),{},Object(o.a)({},t,_));r.setState((function(){return{quote:a}}))},r.DoPriceChanged=function(e,t){var _=r.state,a=(_.error,_.isLoaded),n=_.quote;a&&n&&(r.state.quote.quote_lines[e].selling_price=t)},r.submitQuote=function(e){e.preventDefault(),r.saveQuote(r.state.quote)},r.renderQuoteDetails=function(e){return Object(b.jsx)("ul",{children:e.quote_lines.map((function(t,_){return Object(b.jsxs)("li",{children:[t.quantity,"x ",t.stock_code," ",t.description," ",Object(b.jsx)(h.a,Object(c.a)(Object(c.a)(Object(c.a)({},e),t),{},{lineindex:_,OnPriceChanged:r.DoPriceChanged,credentials:r.props.credentials}))]},t.line_no)}))})},r.renderQuoteMaster=function(){var e=r.state,t=e.error,_=e.isLoaded,a=e.quote;return t?Object(b.jsxs)("h2",{children:["Error: ",t]}):_?a?Object(b.jsxs)("div",{children:[Object(b.jsx)("span",{className:"form-group",children:Object(b.jsxs)("label",{children:["Select the build type:",Object(b.jsxs)("select",{name:"build_type",value:a.build_type,onChange:r.handleQuoteMasterChange,children:[Object(b.jsx)("option",{value:"Semi-Rigid",children:"Semi-Rigid"}),Object(b.jsx)("option",{value:"Trailer",children:"Trailer"}),Object(b.jsx)("option",{value:"Repair",children:"Repair"}),Object(b.jsx)("option",{value:"Parts",children:"Parts"})]})]})}),Object(b.jsx)("span",{className:"form-group",children:Object(b.jsxs)("label",{children:[" Length:",Object(b.jsx)("input",{type:"number",name:"length",value:a.length,onChange:r.handleQuoteMasterChange})]})}),Object(b.jsx)("span",{className:"form-group",children:Object(b.jsxs)("label",{children:[" Width:",Object(b.jsx)("input",{type:"number",name:"width",value:a.width,onChange:r.handleQuoteMasterChange})]})}),Object(b.jsx)("span",{className:"form-group",children:Object(b.jsxs)("label",{children:[" Height:",Object(b.jsx)("input",{type:"number",name:"height",value:a.height,onChange:r.handleQuoteMasterChange})]})}),Object(b.jsxs)("p",{children:["Volume: ",r.getVolume()+" cubic metres"]}),r.renderQuoteDetails(a),Object(b.jsxs)("p",{className:"grand-total",children:["Total: ",r.getTotalExcl().toLocaleString(void 0,{maximumFractionDigits:2})]}),Object(b.jsx)("p",{id:"statusmessage",children:r.state.statusmessage})]}):Object(b.jsx)("h2",{children:"Loading.."}):Object(b.jsx)("div",{children:"Loading..."})},r.state=Object(c.a)(Object(c.a)({},r.state),{},{quote:null}),r}return Object(l.a)(_,[{key:"loadQuote",value:function(){var e=this,t=this.state.baseUrl+"/Quote/"+this.props.reference+"?"+this.state.credentials;fetch(t).then((function(e){return e.ok?e.json():e.text().then((function(e){throw e}))})).then((function(t){e.setState({isLoaded:!0,quote:t.quote})}),(function(t){e.setState({isLoaded:!0,error:t})}))}},{key:"saveQuote",value:function(e){var t=this,_={method:"PUT",headers:{"Content-Type":"application/json"},body:'{ "quote" :  '+JSON.stringify(e)+"  }"};fetch(this.state.baseUrl+"/Quote/"+this.props.reference+"?"+this.state.credentials,_).then((function(e){return e.ok?e.text():e.text().then((function(e){throw e}))})).then((function(e){return t.setState({statusmessage:e})}),(function(e){t.setState({statusmessage:"Error: "+e})}))}},{key:"componentDidMount",value:function(){var e=this;setTimeout((function(){e.loadQuote()}),100)}},{key:"shouldComponentUpdate",value:function(){return!0}},{key:"getSnapshotBeforeUpdate",value:function(e,t){return document.getElementById("status").innerHTML="Updating..",null}},{key:"componentDidUpdate",value:function(){document.getElementById("status").innerHTML=""}},{key:"render",value:function(){return Object(b.jsxs)("form",{onSubmit:this.submitQuote,children:[Object(b.jsx)("h1",{children:"Enter the type and dimensions"}),Object(b.jsx)("p",{id:"status",children:this.state.status}),this.renderQuoteMaster(),Object(b.jsx)("button",{type:"submit",action:"save",children:"Save Quote"})," ",Object(b.jsx)("button",{type:"submit",action:"saveas",children:"Save As New Quote"})," ",Object(b.jsx)("button",{type:"submit",action:"saveasrev",children:"Save As Revised Quote"})]})}}],[{key:"getDerivedStateFromProps",value:function(e,t){return{reference:e.reference}}}]),_}(m.a);function j(e,t){var _=new URLSearchParams(window.location.search).get(e);return _&&""!==_||(_=Object({NODE_ENV:"production",PUBLIC_URL:"/react-configurator",WDS_SOCKET_HOST:void 0,WDS_SOCKET_PATH:void 0,WDS_SOCKET_PORT:void 0,FAST_REFRESH:!0,REACT_APP_BaseUrl:"http://web.omniaccounts.co.za:50325",REACT_APP_CompanyName:"Serco-JB",REACT_APP_Password:"tibro",REACT_APP_UserName:"Maya"}).name),_&&""!==_||(_=t),_}var E=function(){var e="UserName="+j("UserName","Guest")+"&Password="+j("Password","Dev2021")+"&CompanyName="+j("CompanyName","SA Example Company [Demo]"),t=j("RefNo","Q00008");return Object(b.jsxs)("div",{className:"App",children:[Object(b.jsxs)("header",{className:"App-header",children:[Object(b.jsx)("img",{src:i,className:"App-logo",alt:"logo"}),Object(b.jsxs)("div",{className:"App-name",children:[Object(b.jsx)("h1",{children:"Configurator"}),Object(b.jsx)("sup",{children:"Quote Builder"})]})]}),Object(b.jsx)(O,{reference:t,credentials:e})]})},f=function(e){e&&e instanceof Function&&_.e(3).then(_.bind(null,20)).then((function(t){var _=t.getCLS,r=t.getFID,a=t.getFCP,n=t.getLCP,s=t.getTTFB;_(e),r(e),a(e),n(e),s(e)}))};s.a.render(Object(b.jsx)(a.a.StrictMode,{children:Object(b.jsx)(E,{})}),document.getElementById("root")),f()},8:function(e,t,_){"use strict";var r=_(4),a=_(6),n=_(5),s=_(3),i=_.n(s),o=(_(10),function(e){Object(a.a)(_,e);var t=Object(n.a)(_);function _(e){var a;Object(r.a)(this,_),(a=t.call(this,e)).getDefaultVal=function(e,t){var _=new URLSearchParams(window.location.search).get(e);return _&&""!==_||(_=Object({NODE_ENV:"production",PUBLIC_URL:"/react-configurator",WDS_SOCKET_HOST:void 0,WDS_SOCKET_PATH:void 0,WDS_SOCKET_PORT:void 0,FAST_REFRESH:!0,REACT_APP_BaseUrl:"http://web.omniaccounts.co.za:50325",REACT_APP_CompanyName:"Serco-JB",REACT_APP_Password:"tibro",REACT_APP_UserName:"Maya"})["REACT_APP_"+e]),_&&""!==_||(_=t),_};var n=a.getDefaultVal("BaseUrl","http://st.omniaccounts.co.za:55683"),s="UserName="+a.getDefaultVal("UserName","Guest")+"&Password="+a.getDefaultVal("Password","Dev2021")+"&CompanyName="+a.getDefaultVal("CompanyName","SA Example Company [Demo]");return a.state={baseUrl:n,credentials:s,isLoaded:!1},a}return _}(i.a.Component));t.a=o}},[[19,1,2]]]);
//# sourceMappingURL=main.fb4b41c9.chunk.js.map