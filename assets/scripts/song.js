var Song = {
	size: 0,
	content: document.getElementById('song').value,
	currentIndex: 0,
	loops: Array(),
	masterTrack: null,
	slaveTrack: null,
	bpm: 120,
	interval: 500,
	metronome: 0,
	play: function() {
		this.content = document.getElementById('song').value;
		
		Interpreter.getBpm();
		Interpreter.getLoops();
		this.size = Interpreter.getSongSize();

		clearInterval(this.masterTrack);
		this.masterTrack = setInterval(Interpreter.readSong, this.interval);
		console.log('[Playng song with ' + this.bpm + ' bpm]');
	},

	stop: function() {
		clearInterval(this.masterTrack);
		console.log('[Stopped]');									
	},

	solo: function(sound) {
		$('.instrument').each(function() {
			if($(this).attr('id') != sound) {
				soundManager.toggleMute($(this).attr('id'));
			}
		});
	},

	volume: function(element, sound) {
		soundManager.setVolume(sound, $(element).val());
	},

	mute: function(sound) {
		soundManager.toggleMute(sound);
	},
	getParameter: function(sParam) {
		var sPageURL = window.location.search.substring(1);
		var sURLVariables = sPageURL.split('&');

		for (var i = 0; i < sURLVariables.length; i++) {
			var sParameterName = sURLVariables[i].split('=');
			if (sParameterName[0] == sParam) {
        		return sParameterName[1];
			}
		}
	}
};