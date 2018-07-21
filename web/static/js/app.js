// Brunch automatically concatenates all files in your
// watched paths. Those paths can be configured at
// config.paths.watched in "brunch-config.js".
//
// However, those files will only be executed if
// explicitly imported. The only exception are files
// in vendor, which are never wrapped in imports and
// therefore are always executed.

// Import dependencies
//
// If you no longer want to use a dependency, remember
// to also remove its path from "config.paths.watched".
import "phoenix_html"
import $ from "jquery"
import {Socket, Presence} from "phoenix"

$('#search_input').keyup(function(e){
	var val = $(this).val();
	if (e.keyCode == 13) {
		$.ajax({
			url: '/api',
			type: 'GET',
			dataType:'json',
			success: function(res){
				$.each(res, function(x, y){
					if (~res[x][0].indexOf(val)) {
						$('#result_div').append(`
							<li class="media">
								<div class="media-left">
								<a href="#">
									<img class="media-object" src="https://myanimelist.cdn-dena.com/r/116x180/images/anime/2/18690.jpg?s=c5d374dcd236ef4de60c11c40c0cfebd" style="width: 100px; height: 100px;" alt="...">
								</a>
								</div>
								<div class="media-body">
									<h4 class="media-heading">`+res[x][0]+`</h4>
									<small>
										`+res[x][2]+`
									</small>
								</div>
							</li>
						`)
					}
					else {
						console.log('no results');
					}
				})
			}
		})
	}
})
// Import local files
//
// Local files can be imported directly using relative
// paths "./socket" or full ones "web/static/js/socket".

// import socket from "./socket"
