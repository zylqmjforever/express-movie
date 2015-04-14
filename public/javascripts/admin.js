$(function () {
	$('.del').click(function (e) {
		var target = $(e.target),
			id = target.data('id'),
			tr = target.closest('tr');
		$.ajax({
			type: 'DELETE',
			url: '/admin/list?id=' + id
		})
		.done(function(results) {
			if (results.success === 1) {
				if (tr.length > 0) {
					tr.remove();
				}
			}
		});
	});
});