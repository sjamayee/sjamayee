var StartupCommand = function() {
  this.Extends = MacroCommand;
	this.initializeMacroCommand = function(note) {		
	//alert("StartupCommand");
	  this.addSubCommand(PrepModelCommand);
	  this.addSubCommand(PrepViewCommand);
	//this.addSubCommand(PrepDataModelCommand);
	//this.addSubCommand(PrepDataViewCommand);
	//this.addSubCommand(PrepModelModelCommand);
	//this.addSubCommand(PrepModelViewCommand);
	};
};
StartupCommand = new Class(new StartupCommand());
