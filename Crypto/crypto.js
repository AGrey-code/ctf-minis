(function(){
  // SHA-256 of the correct flag. The flag itself is not stored on this page.
  var FLAG_HASH = "1c20b75a4c8b86ff57ec2a2208ce0bf3431711d12b4a414a98c2178ba6476e29";
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
      show("ok","Correct! You decrypted the message.");
      $("solved").classList.remove("hidden");
    } else {
      show("bad","Not quite. Check that you used the whole key and kept the exact capitalization.");
    }
  }

  var hints=0;
  $("hintBtn").addEventListener("click",function(){
    if(hints<3){hints++; $("h"+hints).classList.add("show")}
    $("hintCount").textContent="Hint "+hints+" of 3";
    if(hints===3) this.disabled=true;
  });
  $("check").addEventListener("click",check);
  $("f").addEventListener("keydown",function(e){if(e.key==="Enter")check()});
})();