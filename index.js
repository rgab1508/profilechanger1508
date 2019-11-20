const Twit = require("twit");
const axios = require("axios");
const dotenv = require("dotenv");
let result = dotenv.config()
if (result.error)
    throw result.error

const svgToImg = require("svg-to-img");


function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
}

class Avatar {
    constructor() {
        this.sprites = ["male", "female", "human", "identicon", "bottts", "avataaars", "jdenticon", "gridy"];
        this.moods = ['happy', 'sad', 'suprised'];
        this.colors = ['amber', 'blue', 'blueGrey', 'brown', 'cyan', 'deepOrange', 'deepPurple', 'agreenmber', 'grey', 'indigo', 'lightBlue', 'lightGreen', 'lime', 'orange', 'pink', 'purple', 'red', 'teal', 'yellow'];
        this.colorLevel = [50, 100, 200, 300, 400, 500, 600, 700, 800, 900];
        this.sprite = "";
        this.randomSeed = getRandomInt(10000000);
        this.url = "";
        this.selectSprite();
        this.setOptionsAndUrl();
    }
    selectSprite() {
        this.sprite = this.sprites[getRandomInt(this.sprites.length)]
    }
    setOptionsAndUrl() {
        if ((this.sprite == this.sprites[0]) || (this.sprite == this.sprites[1]) || (this.sprite == this.sprites[2])) {
            let mood = this.moods[getRandomInt(this.moods.length)];
            this.url = `https://avatars.dicebear.com/v2/${this.sprite}/${this.randomSeed}.svg?options[mood][]=${mood}`
        }
        if (this.sprite == this.sprites[3]) {
            let rndColor = this.colors[getRandomInt(this.colors.length)];
            let rndColorLevel = this.colorLevel[getRandomInt(this.colorLevel.length)];

            this.url = `https://avatars.dicebear.com/v2/${this.sprite}/${this.randomSeed}.svg?options[colors][]=${rndColor}&options[background]=#333&options[colorLevel]=${rndColorLevel}`;
        }
        if (this.sprite == this.sprites[4]) {
            let rndColor = this.colors[getRandomInt(this.colors.length)];
            let colorful = true;
            let mouthChance = Math.random() * 100;
            let sidesChance = Math.random() * 100;
            let textureChance = Math.random() * 100;
            let topChange = Math.random() * 100;
            this.url = `https://avatars.dicebear.com/v2/${this.sprite}/${this.randomSeed}.svg?options[colors][]=${rndColor}&options[mouthChance]=${mouthChance}&options[sidesChance]=${sidesChance}&options[textureChance]=${textureChance}&options[topChance]=${topChange}`;
        }
        if (this.sprite == this.sprites[5]) {
            let hatColors = ['black', 'blue', 'gray', 'heather', 'pastel', 'pink', 'red', 'white'];
            let hairColors = ['auburn', 'black', 'blonde', 'brown', 'pastel', 'platinum', 'red', 'gray'];
            let clothss = ['blazer', 'sweater', 'shirt', 'hoodie', 'overall'];
            let eyess = ['close', 'cry', 'default', 'dizzy', 'roll', 'happy', 'hearts', 'side', 'squint', 'surprised', 'wink', 'winkWacky'];
            let hatColor = hatColors[getRandomInt(hatColors.length)];
            let hairColor = hairColors[getRandomInt(hairColors.length)];
            let cloths = clothss[getRandomInt(clothss.length)];
            let eyes = eyess[getRandomInt(eyess.length)];

            this.url = `https://avatars.dicebear.com/v2/${this.sprite}/${this.randomSeed}.svg?options[hatColor]=${hatColor}&options[hairColor]=${hairColor}&opitons[cloths]=${cloths}&options[eyes]=${eyes}`;
        }
        if (this.sprite == this.sprites[6]) {
            let colorSaturation = Math.random();
            let grayscaleSaturation = Math.random();

            this.url = `https://avatars.dicebear.com/v2/${this.sprite}/${this.randomSeed}.svg?options[background]=#333&options[colorSaturation]=${colorSaturation}&options[grayscaleSaturation]=${grayscaleSaturation}`
        }
        if (this.sprite == this.sprites[7]) {
            this.url = `https://avatars.dicebear.com/v2/${this.sprite}/${this.randomSeed}.svg&options[colorful]=1`
        }

    }
}


let avatar = new Avatar();

let T = new Twit({
    consumer_key: process.env.TWITTER_CONSUMER_KEY,
    consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
    access_token: process.env.TWITTER_ACCESS_TOKEN,
    access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET,
});

console.log(avatar.url);
axios.get(avatar.url)
    .then((response) => {
        console.log("got response from avatars");
        (async() => {
            const image = await svgToImg.from(response.data).toJpeg({
                encoding: "base64"
            });

            updateProfilePic(image);

        })();

    })
    .catch((error) => {
        console.log(error);
    })


function updateProfilePic(img) {

    let params = { image: img }
    T.post('account/update_profile_image', params, (err, data, response) => {
        if (err) throw err;
        if (data) console.log("data recieved");
        console.log("profile changed :)");
    });
}