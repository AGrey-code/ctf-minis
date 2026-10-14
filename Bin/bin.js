(function () {
  "use strict";
 
  // SHA-256 of the correct flag. The flag text itself is not stored here,
  // but the simulated program does print it on success, same as a real binary would.
  var FLAG_HASH = "c595f2ef9e6ac4ce3fccc993a9ca002d20dc594ae89e6688732c3686be10a86c";
  var FLAG = "CTF{st4ck_sm4sh_101}"; // printed by the simulated program on success
 
  var BUFFER_SIZE = 8;
  var AUTH_SIZE = 4; // bytes in a 32-bit int
 
  var $ = function (id) { return document.getElementById(id); };
  var esc = function (s) {
    return String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  };
 
  // ---------- Terminal state ----------
  var term = {
    log: $("termLog"),
    input: $("termInput"),
    promptLabel: $("termPromptLabel"),
    mode: "command", // "command" | "awaiting_name"
    files: {
      "login.c": true,
      "login": true
    }
  };
 
  function printLine(cls, text) {
    var div = document.createElement("div");
    div.className = "line " + cls;
    div.textContent = text;
    term.log.appendChild(div);
    term.log.parentElement.scrollTop = term.log.parentElement.scrollHeight;
  }
  function printPrompt(cmd) {
    var div = document.createElement("div");
    div.className = "line prompt";
    div.textContent = "$ " + cmd;
    term.log.appendChild(div);
  }
 
  function setMode(mode) {
    term.mode = mode;
    term.promptLabel.textContent = mode === "awaiting_name" ? "name>" : "$";
  }
 
  function showHelp() {
    printLine("sys", "Available commands:");
    printLine("sys", "  help            show this help");
    printLine("sys", "  ls              list files");
    printLine("sys", "  cat <file>      print a file's contents");
    printLine("sys", "  ./login         run the login program");
    printLine("sys", "  clear           clear the terminal");
  }
 
  function catLoginC() {
    printLine("out", "#include <stdio.h>");
    printLine("out", "#include <string.h>");
    printLine("out", "");
    printLine("out", "int main() {");
    printLine("out", "    char buffer[8];");
    printLine("out", "    int  authorized = 0;");
    printLine("out", "");
    printLine("out", '    printf("=== Login System v1.0 ===\\n");');
    printLine("out", '    printf("Enter your name: ");');
    printLine("out", "    gets(buffer);");
    printLine("out", "");
    printLine("out", "    if (authorized) {");
    printLine("out", '        printf("Welcome, authorized user!\\n");');
    printLine("out", "        // ... prints the flag ...");
    printLine("out", "    } else {");
    printLine("out", '        printf("Access denied. (authorized = %d)\\n", authorized);');
    printLine("out", "    }");
    printLine("out", "    return 0;");
    printLine("out", "}");
  }
 
  function runCommand(raw) {
    var cmd = raw.trim();
    printPrompt(raw);
    if (cmd === "") return;
 
    if (cmd === "help") { showHelp(); return; }
    if (cmd === "ls") { printLine("out", "login  login.c"); return; }
    if (cmd === "clear") { term.log.innerHTML = ""; return; }
    if (cmd === "cat login.c" || cmd === "cat login.c ") { catLoginC(); return; }
    if (cmd.indexOf("cat ") === 0) {
      var f = cmd.slice(4).trim();
      if (f === "login") { printLine("bad", "cat: login: binary file (use ./login to run it)"); }
      else { printLine("bad", "cat: " + f + ": No such file or directory"); }
      return;
    }
    if (cmd === "./login" || cmd === "login") {
      startLogin();
      return;
    }
    printLine("bad", cmd.split(" ")[0] + ": command not found. Type 'help' for a list of commands.");
  }
 
  // ---------- The simulated program ----------
  function startLogin() {
    printLine("out", "=== Login System v1.0 ===");
    printLine("out", "Enter your name: ");
    setMode("awaiting_name");
    showStack();
    renderStack("");
  }
 
  function showStack() { $("stackwrap").classList.remove("hidden"); }
 
  function renderStack(input) {
    var cellsEl = $("stackCells");
    var labelsEl = $("stackLabels");
    cellsEl.innerHTML = "";
    labelsEl.innerHTML = "";
 
    var total = BUFFER_SIZE + AUTH_SIZE;
    var authBytes = [0, 0, 0, 0];
 
    for (var i = 0; i < total; i++) {
      var cell = document.createElement("div");
      cell.className = "cell";
      var ch = input[i];
 
      if (ch !== undefined) {
        cell.textContent = ch === " " ? "\u2423" : ch;
        cell.className += i < BUFFER_SIZE ? " fill" : " overflow";
        if (i >= BUFFER_SIZE) authBytes[i - BUFFER_SIZE] = input.charCodeAt(i);
      }
      cellsEl.appendChild(cell);
 
      var label = document.createElement("div");
      label.className = "celllabel";
      label.textContent = i < BUFFER_SIZE ? "b" + i : "a" + (i - BUFFER_SIZE);
      labelsEl.appendChild(label);
    }
 
    // little-endian 32-bit int from the 4 overflow bytes
    var authValue = authBytes[0] + (authBytes[1] << 8) + (authBytes[2] << 16) + (authBytes[3] << 24);
    $("authVal").textContent = authValue;
  }
 
  function submitName(name) {
    printLine("out", "name> " + name);
    renderStack(name);
 
    var overflow = Math.max(0, name.length - BUFFER_SIZE);
    var authorized = false;
    if (overflow > 0) {
      var firstOverflowByte = name.charCodeAt(BUFFER_SIZE);
      authorized = firstOverflowByte !== 0; // any real keyboard character is non-zero
    }
 
    if (authorized) {
      printLine("ok-line", "Welcome, authorized user!");
      printLine("ok-line", "FLAG: " + FLAG);
      revealSolved();
    } else {
      printLine("bad", "Access denied. (authorized = 0)");
    }
    setMode("command");
  }
 
  function revealSolved() {
    $("solved").classList.remove("hidden");
  }
 
  // custom colors for program output lines
  var style = document.createElement("style");
  style.textContent = ".line.ok-line{color:#7be0a6}";
  document.head.appendChild(style);
 
  term.input.addEventListener("keydown", function (e) {
    if (e.key !== "Enter") return;
    var val = term.input.value;
    term.input.value = "";
    if (term.mode === "awaiting_name") {
      submitName(val);
    } else {
      runCommand(val);
    }
  });
 
  // live memory view updates as the user types, before pressing Enter
  term.input.addEventListener("input", function () {
    if (term.mode === "awaiting_name") {
      renderStack(term.input.value);
    }
  });
 
  printLine("sys", "Connected to login-server. Type 'help' to get started.");
 
  // ---------- Flag checker ----------
  function showResult(cls, msg) {
    var r = $("result");
    r.className = "result " + cls;
    r.textContent = msg;
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
    if (await sha256(guess) === FLAG_HASH) {
      showResult("ok", "Correct! You spilled your input into the neighbor variable.");
      revealSolved();
    } else {
      showResult("bad", "Not quite. Did the program print 'Welcome, authorized user!'? Copy the flag from its output.");
    }
  }
 
  $("check").addEventListener("click", checkFlag);
  $("f").addEventListener("keydown", function (e) { if (e.key === "Enter") checkFlag(); });
 
  // ---------- Hints ----------
  var hints = 0;
  var hintBtn = $("hintBtn");
  hintBtn.addEventListener("click", function () {
    if (hints < 4) {
      hints++;
      $("h" + hints).classList.add("show");
    }
    $("hintCount").textContent = "Hint " + hints + " of 4";
    if (hints === 3) hintBtn.textContent = "Show the answer";
    if (hints === 4) hintBtn.disabled = true;
  });
})();