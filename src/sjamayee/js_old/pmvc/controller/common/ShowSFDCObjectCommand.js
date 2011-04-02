//Abstract
var ShowSFDCObjectCommand = function() {
  this.Extends = SimpleCommand;
	this.execute = function(note) {
		//alert("ShowSFDCObjectCommand");
		try {
      //mediator.setMessageText("SFDC Object viewed!");
		} catch(error) {
			Utils.alert("ShowSFDCObjectCommand - error: "+error.message,Utils.LOG_LEVEL_ERROR);
		}
	};
};
ShowSFDCObjectCommand = new Class(new ShowSFDCObjectCommand());
