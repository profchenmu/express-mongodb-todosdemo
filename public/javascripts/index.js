$('.btn').on('click', function(event) {
	event.preventDefault();
	var todoName = $('.todo-name').val();
	$.ajax({
		url: '/',
		type: 'POST',
		dataType: 'json',
		data: {todoname: todoName},
		success: function(){
			console.log('cao')
		}
	});
});

$('.todo-item').on('keyup blur', function(event) {
	$(event.currentTarget)
		.removeClass('active')
		.addClass('disactive');
	if(event.key === 'Enter' || event.type === 'blur'){
		var todoName = $(event.currentTarget).val(),
			_id = $(event.currentTarget).parent('.item-group').data('_id');
		$.ajax({
			url: '/itemname',
			type: 'PUT',
			dataType: 'json',
			data: {
				_id: _id,
				todoname: todoName
			},
			success: function(){
				console.log(todoName)
			}
		});
	}
});
$('.tonggle-all').on('click', function(event) {
	var showAll = $(event.currentTarget).prop('checked');
	$('.item-group.done').toggle();
});

$('.todo-item').on('focus', function(event) {
	$(event.currentTarget)
		.removeClass('disactive')
		.addClass('active');
});

$('.item-remove').on('click', function(event) {
	var _id = $(event.currentTarget).parent('.item-group').data('_id');
	$.ajax({
		url: '/del',
		type: 'DELETE',
		dataType: 'json',
		data: {
			_id: _id
		},
		success: function(msg){
			$('.item-group[data-_id='+ msg._id +']').remove();
		}
	});
});

$('.todo-done').on('click', function(event) {
	var itemDone = $(event.currentTarget).prop('checked') ? 1 : 0,
		_id = $(event.currentTarget).parent('.item-group').data('_id');
	$.ajax({
		url: '/itemdone',
		type: 'PUT',
		dataType: 'json',
		data: {
			_id: _id,
			itemdone: itemDone
		},
		success: function(){
			if(itemDone===1){
				$(event.currentTarget).next('.todo-item')
					.attr('disabled', 'disabled')
					.removeClass('undone')
					.addClass('done');
				$(event.currentTarget).parent('.item-group').addClass('done');
				if($('.tonggle-all').prop('checked')===false){
					$(event.currentTarget).parent('.item-group').hide();
				}
			}else{
				$(event.currentTarget).next('.todo-item')
					.removeAttr('disabled')
					.removeClass('done')
					.addClass('undone');
				$(event.currentTarget).parent('.item-group').removeClass('done');
			}
		}
	});
});