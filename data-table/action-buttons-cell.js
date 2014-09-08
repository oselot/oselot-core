define([
	'core/hooks/hooks',
	'backgrid'
], function(
	hooks
){
	var cell = Backgrid.Cell.extend({
		className: 'action-buttons',

		defaultButtons: ['edit', 'delete'],

		_defaultButtons: {
			'edit': {
				extraClasses: 'btn-primary',
				label: 'Edit',
				icon: 'glyphicon glyphicon-pencil',
				onClick: 'edit'
			},
			'delete': {
				extraClasses: 'btn-danger',
				label: 'Delete',
				icon: 'glyphicon glyphicon-remove-circle',
				onClick: 'delete'
			}
		},

		edit: function(){
			this.Mediator.trigger('edit-' + this.resourceName, this.model);
		},

		'delete': function(){
			if(confirm("You Sure?")) {
				this.model.destroy();
			}
		},

		render: function(){
			this.buttons = this.buttons || {};

			var buttons = {};

			_(this.defaultButtons).each(function(button){
				buttons[button] = this._defaultButtons[button];
			}, this);

			this.buttons = _(buttons).extend(this.buttons);

			_(this.buttons).each(function(options, className){
				var $button = $(
					'<button class="btn btn-xs ' + 
						className + ' ' + options.extraClasses + '">' + 
					'<i class="' + options.icon  + '"></i>' +
					'</button>'
				).tooltip({
					title: options.label,
					container: 'body'
				}).on('click', function(){
					this[options.onClick].apply(this);
				}.bind(this));


				this.$el.append($button);
			}, this);

			return this;
		}
	});

	return hooks.mixInto(cell);
})