var Keys = {
	48: '0',
	49: '1',
	50: '2',
	51: '3',
	52: '4',
	53: '5',
	54: '6',
	55: '7',
	56: '8',
	57: '9',
	65: 'A`',
	66: 'B',
	67: 'C',
	68: 'D',
	69: 'E',
	70: 'F',
	71: 'G',
	72: 'H',
	73: 'I',
	74: 'J',
	75: 'K',
	76: 'L',
	77: 'M',
	78: 'N',
	79: 'O',
	80: 'P',
	81: 'Q',
	82: 'R',
	83: 'S',
	84: 'T',
	85: 'U',
	86: 'V',
	87: 'W',
	88: 'X',
	89: 'Y',
	90: 'Z',
	96: '0',
	97: '1',
	98: '2',
	99: '3',
	100: '4',
	101: '5',
	102: '6',
	103: '7',
	104: '8',
	105: '9',
	113 : 'q',
	119 : 'w',
	101 : 'e',
	114 : 'r',
	116 : 't',
	121 : 'y',
	117 : 'u',
	105 : 'i',
	111 : 'o',
	112 : 'p',
	97 : 'a',
	115 : 's',
	100 : 'd',
	102 : 'f',
	103 : 'g',
	104 : 'h',
	106 : 'j',
	107 : 'k',
	108 : 'l',
	122 : 'z',
	120 : 'x',
	99 : 'c',
	118 : 'v',
	98 : 'b',
	110 : 'n',
	109 : 'm'
};

(function() {
	soundManager.flashVersion = (window.location.toString().match(/#flash8/i)?8:9);
	if (soundManager.flashVersion != 8) {
			soundManager.useHighPerformance = true;
	}

	soundManager.setup({
			bgColor: '#333333',
			wmode: 'transparent',
			debugMode: false,
			preferFlash: false,
			html5PollingInterval: 50,
    isBuffering: true,
    autoLoad: true,
    stream: true,
			onready: function() {
				    soundManager.setup({
  					defaultOptions: {
    					autoLoad: true,
    					multiShot: true
  					}
				});
			}
		});

		// Your instrument kit here!
		var kitName = Song.getParameter('kit') || '808/',
			kitPath = Song.getParameter('external') || 'kits/' + kitName;

		$.getJSON(kitPath + 'kit.json', function(data) {
			Song.instrument = data;

			for (var i = 0; i < data.kit.length; i++) {
				soundManager.createSound(data.kit[i].ref, kitPath + data.kit[i].file);

				document.getElementById('mixer').innerHTML += '<div id="'+data.kit[i].ref+'" class="instrument"><button class="btn" onclick="soundManager.play(\''+data.kit[i].ref+'\')" >'+data.kit[i].ref+'</button><p><input type="range" onchange="Song.volume(this, \''+data.kit[i].ref+'\');" class="volume" min="0" max="100" data-id="'+data.kit[i].ref+'"></p><button class="btn-mute" data-id="'+data.kit[i].ref+'" onclick="Song.mute(\''+data.kit[i].ref+'\');">On/Off</button><button onclick="Song.solo(\''+data.kit[i].ref+'\');" class="btn-solo" data-id="'+data.kit[i].ref+'">Solo</button></div>';
			};
		});

		// Detecting key actions
		$(document).keypress(function(key) { 
		if(!$('#song').is(":focus")) {
			console.log(key.charCode);
			soundManager.play(Keys[key.charCode]);
		}
		});
})();