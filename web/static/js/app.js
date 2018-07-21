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
	$('#typing').fadeIn(100);
	$('#waiting').fadeOut(100);
	if (e.keyCode == 13) {
		$.ajax({
			url: '/get/poison/'+val,
			type: 'GET',
			dataType: 'json',
			success: function(res){
				$('#typing').fadeOut(100);
				$('#result_div').html('');
				$.each(res.categories[0].items, function(x, y){
					$('#search_label').fadeIn(500);
					$('#search_result_label').html(val);
					$('#result_div').append(`
						<li class="media check_details" style="border: 2px solid #34495e; margin: 4px 4px 4px 4px; padding: 4px 4px 4px 4px;" data-attr-name="`+res.categories[0].items[x].name+`" data-attr-desc="`+res.categories[0].items[x].url+`" data-attr-img="`+res.categories[0].items[x].image_url+`" data-attr-status="`+res.categories[0].items[x].payload.status+`" data-attr-media_type="`+res.categories[0].items[x].payload.media_type+`" data-attr-score="`+res.categories[0].items[x].payload.score+`">
							<a href="#">
								<div class="media-left">
									<a href="#" >
										<img class="media-object" src="`+res.categories[0].items[x].thumbnail_url+`" style="width: 100px; height: 100px;" alt="...">
									</a>
								</div>
								<div class="media-body">
									<h4 class="media-heading">`+res.categories[0].items[x].name+`</h4>
									<small>
										`+res.categories[0].items[x].payload.status+`
									</small>
									<br/>
									<small>Rating: `+res.categories[0].items[x].payload.score+`</small>
									<br/>
									<small><button class="view btn btn-sm btn-info">View</button</small>
								</div>
							</a>
						</li>
					`)
				})
				onclick()
			},
			error: function() {
				$('#result_div').html('Error found or No results found.');
			}
		})
	}
	else if($(this).val() == '') {
		$('#typing').fadeOut(100);
		$('#waiting').fadeIn(100);
		$('#search_label').fadeOut(500);
		$('#result_div').html('');
	}
})

function onclick() {
	$('.check_details').on('click', function(e){
		$('#more_details').html(`
			<div class="col-md-12">
				<img class="img img-responsive" src="`+$(this).attr('data-attr-img')+`" style="margin-top: 164px; border: 1px 1px 1px 1px solid #34495e; height:550px; width: 600px;">
			</div>
			<div class="col-md-12">
				<hr>
				<span class="badge">`+$(this).attr('data-attr-media_type')+`</span>
				<h4>`+$(this).attr('data-attr-name')+` </h4>
				<h4> `+$(this).attr('data-attr-status')+`</h4>
				<h4> more details at <a href="`+$(this).attr('data-attr-desc')+`" class="btn btn-link">My Anime List Page</a></h4>
			</div>
			`)
	});
}

// Import local files
//
// Local files can be imported directly using relative
// paths "./socket" or full ones "web/static/js/socket".

// import socket from "./socket"
