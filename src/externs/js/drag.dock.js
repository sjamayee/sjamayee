/* Drag.Dock.js - Drag.Dock, an extension of Drag.Move that allows docking to a container's edge. 
   authors: Sean McArthur (http://mcarthurgfx.com) 
   license: MIT-style license 
   requires: mootools(core/1.2.1: '*'; more/1.2.1.1: [Drag, Drag.Move]
   provides: [Drag.Dock, Element.makeDockable]
   ... */
Drag.Dock = new Class({
	Extends: Drag.Move,	
	options: {
		proximity: 20
	},
	initialize: function(element, options, location) {
		this.parent(element, options);
		if (!this.options.container) {
			this.element.setStyle('position', 'fixed');
		}
	},
	drag: function(event) {
		this.parent(event);
		var container = this.dimensions();
		if (this.element.offsetTop < this.options.proximity) {
			this.dock('top');
		}
		if (this.element.offsetTop + this.element.offsetHeight > container.y - this.options.proximity) {
			this.dock('bottom');
		}
		if (this.element.offsetLeft < this.options.proximity) {
			this.dock('left');
		}
		if (this.element.offsetLeft + this.element.offsetWidth > container.x - this.options.proximity) {
			this.dock('right');
		}
	},
	dock: function(location) {
		location = location || 'top';
		var container = this.dimensions();
		switch (location) {
			case 'top':
			default:
				this.element.setStyle('top',0);
				break;
			case 'middle':
				this.element.setStyle('top', (container.y - this.element.offsetHeight) / 2);
				break;
			case 'bottom':
				this.element.setStyle('top',container.y - this.element.offsetHeight);
				break;
			case 'left':
				this.element.setStyle('left',0);
				break;
			case 'center':
				this.element.setStyle('left', (container.x - this.element.offsetWidth) / 2);
				break;
			case 'right':
				this.element.setStyle('left',container.x - this.element.offsetWidth)
				break;
		}
		this.fireEvent('dock', location);
		return this;
	},
	dimensions: function() {
		var container = $(this.options.container) || window;
		return container.getSize();
	}.protect()
});

Element.implement({
	makeDockable: function(options) {
		return new Drag.Dock(this, options);
	}
});
