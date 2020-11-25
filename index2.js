const instabot = require('./instabot');

// instabot.postComment(process.argv[2]).then();

instabot.postOnDate(process.argv[2], process.argv[3], process.argv[4], process.argv[5]);
