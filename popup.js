var statistics = {}

var xhr_shared = new XMLHttpRequest();
xhr_shared.open("GET", "http://api.getprismatic.com/news/shared", true);
xhr_shared.onreadystatechange = function() {
  if (xhr_shared.readyState == 4) {
    // JSON.parse does not evaluate the attacker's scripts.
    var resp = JSON.parse(xhr_shared.responseText);
	statistics.shared = resp.docs.length;
	document.getElementById('shared').innerText = statistics.shared;
	console.log("Shared articles");
	console.log(resp);
  }
}

var xhr_recommended = new XMLHttpRequest();
xhr_recommended.open("GET", "http://api.getprismatic.com/news/recommended", true);
xhr_recommended.onreadystatechange = function() {
  if (xhr_recommended.readyState == 4) {
    // JSON.parse does not evaluate the attacker's scripts.
    var resp = JSON.parse(xhr_recommended.responseText);
	statistics.recommended = resp.docs.length;
	document.getElementById('recommended').innerText = statistics.recommended;
	console.log("Recommended articles");
	console.log(resp);
  }
}

var xhr_saved = new XMLHttpRequest();
xhr_saved.open("GET", "http://api.getprismatic.com/news/saved", true);
xhr_saved.onreadystatechange = function() {
  if (xhr_saved.readyState == 4) {
    // JSON.parse does not evaluate the attacker's scripts.
    var resp = JSON.parse(xhr_saved.responseText);
	statistics.saved = resp.docs.length;
	document.getElementById('saved').innerText = statistics.saved;
	console.log("Saved articles");
	console.log(resp);
  }
}

xhr_shared.send();
xhr_recommended.send();
xhr_saved.send();
