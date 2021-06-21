const Discord = require("discord.js");
const client = new Discord.Client();
const fs = require("fs");
const { get } = require("http");
const {prefix, token} = require('./config.json');
client.commands = new Discord.Collection();

const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));


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
        var d = new Date();
        var hours = d.getHours();
        var minutes = d.getMinutes();

        if(hours == 21 && minutes == 20) {
            var voiceChannel = client.channels.cache.get("263300337320853506");
            if (!channel) return console.error("The channel does not exist! Check ID of channel");
            voiceChannel.join().then(connection => {
            const dispatcher = connection.play('donkey.mp3', {
                volume: 1,
            })

            dispatcher.on('finish', end => {
                
                connection.disconnect();
                dispatcher.destroy();
                });
            }).catch(err => console.log(err))
        }else 

                        if(hours == 4 && minutes == 20) {
                            var voiceChannel = client.channels.cache.get("263300337320853506");
                            if (!channel) return console.error("The channel does not exist! Check ID of channel");
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
})




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



