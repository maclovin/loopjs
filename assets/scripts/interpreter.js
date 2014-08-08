var Interpreter = {
	songTracks: Array(),

	getBpm: function() {
		var songCode = Song.content.split("\n");
		Song.bpm = songCode[0];
		songCode.splice(0,1);
		Song.content = songCode.join("\n");
		Song.interval = Math.round(1/(Song.bpm/60*1*0.001))
	},

	getLoops: function() {
		var songTrack = Array();

		// Reseting loops library
		Song.loops = Array();

		// Spliting tracks in code
		this.songTracks = Song.content.split("\n");
		
		// Creating a track
		for (i = 0; i < this.songTracks.length; i++) {
			songTrack = this.songTracks[i].split(" ");

			// Cleaning actual track
			if (songTrack.indexOf("") !== -1) {
				songTrack.splice(songTrack.indexOf(""));
			};

			// Inserting actual track in loops library
			Song.loops.push(songTrack);
		};	

	},

	getSongSize: function() {
		var songSize = 0;

		for (var i = 0; i < Song.loops.length; i++) {
			if (songSize < Song.loops[i].length) {
				songSize = Song.loops[i].length
			}; 
		};

		return songSize;
	},

	playSlave: function(beat) {
		var beats = beat.split(''),
			currentBeat = 0;

		if (beats.length == 2) {
			
			setTimeout(function() {
				soundManager.play(beats[currentBeat]);
			}, 0);

			setTimeout(function() {
				soundManager.play(beats[currentBeat+1]);
			}, (Song.interval/beat.length) );

		} else if (beats.length == 4) {

			setTimeout(function() {
				soundManager.play(beats[currentBeat]);
			}, 0);	

			setTimeout(function() {
				soundManager.play(beats[currentBeat+1]);
			}, (Song.interval/beat.length) );

			setTimeout(function() {
				soundManager.play(beats[currentBeat+2]);
			}, (Song.interval/beat.length)*2 );

			setTimeout(function() {
				soundManager.play(beats[currentBeat+3]);
			}, (Song.interval/beat.length)*3 );

		}
	},

	readSong: function() {
		//Metronome animation
		if (Song.metronome < 4) {
			Song.metronome++;
		} else {
			Song.metronome = 1;
		}

		$('.metronome li').css('background-color', '#666');
		$('.metronome li:nth-child('+Song.metronome+')').css('background-color', '#F66');

		if (Song.currentIndex+1 < Song.size) {
			// Reading loops columns
			for (var i = 0; i < Song.loops.length; i++) {
				if (Song.loops[i][Song.currentIndex] && Song.loops[i][Song.currentIndex] != '.') {

					// Verifing beat size > 1 and splitting interval
					if (Song.loops[i][Song.currentIndex].length > 1) {
						Interpreter.playSlave(Song.loops[i][Song.currentIndex]);
					}
					else {
						soundManager.play(Song.loops[i][Song.currentIndex]);
					}
				}
			};

			Song.currentIndex++;
		} else {
			for (var i = 0; i < Song.loops.length; i++) {
				// Verifing beat size > 1 and splitting interval
				if (Song.loops[i][Song.currentIndex]) {
					if (Song.loops[i][Song.currentIndex].length > 1) {
						Interpreter.playSlave(Song.loops[i][Song.currentIndex]);
					}
					else {
						soundManager.play(Song.loops[i][Song.currentIndex]);
					}
				}
			};

			Song.currentIndex = 0;
		};
	},
};