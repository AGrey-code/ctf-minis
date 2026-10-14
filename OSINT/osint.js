(function () {
  "use strict";

  // SHA-256 of the correct flag, normalized (trimmed, lowercased).
  // The flag text itself is not stored here.
  var FLAG_HASH = "10f0c071fe5aee1c46c9924ae7e79e372ee170b6715b6ffd907b69c8c1212d59";

  var $ = function (id) { return document.getElementById(id); };

  function showResult(cls, msg) {
    var r = $("result");
    r.className = "result " + cls;
    r.textContent = msg;
  }

  function normalize(text) {
    return text.trim().toLowerCase();
  }

  async function sha256(text) {
    var buf = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(text));
    return Array.from(new Uint8Array(buf)).map(function (b) { return b.toString(16).padStart(2, "0"); }).join("");
  }

  async function checkFlag() {
    var guess = $("f").value.trim();
    if (!guess) { showResult("bad", "Type a flag first."); return; }
    if (!(window.crypto && crypto.subtle)) {
      showResult("bad", "Your browser can't check flags here. Open this page over https and try again.");
      return;
    }
    if (await sha256(normalize(guess)) === FLAG_HASH) {
      showResult("ok", "Correct! You geolocated the photo.");
      $("solved").classList.remove("hidden");
    } else {
      showResult("bad", "Not quite. Double-check the format: underscores instead of spaces, no commas, abbreviated direction and street type, two-letter state code.");
    }
  }

  $("check").addEventListener("click", checkFlag);
  $("f").addEventListener("keydown", function (e) { if (e.key === "Enter") checkFlag(); });

  // ---------- Hints (2 total, no answer reveal) ----------
  var hints = 0;
  var hintBtn = $("hintBtn");
  hintBtn.addEventListener("click", function () {
    if (hints < 2) {
      hints++;
      $("h" + hints).classList.add("show");
    }
    $("hintCount").textContent = "Hint " + hints + " of 2";
    if (hints === 2) hintBtn.disabled = true;
  });
})();