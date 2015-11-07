require('dotenv').load();

var telegram = require('node-telegram-bot-api'),
    giphy    = require('giphy')(process.env.GIPHY_API_KEY),
    request  = require('request');

var bot = new telegram(process.env.TELEGRAM_TOKEN, { polling: true });

console.log('Bot started!');

function getRandom(randMin, randMax) {
  return Math.floor(Math.random() * (randMax - randMin + 1)) + randMin;
}

// matches /speak
bot.onText(/\/(speak) (.+)/, function (message, match) {

  var chatId = message.chat.id;
  var text = match[2];

  if (!text || text.length <= 0) {
    bot.sendMessage(chatId, "🍔 Need to send some text lad");
    return false;
  }

  // send message that it's upping some audio
  bot.sendChatAction(chatId, 'upload_audio');

  var voices = [
   'usenglishfemale', 'usenglishfemale2', 'usenglishmale',
   'usenglishmale2', 'ukenglishfemale', 'ukenglishfemale2',
   'ukenglishmale', 'auenglishfemale', 'usspanishfemale',
   'usspanishmale', 'chchinesefemale', 'hkchinesefemale',
   'jpjapanesefemale', 'krkoreanfemale', 'caenglishfemale',
   'huhungarianfemale', 'brportuguesefemale', 'eurportuguesefemale',
   'eurportuguesemale', 'eurspanishfemale', 'eurspanishmale',
   'eurcatalanfemale', 'eurczechfemale', 'eurdanishfemale',
   'eurfinnishfemale', 'eurfrenchfemale', 'eurfrenchmale',
   'eurnorwegianfemale', 'eurdutchfemale', 'eurpolishfemale',
   'euritalianfemale', 'euritalianmale', 'eurturkishfemale',
   'eurturkishmale', 'eurgreekfemale', 'eurgermanfemale',
   'eurgermanmale', 'rurussianfemale', 'rurussianmale',
   'swswedishfemale', 'cafrenchfemale', 'cafrenchmale'
 ];

 var voice = 'usenglishmale',
     speed = 0,
     pitch = 0;

 // if there's a flag set the relevant voice

 if ( text.indexOf('🇯🇵') !== -1 || text.indexOf('🗾') !== -1 ) {
   voice = 'jpjapanesefemale';
 }else if ( text.indexOf('🇨🇳') !== -1 ) {
   voice = 'chchinesefemale';
 }else if ( text.indexOf('🇰🇷') !== -1 ) {
   voice = 'krkoreanfemale';
 }else if ( text.indexOf('🇨🇦') !== -1 || text.indexOf('🍁') !== -1 ) {
   voice = 'caenglishfemale';
 }else if ( text.indexOf('🇭🇺') !== -1) {
   voice = 'huhungarianfemale';
 }else if ( text.indexOf('🇧🇷') !== -1) {
   voice = 'brportuguesefemale';
 }else if ( text.indexOf('🇧🇷') !== -1) {
   voice = 'brportuguesefemale';
 }else if ( text.indexOf('🇵🇹') !== -1) {
   voice = 'eurportuguesefemale';
 }else if ( text.indexOf('🇪🇸') !== -1) {
   voice = 'eurspanishfemale';
 }else if ( text.indexOf('🇨🇿') !== -1) {
   voice = 'eurczechfemale';
 }else if ( text.indexOf('🇩🇰') !== -1) {
   voice = 'eurdanishfemale';
 }else if ( text.indexOf('🇫🇮') !== -1) {
   voice = 'eurfinnishfemale';
 }else if ( text.indexOf('🇫🇷') !== -1) {
   voice = 'eurfrenchfemale';
 }else if ( text.indexOf('🇳🇴') !== -1) {
   voice = 'eurnorwegianfemale';
 }else if ( text.indexOf('🇳🇱') !== -1) {
   voice = 'eurdutchfemale';
 }else if ( text.indexOf('🇵🇱') !== -1) {
   voice = 'eurpolishfemale';
 }else if ( text.indexOf('🇮🇹') !== -1) {
   voice = 'euritalianmale';
 }else if ( text.indexOf('🇹🇷') !== -1) {
   voice = 'eurturkishfemale';
 }else if ( text.indexOf('🇬🇷') !== -1) {
   voice = 'eurgreekfemale';
 }else if ( text.indexOf('🇩🇪') !== -1) {
   voice = 'eurgermanmale';
 }else if ( text.indexOf('🇷🇺') !== -1) {
   voice = 'rurussianfemale';
 }else if ( text.indexOf('🇸🇪') !== -1) {
   voice = 'swswedishfemale';
 }

 // check for snail or rabbit emoji for speeds
 if ( text.indexOf('🐇') !== -1 || text.indexOf('🐰') != -1) {
   speed = 5;
 }else if ( text.indexOf('🐌') != -1 ) {
   speed = -10;
 }

 var apiKey = '34b06ef0ba220c09a817fe7924575123';

 var url = 'https://api.ispeech.org/api/rest.mp3' +
              '?apikey=' + apiKey +
              '&action=convert' +
              '&voice=' + voice +
              '&speed=' + speed +
              '&pitch=' + pitch +
              '&text=' + text;

  bot.sendVoice(chatId, request(url));
});

// matches gif or gifxxx
bot.onText(/\/(gif|gifxxx) (.+)/, function(message, match) {

  var chatId = message.chat.id;
  var command = match[1];

  var searchTerms = match[2];
  if (searchTerms.indexOf(' ') !== -1) {
    searchTerms = match[2].split(' ').splice(1).join(' ').toLowerCase();
  }

  var giphyRatings = ['y', 'g', 'pg', 'pg-13', 'r'];
  var giphyRating = giphyRatings[1];

  var monsterNames = [
    "GOBLIN",
    "WIZARD",
    "WARLOCK",
    "WITCH",
    "ORC",
    "SENPAI",
    "JESTER"
  ];

  var monsterName = monsterNames[getRandom(0, monsterNames.length - 1)];

  if (command === 'gifxxx') {
    giphyRating = giphyRatings[4];}

  if (searchTerms.length <= 0) {
    // send back error
    bot.sendMessage(chatId, "Ya didn't give a keyword son.");
    return false;
  }

  // send message that it's upping a photo
  bot.sendChatAction(chatId, 'upload_photo');

  giphy.search({ q: searchTerms, rating: giphyRating }, function(err, search, res) {
    if (err) {
      console.log('Error ', err);
      bot.sendMessage(chatId, "Giphy is fucked");
      return false;
    }

    if (!search.data || typeof search.data === 'undefined' || search.data.length <= 0) {
      // send back error saying no image avail
      bot.sendMessage(chatId, "🚏 No images with them keywords son.");
      return false;
    }

    // get random image
    var randomIndex = getRandom(0, search.data.length - 1);

    var imageUrl = search.data[randomIndex].images.fixed_width_downsampled.url;

    if (command === 'gifxxx') {
      bot.sendMessage(chatId, "🚨 NSFW: " + message.from.first_name.toUpperCase() + " THE " + monsterName + " HAS REQUESTED FILTH 🚨");
    }

    bot.sendDocument(chatId, request(imageUrl))
      .catch(function (err) {
        if (err) {
          // send message saying it didn't work
          console.log('Error ', err);
          bot.sendMessage(chatId, "🍔 Something went wrong sending yo the goods");
          return false;
        }
      });

  });

});