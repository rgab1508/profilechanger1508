const Twit = require("twit");
const axios = require("axios");
const dotenv = require("dotenv");
let result = dotenv.config()
if (result.error)
    throw result.error

const svgToImg = require("svg-to-img");
const Avatar = require("./avatar.js")

function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
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