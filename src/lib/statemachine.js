StateMachine = (function() {
	function StateMachine(target) {
		this.target = target;
		this.currentStates = [];
		this.nextStates = [];
		this.currentState = null;
		this.nextState = null;
		this.yield = false;
		this.exit = false;
	}

	StateMachine.prototype.init = function() {
		this.currentStates = [];
		this.nextStates = [];
	}

	StateMachine.prototype.exec = function() {
		this.currentStates = this.nextStates;
		this.nextStates = [];

		var length = this.currentStates.length;
		for (var i = 0; i < length; ++i) {
			var state = this.currentStates[i];
			this.yield = false;
			this.exit = false;
			this.nextState = null;

			this.currentState = state;
			this.currentState.call(this.target);
//      cc.log(this.currentState);

			if (this.exit)
				continue;

			while (this.nextState !== null && !this.yield) {
				this.currentState = this.nextState;
				this.nextState = null;
				this.currentState.call(this.target);
//        cc.log(this.currentState);

				if (this.exit)
					break;
			}

			if (this.exit)
				continue;

			this.nextStates.push(
				this.nextState !== null ? this.nextState : this.currentState);
		}
	}

	StateMachine.prototype.spawn = function(func) {
		this.nextStates.push(func);
	}

	StateMachine.prototype.switchTo = function(func) {
		this.nextState = func;
		this.yield = false;
		this.isPause = false;
	}

	StateMachine.prototype.yieldTo = function(func) {
		this.nextState = func;
		this.yield = true;
		this.isPause = false;
	}

	StateMachine.prototype.exit = function(func) {
		this.exit = true;
	}

	return StateMachine;
})();
