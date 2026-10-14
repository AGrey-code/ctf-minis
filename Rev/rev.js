(function(){
  // SHA-256 of the correct flag. The flag itself is not stored on this page,
  // but the full solution hint does print it when run.
  var FLAG_HASH = "682c252f16144959e17ba55a9436f36510b13ff4886729ba398484de9220c439";
  var $ = function(id){return document.getElementById(id)};
  function show(cls,msg){var r=$("result"); r.className="result "+cls; r.textContent=msg}

  async function sha256(text){
    var buf = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(text));
    return Array.from(new Uint8Array(buf)).map(function(b){return b.toString(16).padStart(2,"0")}).join("");
  }
  async function check(){
    var guess = $("f").value.trim();
    if(!guess){show("bad","Type a flag first."); return}
    if(!(window.crypto && crypto.subtle)){show("bad","Your browser can't check flags here. Open this page over https and try again."); return}
    if(await sha256(guess) === FLAG_HASH){
      show("ok","Correct! You reconstructed the original input.");
      $("solved").classList.remove("hidden");
    } else {
      show("bad","Not quite. Does your result start with CTF{ ? If it's garbled, check the order of your steps.");
    }
  }

  function copy(id,btn){
    var text=$(id).textContent, old=btn.textContent;
    function done(){btn.textContent="Copied"; setTimeout(function(){btn.textContent=old},1500)}
    if(navigator.clipboard&&navigator.clipboard.writeText){navigator.clipboard.writeText(text).then(done,function(){})}
  }

  var hints=0;
  $("hintBtn").addEventListener("click",function(){
    if(hints<4){hints++; $("h"+hints).classList.add("show")}
    $("hintCount").textContent="Hint "+hints+" of 4";
    if(hints===3) this.textContent="Show the solution";
    if(hints===4) this.disabled=true;
  });
  $("check").addEventListener("click",check);
  $("f").addEventListener("keydown",function(e){if(e.key==="Enter")check()});
  $("copyOut").addEventListener("click",function(){copy("out",this)});
  $("copySol").addEventListener("click",function(){copy("solution",this)});
})();