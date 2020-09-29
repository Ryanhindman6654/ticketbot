const http = require("http");
const express = require("express");
const app = express();
app.get("/", (request, response) => {
  response.sendStatus(200);
});

app.listen(process.env.PORT);
setInterval(() => {
  http.get(`https://t-robux.glitch.me/`);
}, 864000000);

const Discord = require("discord.js");
const db = require("quick.db");
const client = new Discord.Client();
const prefix = "+";

client.once("ready", () => {
  console.log(`Ready As: ${client.user.id}`);
});


client.on("message", message => {
  if (message.content.startsWith(prefix + "invites")) {
    let user = message.mentions.members.first() || message.author;
    let invites = db.fetch(`invites_${message.guild.id}_${user.id}`);
    const embed = new Discord.MessageEmbed()
      .setDescription(`**Has ${invites || 0} invites right now**\n`)
      .setColor("YELLOW")
      .setTitle(`${user.username || user.user.username} invites `)
      .setThumbnail(
        `https://cdn.discordapp.com/avatars/753279617862729749/031ee5ed695dc6dffd15f7776cc1119a.png?size=128`
      )
      .setFooter(
        `Bot by Rainbow#1234`,
        `https://images-ext-1.discordapp.net/external/sWU7uAQUaxOulXecrHpo2G9wyMuQS0G_Z7y0KQxxPQk/%3Fsize%3D128/https/cdn.discordapp.com/avatars/744243996267905076/a_ab72dde92697041826789d5778f0047b.gif`
      )
      .setTimestamp();
    message.channel.send(embed);
  }
});

const developers = ["721174020602462259", "744243996267905076"];

client.on("message", message => {
  if (message.content.startsWith(prefix + "add")) {
    if (!developers.includes(message.author.id)) return;
    const args = message.content
      .slice(prefix.length)
      .trim()
      .split(/ +/);
    let amount = args[2];
    let user = message.mentions.members.first();
    const embed = new Discord.MessageEmbed()
      .setDescription(`Added ${amount} To ${user}`)
      .setColor("#cc33ff");
    message.channel.send(embed);
    db.add(`invites_${message.guild.id}_${user.id}`, amount);
  }
});

client.on("message", message => {
  if (message.content.startsWith(prefix + "remove")) {
    if (!developers.includes(message.author.id)) return;
    const args = message.content
      .slice(prefix.length)
      .trim()
      .split(/ +/);
    let amount = args[2];
    let user = message.mentions.members.first();
    const embed = new Discord.MessageEmbed()
      .setDescription(`Removed ${amount} From ${user}`)
      .setColor("#cc33ff");
    message.channel.send(embed);
    db.subtract(`invites_${message.guild.id}_${user.id}`, amount);
  }
});

client.on("message", message => {
  if (message.content.startsWith(prefix + "stats")) {
    let user = message.mentions.members.first() || message.author;
    let invites = db.fetch(`invites_${message.guild.id}_${user.id}`);
    const bc = new Discord.MessageEmbed()
      .setColor("#cc33ff")
      .setTitle(`**${user.username || user.user.username}** Rebex Stats`)
      .setDescription(
        `**✈️ • Invites - ${invites ||
          0} \n\n💰 • Redeemable Robux - ${invites ||
          0}0\n\n💸 • Min Redeemable R$ - 100** \n\n[[ROBLOX GROUP]](https://www.roblox.com/groups/6107642/Rainbows-Robux#!/about)\n`
      )
      .setThumbnail(
        `https://cdn.discordapp.com/avatars/753279617862729749/031ee5ed695dc6dffd15f7776cc1119a.png?size=128`
      )
      .setFooter(
        `Bot by Rainbow#1234`,
        `https://images-ext-1.discordapp.net/external/sWU7uAQUaxOulXecrHpo2G9wyMuQS0G_Z7y0KQxxPQk/%3Fsize%3D128/https/cdn.discordapp.com/avatars/744243996267905076/a_ab72dde92697041826789d5778f0047b.gif`
      )
      .setTimestamp();
    message.channel.send(bc);
  }
});

client.on("message", async message => {
  if (message.content.startsWith(prefix + "redeem")) {
    let invites = db.fetch(`invites_${message.guild.id}_${message.author.id}`);

    let messageArray = message.content.split(" ");
    let cmd = messageArray[0];
    let args = messageArray.slice(0);
    const embed = new Discord.MessageEmbed()

      .setColor("RED")
      .setTitle(`${message.author.tag} You enter a invalid roblox username`)
      .setDescription(
        "**__Enter your username by typing +redeem {roblox username}__**\n\n**```Using the wrong roblox username may give someone else your robux, so please make sure you're using your correct username```**"
      )
      .setThumbnail(
        `https://cdn.discordapp.com/avatars/753279617862729749/031ee5ed695dc6dffd15f7776cc1119a.png?size=128`
      )
      .setFooter(
        `Bot by Rainbow#1234`,
        `https://images-ext-1.discordapp.net/external/sWU7uAQUaxOulXecrHpo2G9wyMuQS0G_Z7y0KQxxPQk/%3Fsize%3D128/https/cdn.discordapp.com/avatars/744243996267905076/a_ab72dde92697041826789d5778f0047b.gif`
      )
      .setTimestamp();

    if (!args[1]) return message.channel.send(embed);

    if (invites < 10) {
      const args = message.content
        .slice(prefix.length)
        .trim()
        .split(/ +/);

      const big = new Discord.MessageEmbed()
        .setColor("RED")
        .setTitle(`${message.author.tag} you don't have enough invites`)
        .setDescription(
          `**You only have ${invites || 0} invites and ${invites ||
            0}0 Redeemable Robux.\n\nYou will need atleast 10 invites or 100 Robux to claimed your robux.\n\nRoblox username - \`${
            args[1]
          }\`**`
        ) //${args[1]}
        .setThumbnail(
          `https://cdn.discordapp.com/avatars/753279617862729749/031ee5ed695dc6dffd15f7776cc1119a.png?size=128`
        )
        .setFooter(
          `Bot by Rainbow#1234`,
          `https://images-ext-1.discordapp.net/external/sWU7uAQUaxOulXecrHpo2G9wyMuQS0G_Z7y0KQxxPQk/%3Fsize%3D128/https/cdn.discordapp.com/avatars/744243996267905076/a_ab72dde92697041826789d5778f0047b.gif`
        )
        .setTimestamp();
      return message.channel.send(big);
    }

    if (invites > 10) {
      const args = message.content
        .slice(prefix.length)
        .trim()
        .split(/ +/);

      const sir = new Discord.MessageEmbed()
        .setColor("RED")
        .setTitle(`${message.author.tag} you can't reedem yet!`)
        .setDescription(
          `**We need 2,500 Members but we have ${
            message.guild.memberCount
          } Members\nlets all work together and invite so we can redeem our Robux!\n\nInvites - ${invites ||
            0} \nRedeemable Robux - ${invites ||
            0}0 \nMin Redeemable R$ - 100\nRoblox username - ${args[1]}**`
        ) //${args[1]}
        .setThumbnail(
          `https://cdn.discordapp.com/avatars/753279617862729749/031ee5ed695dc6dffd15f7776cc1119a.png?size=128`
        )
        .setFooter(
          `Bot by Rainbow#1234`,
          `https://images-ext-1.discordapp.net/external/sWU7uAQUaxOulXecrHpo2G9wyMuQS0G_Z7y0KQxxPQk/%3Fsize%3D128/https/cdn.discordapp.com/avatars/744243996267905076/a_ab72dde92697041826789d5778f0047b.gif`
        )
        .setTimestamp();
      return message.channel.send(sir);
    }
  }
});

client.on("message", message => {
  if (message.content.startsWith(prefix + "help")) {
    var help = new Discord.MessageEmbed()

      .setColor("BLACK")
      .setTitle(`Rebex Bot Commands`)
      .setDescription(
        `**+stats**\nusage: +stats or +stats {user}\n\`Checks invites & Rebex balances\`\n\n**+redeem**\nusage: +redeem {roblox username}\n\`Reedems your rebex balance to your robux account\`\n\n**+invites**\nusage: +invites or +invites {user}\n\`Checks your invites or a user invites\``
      )
      .setThumbnail(
        `https://cdn.discordapp.com/avatars/753279617862729749/031ee5ed695dc6dffd15f7776cc1119a.png?size=128`
      )
      .setFooter(
        `Bot by Rainbow#1234`,
        `https://images-ext-1.discordapp.net/external/sWU7uAQUaxOulXecrHpo2G9wyMuQS0G_Z7y0KQxxPQk/%3Fsize%3D128/https/cdn.discordapp.com/avatars/744243996267905076/a_ab72dde92697041826789d5778f0047b.gif`
      )
      .setTimestamp();

    message.channel.send(help);
  }
});

const guildInvites = new Map();

client.on('inviteCreate', async invite => guildInvites.set(invite.guild.id, await invite.guild.fetchInvites()));
client.on('ready', () => {
    console.log(`${client.user.tag} has logged in.`);
    client.guilds.cache.forEach(guild => {
        guild.fetchInvites()
            .then(invites => guildInvites.set(guild.id, invites))
            .catch(err => console.log(err));
    });
});


client.on('guildMemberAdd', async member => {
    const catchedInvites = guildInvites.get(member.guild.id)
    const newInvites = await member.guild.fetchInvites();
    guildInvites.set(member.guild.id, newInvites)
    try {
        const usedInvite = newInvites.find(inv => catchedInvites.get(inv.code).uses < inv.uses)
db.add(`invites_${member.guild.id}_${usedInvite.inviter.id}`, 1)
db.set(`inviter_${member.id}`, usedInvite.inviter.id)
let inv = db.fetch(`invites_${member.guild.id}_${usedInvite.inviter.id}`)
client.channels.cache.get('754864967152435260').send(`${member} **Joined;** invited By <@${usedInvite.inviter.id}> (**${inv}** invites)`)
    } catch (err) {
        console.log(err)
    }

});

/*client.on("guildMemberAdd", member => {
member.guild.fetchInvites().then(async guildInvites => {
    const cachedInvites = guildInvites.get(member.guild.id);
 const newInvites = await member.guild.fetchInvites();
guildInvites.set(member.guild.id, newInvites);
const usedInvite = newInvites.find(inv => cachedInvites.cache.get(inv.code).uses < inv.uses);
const inviter = client.users.cache.get(usedInvite.inviter.id);
db.add(`invites_${member.guild.id}_${usedInvite.inviter.id}`, 1)
db.set(`inviter_${member.id}`, usedInvite.inviter.id)
let inv = db.fetch(`invites_${member.guild.id}_${usedInvite.inviter.id}`)
client.channels.cache.get('754864967152435260').send(`${member} **Joined;** invited By <@${usedInvite.inviter.id}> (**${inv}** invites)`)
    
    })
})*/

client.on("guildMemberRemove", member => {
let inviter2 = db.fetch(`inviter_${member.id}`)
const iv2 = client.users.cache.get(inviter2);
const mi = member.guild.members.cache.get(inviter2);
db.subtract(`invites_${member.guild.id}_${inviter2}`, 1)
client.channels.cache.get('755839795447464006').send(`${member} Left, Invited by <@${inviter2}>`)
})



client.login("NTk2MDQ2OTM0OTY4NjMxMzA3.XRz19w.3p8-jfleKGc_Ix9n7x4knn1UDK4");
