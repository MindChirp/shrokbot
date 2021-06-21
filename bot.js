const Discord = require("discord.js");
const client = new Discord.Client();
const fs = require("fs");
const { get } = require("http");
const {prefix, token} = require('./config.json');
client.commands = new Discord.Collection();

const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));


//Fetch timestamps on program start
var timestamps;
fs.readFile("./timestamps.json", (err, data) => {
    if(err) throw err;

    var dat = JSON.parse(data);
    timestamps = dat.timestamps;
}) 



//const time = getHours();



for (const file of commandFiles) {
	const command = require(`./commands/${file}`);

	client.commands.set(command.name, command);
}



client.once("ready", () => {
    console.log("Ready");
})

client.login(token);




setInterval(()=>{
    //Read through the timestamp array, check if there is a matching time
    var d = new Date();
    var hours = d.getHours();
    var minutes = d.getMinutes();
	var seconds = d.getSeconds();
	var days = d.getDay();

	console.log(days, hours, minutes, seconds);

    var randomHour;
    var randomMinute;

    if(hours == 1 && minutes == 60 && seconds == 0){
        randomHour = Math.floor((Math.random() * 24));
        randomMinute = Math.floor((Math.random() * 59));
    }

    if(hours == randomHour && minutes == randomMinute){

        console.log(randomHour, randomMinute);
        var voiceChannel = client.channels.cache.get("263300337320853506");
        if (!voiceChannel) return console.error("The channel does not exist! Check ID of channel");
        voiceChannel.join().then(connection => {
            const dispatcher = connection.play(rick.mp3, {
                volume: 1,
            })
            
            dispatcher.on('finish', end => {
                
                connection.disconnect();
                dispatcher.destroy();
            });
        }).catch(err => console.log(err))


    }

    var x;
    for(x of timestamps) {
        (()=>{
            var y = x;
            if(hours == y.hours && minutes == y.minutes && seconds == 00 && y.days != 0) {
                console.log(y);
                var voiceChannel = client.channels.cache.get("263300337320853506");
                if (!voiceChannel) return console.error("The channel does not exist! Check ID of channel");
                voiceChannel.join().then(connection => {
                    console.log(y);
                    const dispatcher = connection.play(y.file, {
                        volume: 1,
                    })
                    
                    dispatcher.on('finish', end => {
                        
                        connection.disconnect();
                        dispatcher.destroy();
                    });
                }).catch(err => console.log(err))
            }
        })();
    }
}, 1000)




client.on("message", async message => {

     
    if(!message.guild) return;


        if(message.content == "#donkey") {
            var voiceChannel = message.member.voice.channel;
            voiceChannel.join().then(connection => {
              const dispatcher = connection.play('donkey.mp3', {
                  volume: 1,
              })
    
              dispatcher.on('finish', end => {
                
                  connection.disconnect();
                  dispatcher.destroy();
                });
            }).catch(err => console.log(err))
        }


        if(message.content == "#rick") {
            var voiceChannel = message.member.voice.channel;
            voiceChannel.join().then(connection => {
              const dispatcher = connection.play('rick.mp3', {
                  volume: 1,
              })
    
              dispatcher.on('finish', end => {
                
                  connection.disconnect();
                  dispatcher.destroy();
                });
            }).catch(err => console.log(err))
        }


    if(!message.content.startsWith(prefix) || message.author.bot) return;

        
        const args = message.content.slice(prefix.length).trim().split(/ +/);
        const command = args.shift().toLowerCase();

        if (!client.commands.has(command)) return;

        try {
            client.commands.get(command).execute(message, args);
        } catch (error) {
            console.error(error);
            message.reply('there was an error trying to execute that command!');
        }

            

})



