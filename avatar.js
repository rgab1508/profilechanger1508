function getRandomInt(max) {
	return Math.floor(Math.random() * Math.floor(max));
}

class Avatar {
	constructor() {
		this.sprites = { 
			male: 'male',
      identicon : 'identicon',
			bottts: 'bottts',
			jdenticon :'jdenticon',
			gridy : 'gridy'
    };
    this.moods = ['happy', 'sad', 'surprised'];
		this.colors = [
			'amber',
			'blue',
			'blueGrey',
			'brown',
			'cyan',
			'deepOrange',
			'deepPurple',
			'agreenmber',
			'grey',
			'indigo',
			'lightBlue',
			'lightGreen',
			'lime',
			'orange',
			'pink',
			'purple',
			'red',
			'teal',
			'yellow'
		];
		this.colorLevel = [50, 100, 200, 300, 400, 500, 600, 700, 800, 900];
		this.sprite = '';
		this.randomSeed = getRandomInt(10000000);
		this.url = '';
		this.selectSprite();
		this.setOptionsAndUrl();
	}
	selectSprite() {
    let len = Object.keys(this.sprites).length;
    let type = Object.keys(this.sprites)[getRandomInt(len)];
    this.sprite = this.sprites[type];
		console.log(this.sprite);
	}
	setOptionsAndUrl() {
    switch(this.sprite){
      case (this.sprites.male): {
        let mood = this.moods[getRandomInt(this.moods.length)];
        this.url = `https://avatars.dicebear.com/v2/${this.sprite}/${this.randomSeed}.svg?options[mood][]=${mood}`;
        break;
      }
      case (this.sprites.identicon): {
        let rndColor = this.colors[getRandomInt(this.colors.length)];
        let rndColorLevel = this.colorLevel[getRandomInt(this.colorLevel.length)];

        this.url = `https://avatars.dicebear.com/v2/${this.sprite}/${this.randomSeed}.svg?options[colors][]=${rndColor}&options[colorLevel]=${rndColorLevel}`;
        break;
      }
      case (this.sprites.bottts): {
        let rndColor = this.colors[getRandomInt(this.colors.length)];
        let colorful = true;
        let mouthChance = Math.random() * 100;
        let sidesChance = Math.random() * 100;
        let textureChance = Math.random() * 100;
        let topChange = Math.random() * 100;
        this.url = `https://avatars.dicebear.com/v2/${this.sprite}/${this.randomSeed}.svg?options[colors][]=${rndColor}&option[mouthChance]=${mouthChance}&opiton[sidesChance]=${sidesChance}&option[textureChance]=${textureChance}&option[topChance]=${topChange}`;
        break;
      }
      /*case (this.sprites.avataaar) :{
        let hatColors = [
          'black',
          'blue',
          'gray',
          'heather',
          'pastel',
          'pink',
          'red',
          'white'
        ];
        let hairColors = [
          'auburn',
          'black',
          'blonde',
          'brown',
          'pastel',
          'platinum',
          'red',
          'gray'
        ];
        let clothss = ['blazer', 'sweater', 'shirt', 'hoodie', 'overall'];
        let eyess = [
          'close',
          'cry',
          'default',
          'dizzy',
          'roll',
          'happy',
          'hearts',
          'side',
          'squint',
          'surprised',
          'wink',
          'winkWacky'
        ];
        let hatColor = hatColors[getRandomInt(hatColors.length)];
        let hairColor = hairColors[getRandomInt(hairColors.length)];
        let cloths = clothss[getRandomInt(clothss.length)];
        let eyes = eyess[getRandomInt(eyess.length)];

        this.url = `https://avatars.dicebear.com/v2/${this.sprite}/${this.randomSeed}.svg?options[hatColor][]=${hatColor}&option[hairColor]=${hairColor}&opiton[cloths]=${cloths}&option[eyes]=${eyes}`;
        break;
      }*/
      case (this.sprites.jdenticon) : {
        let colorSaturation = Math.random();
        let grayscaleSaturation = Math.random();

        this.url = `https://avatars.dicebear.com/v2/${this.sprite}/${this.randomSeed}.svg?options[background]=#333&options[colorSaturation]=${colorSaturation}&option[grayscaleSaturation]=${grayscaleSaturation}`;
        break;
      }
      case (this.sprites.gridy) : {
        this.url = `https://avatars.dicebear.com/v2/${this.sprite}/${this.randomSeed}.svg`;
        break;
      }
    }
	}
}
let a = new Avatar();
console.log(a);
module.exports = Avatar;
