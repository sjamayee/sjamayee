//Abstract
var ResetViewCommand = function() {
  this.Extends = SimpleCommand;
  this.mediator = null;
  this.percent = 35;
  
	this.execute = function(note) {
		//alert("ResetViewCommand - percent: "+this.percent);
    this.mediator = note.getBody();
		var gridList = this.mediator.getViewComponent();
		var gridSplitter = null;
		var listPaneLeft = null;
		try {
			if (dijit) {
				gridSplitter = dijit.byId(SjamayeeForm.LIST_SPLITTER_ID);     //TODO: SjamayeeForm
				listPaneLeft = dijit.byId(SjamayeeForm.LIST_PANE_LEFT_ID);
				if ((listPaneLeft !== undefined) && (listPaneLeft !== null)) {
					listPaneLeft.attr("style","width:"+this.percent+"%;");
					listPaneLeft.attr("sizeShare",this.percent);
				}
			}
      this.mediator.setMessageText("View reset.");
		} catch(error) {
			Utils.alert("ResetViewCommand - error: "+error.message,Utils.LOG_LEVEL_ERROR);
		} finally {
			if ((gridSplitter !== undefined) && (gridSplitter !== null)) {
				gridSplitter.resize();
			}
		}
	};
};
ResetViewCommand = new Class(new ResetViewCommand());
