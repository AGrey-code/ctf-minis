(function(){
  var PREFIX = "SELECT * FROM users WHERE ";
  var USERS = [
    {username:"admin", password:"Zq7!mX2#vLp9-not-guessable"},
    {username:"guest", password:"guest123"}
  ];
  // Flag is stored encoded, so it is not sitting in plain text in the source.
  var FLAG = atob("Q1RGe1NRTDFfMW5KM2N0MTBOX21Ac3QzUl80NDEyM30=");

  var $ = function(id){return document.getElementById(id)};
  var esc = function(s){return s.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;")};

  function buildQuery(u,p){
    return PREFIX + "username = '" + u + "' AND password = '" + p + "'";
  }
  function renderQuery(u,p){
    $("query").innerHTML = esc(PREFIX+"username = '") + "<mark>" + esc(u) + "</mark>" +
      esc("' AND password = '") + "<mark>" + esc(p) + "</mark>" + esc("'");
  }

  // --- A tiny SQL WHERE evaluator: strings, numbers, columns, =, AND, OR, parentheses, -- comments ---
  function tokenize(s){
    var toks=[], i=0, m;
    while(i<s.length){
      if(/\s/.test(s[i])){i++;continue}
      if(s.substr(i,2)==="--"||s[i]==="#") break;
      var re=/('(?:[^']|'')*')|(\d+)|([A-Za-z_]\w*)|([=()])/y; re.lastIndex=i; m=re.exec(s);
      if(!m){
        if(s[i]==="'") throw new Error("Unclosed quotation mark near: " + s.slice(i,i+20));
        throw new Error("Syntax error near: " + s.slice(i,i+20));
      }
      if(m[1]) toks.push({t:"str",v:m[1].slice(1,-1).replace(/''/g,"'")});
      else if(m[2]) toks.push({t:"num",v:Number(m[2])});
      else if(m[3]){var up=m[3].toUpperCase(); toks.push(up==="AND"||up==="OR"?{t:"kw",v:up}:{t:"id",v:m[3].toLowerCase()})}
      else toks.push({t:"op",v:m[4]});
      i=re.lastIndex;
    }
    return toks;
  }
  function parse(toks){
    var p=0;
    function peek(){return toks[p]}
    function need(v){var t=toks[p]; if(!t||t.v!==v) throw new Error("Syntax error: expected "+v+(t?" near "+t.v:" at end of query")); p++}
    function operand(){
      var t=toks[p++];
      if(!t) throw new Error("Syntax error: query ended unexpectedly");
      if(t.t==="str"||t.t==="num") return function(){return t.v};
      if(t.t==="id"){
        if(t.v!=="username"&&t.v!=="password") throw new Error("Unknown column '"+t.v+"'");
        return function(row){return row[t.v]};
      }
      throw new Error("Syntax error near: "+t.v);
    }
    function cmp(){
      var t=peek();
      if(t&&t.v==="("&&t.t==="op"){p++; var e=or(); need(")"); return e}
      var a=operand(); need("="); var b=operand();
      return function(row){return a(row)==b(row)};
    }
    function and(){
      var l=cmp();
      while(peek()&&peek().t==="kw"&&peek().v==="AND"){p++; var r=cmp(); l=(function(x,y){return function(row){return x(row)&&y(row)}})(l,r)}
      return l;
    }
    function or(){
      var l=and();
      while(peek()&&peek().t==="kw"&&peek().v==="OR"){p++; var r=and(); l=(function(x,y){return function(row){return x(row)||y(row)}})(l,r)}
      return l;
    }
    var tree=or();
    if(p<toks.length) throw new Error("Syntax error near: "+toks[p].v);
    return tree;
  }
  function runQuery(q){
    var tree=parse(tokenize(q.slice(PREFIX.length)));
    return USERS.filter(tree);
  }

  function show(cls,html){var r=$("result"); r.className="result "+cls; r.innerHTML=html}

  function login(){
    var u=$("u").value, p=$("p").value;
    var q=buildQuery(u,p);
    renderQuery(u,p);
    var rows;
    try{ rows=runQuery(q) }
    catch(e){ show("bad","<strong>Database error:</strong> "+esc(e.message)+"<br>The query broke. That tells you your input is changing its structure."); return }
    if(!rows.length){ show("bad","Invalid username or password."); return }
    var who=rows[0].username;
    if(who==="admin"){
      show("ok","<strong>Welcome, admin.</strong> Flag: <code>"+esc(FLAG)+"</code>");
      $("fixCard").classList.remove("hidden");
    } else {
      show("ok","Logged in as <strong>"+esc(who)+"</strong>. Nothing interesting here. Can you become admin?");
    }
  }

  var hints=0;
  $("hintBtn").addEventListener("click",function(){
    if(hints<3){hints++; $("h"+hints).classList.add("show")}
    $("hintCount").textContent="Hint "+hints+" of 3";
    if(hints===3) this.disabled=true;
  });
  $("go").addEventListener("click",login);
  ["u","p"].forEach(function(id){
    $(id).addEventListener("keydown",function(e){if(e.key==="Enter")login()});
    $(id).addEventListener("input",function(){renderQuery($("u").value,$("p").value)});
  });
  renderQuery("","");
})();