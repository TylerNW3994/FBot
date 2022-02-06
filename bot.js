var Discord = require('discord.io');
var logger = require('winston');
var auth = require('./auth.json');
// Configure logger settings
logger.remove(logger.transports.Console);
logger.add(new logger.transports.Console, {
    colorize: true
});
logger.level = 'debug';
// Initialize Discord Bot
var bot = new Discord.Client({
   token: auth.token,
   autorun: true
});
bot.on('ready', function (evt) {
    logger.info('Connected');
    logger.info('Logged in as: ');
    logger.info(bot.username + ' - (' + bot.id + ')');
});

var userFs = {};

bot.on('message', function (user, userID, channelID, message, evt) {
    // Our bot needs to know if it will execute a command
    // It will listen for messages that will start with `!`
    if (message.substring(0, 1) == '!') {
        var args = message.substring(1).split(' ');
        var cmd = args[0];
       
        args = args.splice(1);
        switch(cmd) {
			case 'FInChat':
				bot.sendMessage({
					to: channelID,
					message: 'F!'
				});
				break;
				
			case 'F':
				//User has F'd before, add to total number of F's by that user
				if(userFs.hasOwnProperty(user))
					userFs[user]++;
				//User has not F'd before, create user in JSON.
				else
					userFs[user] = 1;
				
				bot.sendMessage({
					to: channelID,
					message: user + " has F'd " + userFs[user] + " times!  WOW!"
				});
			    break;
				
			case 'HowMany':
				// IF JSON is empty:
				if(Object.keys(userFs).length == 0){
					bot.sendMessage({
						to: channelID,
						message: "Nobody has F'd yet!"
					});
				} else
				//People have F'd
				for(var x in userFs){
					bot.sendMessage({
						to: channelID,
						message: x + " has F'd " + userFs[x] + " times!  WOW!"
					})
				}
			case: 'rawr:
			case: 'Rawr':
			case: 'RAWR':
				bot.sendMessage({
					to: channelID,
					message: "XD"
				});
            break;
        }
		
    }
	
});
