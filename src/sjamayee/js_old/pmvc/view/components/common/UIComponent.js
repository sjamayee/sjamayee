//Abstract
var UIComponent = function() {
  this.initialized = false;
  this.element = null;
	
  this.initialize = function(element, properties) {
	//alert("UIComponent/initialize - element: "+element);
		this.element = $(element);
	//this.element = document.id(element);
	//this.element = document.getElementById(element);

	//alert("Element - element: "+this.element+" "+this.element.toString());
		if (!this.element)
			this.element = new Element(element, properties);
		else
			this.element.setProperties(properties);

		//Copy methods of the Element object to 'this' and bind the functions to the element itself.
		//This creates a transparent wrapper in the UIComponent for each method of the Element.
		var e = this.element;
		for (var key in e) {
			var type = null;
			try	{
				//IE 7+ has a problem with this sometimes.
				type = typeof e[key];
			}	catch(e){ } //alert("UIComponent/initialize - IE7 - e: "+e.message); }   	//TODO: SILENT CATCH !!!
			if (type == "function" && !this[key]) {
				try	{
					//Safari has trouble here with some function binding
					this[key] = e[key].bind(e);
				}
				catch(e){ } //alert("UIComponent/initialize - Safari - e: "+e.message); }	//TODO: SILENT CATCH !!!
			}
		}
  };

  this.initializeChildren = function(){};
  this.childrenInitialized = function(){};
  this.initializationComplete = function() {
	//alert("UIComponent/initializationComplete - element: "+this.element.id);
	  this.initialized = true;
  };

  this.addChild = function(child) {
	//alert("UICompoment/addChild - child: "+child);
		this.grab(child.element);
		//Initialize child
  	child.initializeChildren();
  	child.childrenInitialized();
  	child.initializationComplete();
  	//Fire an added event
  	child.fireEvent("added");
  	return this;
  };
};
UIComponent = new Class(new UIComponent());
