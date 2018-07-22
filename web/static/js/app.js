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
			url: '/get/api/'+val,
			type: 'GET',
			dataType: 'json',
			success: function(res){
				if (res != "") {
					$('#typing').fadeOut(100);
					$('#result_div').html('');
					$.each(res, function(x, y){
						$('#search_label').fadeIn(500);
						$('#search_result_label').html(val);
						$('#result_div').append(`
							<li class="media" style="border: 2px solid #34495e; margin: 4px 4px 4px 4px; padding: 4px 4px 4px 4px;" data-attr-name="`+res[x][0]+`" data-attr-desc="`+res[x][1]+`" data-attr-img="`+res[x][2]+`" data-attr-status="`+res[x][3]+`" data-attr-media_type="`+res[x][4]+`" data-attr-score="`+res[x][5]+`">
								<a href="#">
									<div class="media-left">
										<a href="#" >
											<img class="media-object" src="`+res[x][2]+`" style="width: 100px; height: 100px;" alt="...">
										</a>
									</div>
									<div class="media-body">
										<h4 class="media-heading">`+res[x][0]+`</h4>
										<small>
											`+res[x][3]+`
										</small>
										<br/>
										<small>Rating: `+res[x][5]+`</small>
										<br/>
										<small>`+res[x][1]+`</small>
									</div>
								</a>
							</li>
						`)
					})
					onclick()
				}
				else {
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
												<small>`+res.categories[0].items[x].url+`</small>
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

		var csrf = document.querySelector("meta[name=csrf]").content;
		console.log(csrf);
		var data = {
			"name": $(this).attr('data-attr-name'),
			"ref_url": $(this).attr('data-attr-desc'),
			"thumbnail_url": $(this).attr('data-attr-thumb'),
			"status": $(this).attr('data-attr-status'),
			"score": $(this).attr('data-attr-score'),
			"img_url": $(this).attr('data-attr-img'),
			"img_src": $(this).attr('data-attr-img'),
			"details": $(this).attr('data-attr-media_type'),
			"details": get_date(),
			"details": get_date(),
		}

		$.ajax({
			url: 'add/',
			type: 'POST',
			data: {
				anime : data
			},
		    headers: {
		        "X-CSRF-TOKEN": csrf 
		    },
			dataType: 'json',
			success: function(res) {
				console.log(res)
			}
		})
	});
}

function get_date() {
	var today = new Date();
	var dd = today.getDate();
	var mm = today.getMonth()+1; //January is 0!
	var yyyy = today.getFullYear();

	if(dd<10) {
	    dd = '0'+dd
	} 

	if(mm<10) {
	    mm = '0'+mm
	} 

	today = yyyy+'-'+mm+'-'+dd;
	return today;
}

// Import local files
//
// Local files can be imported directly using relative
// paths "./socket" or full ones "web/static/js/socket".

// import socket from "./socket"
