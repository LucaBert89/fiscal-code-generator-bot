var parse = require('csv-parse');

//const { Telegraf, Scenes, session } = require('telegraf')
const {Telegraf, Scenes, session, Markup} = require('telegraf');
require('dotenv').config()

const bot = new Telegraf(process.env.BOT_TOKEN);

const contactDataWizard = new Scenes.WizardScene(
    'super-wizard', // first argument is Scene_ID, same as for BaseScene
    (ctx) => {
     
        ctx.reply('Please enter your first name', Markup.removeKeyboard());
        ctx.wizard.state.contactData = {};
        return ctx.wizard.next();
    },
    (ctx) => {
        // validation example
        ctx.wizard.state.contactData.firstName = ctx.message.text;
        console.log(ctx.message.text);
        ctx.reply("What's your last name?");
        return ctx.wizard.next();
    },
    (ctx) => {
        // validation example
        ctx.wizard.state.contactData.lastname = ctx.message.text;
        ctx.reply("What's your sex?");
        return ctx.wizard.next();
    },
    (ctx) => {
        // validation example
        ctx.wizard.state.contactData.birthday = ctx.message.text;
        ctx.reply("When is your birthday? use this form xx/xx/xx");
        return ctx.wizard.next();
    },
    (ctx) => {
        // validation example
        console.log(ctx.update.message.text);
        ctx.wizard.state.contactData.birthCity = ctx.message.text;
        ctx.reply("What' your birth city?");
        return ctx.wizard.next();
    },
);

const stage = new Scenes.Stage();
stage.register(contactDataWizard);

bot.use(session());
bot.use(stage.middleware());
bot.command('start', ctx => {
    ctx.scene.enter('super-wizard');
  });
bot.launch();