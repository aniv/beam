/**
 * Pushes article set to pscribe; returns duplicate status from pscribe db
 * 
*/
function saveArticles(articles, start, type, prismatic_end_points, statistics) {
	var pscribe = 'http://pscribe.aws.af.cm/save'
	var post = new XMLHttpRequest();
	// 1 - send resp to end-point
	post.open("POST", pscribe, true);
	post.setRequestHeader("Content-type","application/json");
	post.send(JSON.stringify(articles));

	// 2 - parse pscribe response
	post.onreadystatechange = function() {
	  if (post.readyState == 4) {
		var postResult = JSON.parse(post.responseText);
		if (postResult.Status == 'OK')
		{
			// console.log('save articles returning true');
			// console.log('Was told there are more articles');
			// If there are more articles, fetch them
			if (typeof articles.next != "undefined") {  
				var start = articles.next['query-params'].start;
				// console.log('Enqueuing call to '+ prismatic_end_points[type] + 'with start: '+start);
				fetchArticles(start, type, prismatic_end_points, statistics);
			}
			// console.log('articles response next object');
			// console.log(articles);
			// console.log(articles.next);
			// Track the number of articles saved
			if (typeof statistics[type] == 'undefined')
				statistics[type] = articles.docs.length;
			else
				statistics[type] += articles.docs.length;
		}
		else {
			// console.log('save articles returning false');
			// Hit duplicates, so let's pack up and report back..
			document.getElementById(type).innerText = statistics[type];
			return; // duplicate set
		}
  	  }
    }
}

/**
 * Pulls article sets from Prismatic recursively given a start offset (0 default) and an article set type ('saved', 'shared' or 'recommended')
 *
*/
function fetchArticles(start, type, prismatic_end_points, statistics) {
	var xhr = new XMLHttpRequest();
	var url = prismatic_end_points[type] + (start != 0 ? '?start='+start : '');
	xhr.open("GET", url, true);
	xhr.onreadystatechange = function() {
	  if (xhr.readyState == 4) {
	    // JSON.parse does not evaluate the attacker's scripts.
	    var respObj = JSON.parse(xhr.responseText);
		
		// Save the articles; and see if we need to proceed (hit a duplicate article or not)
		saveArticles(respObj, start, type, prismatic_end_points, statistics)
	  }
	}
	xhr.send();
}

(function(){
	var statistics = {}
	statistics.shared = 0;
	statistics.recommended = 0;
	statistics.saved = 0;
	
	var prismatic_end_points = {}
	prismatic_end_points.shared = 'http://api.getprismatic.com/news/shared';
	prismatic_end_points.recommended = 'http://api.getprismatic.com/news/recommended';
	prismatic_end_points.saved = 'http://api.getprismatic.com/news/saved';
	
	fetchArticles(0, 'shared', prismatic_end_points, statistics);
	fetchArticles(0, 'recommended', prismatic_end_points, statistics);
	fetchArticles(0, 'saved', prismatic_end_points, statistics);
	
}());