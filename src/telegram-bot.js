const fiscalGenerator = require("./code-generator");

const {Telegraf, Scenes, session, Markup} = require('telegraf');
require('dotenv').config()

const bot = new Telegraf(process.env.BOT_TOKEN);

const contactDataWizard = new Scenes.WizardScene(
    'super-wizard', 
    (ctx) => {
        ctx.reply('Please enter your first name', Markup.removeKeyboard());
        ctx.wizard.state.contactData = {};
       
        return ctx.wizard.next();
    },
    (ctx) => {
        // if the name isn't a valid name with letters than error reply (.replace is for two separate name)
        if(!ctx.message.text.replace(/\s+/g, '').match(/[A-Za-z]+/i)) {
            ctx.reply('Please enter a valid name', Markup.removeKeyboard());
            return;
        }
        ctx.wizard.state.contactData.firstName = ctx.message.text;
        ctx.reply("What's your last name?");
        return ctx.wizard.next();
        
    },
    (ctx) => {
          // if the name isn't a valid lastname with letters than error reply (.replace is for two separate name)
        if(!ctx.message.text.replace(/\s+/g, '').match(/[A-Za-z]+/i)) {
            ctx.reply('Please enter a valid last name', Markup.removeKeyboard());
            return;
        }
        ctx.wizard.state.contactData.lastname = ctx.message.text;
        ctx.reply("What's your sex? Answer M or F");
        return ctx.wizard.next();
    },
    (ctx) => {
         // if the letter isn't an "M" or "F" than error reply
        if(!ctx.message.text.match(/[MFmf]+/i)) {
            ctx.reply('Please enter M or F', Markup.removeKeyboard());
            return;
        }
        ctx.wizard.state.contactData.sex = ctx.message.text;
        ctx.reply("When is your birthday? use this form xx/xx/xx");
        return ctx.wizard.next();
    },
    (ctx) => {
        // if the birthday isn't composed by numbers and "/" than error format reply
        if(!ctx.message.text.match(/[0-9\/]/gi)) {
            ctx.reply('Please use the right format xx/xx/xx', Markup.removeKeyboard());
            return;
             // if the birthday isn't 10 digit length to respect the right format than error format reply
        } else if(ctx.message.text.match(/[0-9\/]/gi).length !==10) {
            ctx.reply('Please use the right format xx/xx/xx', Markup.removeKeyboard());
            return;
        }

        ctx.wizard.state.contactData.birthday = ctx.message.text;
        ctx.reply("What's your birth city?");
        return ctx.wizard.next();
    },
    async (ctx) => {
        const codeGenerator = new fiscalGenerator(`${ctx.wizard.state.contactData.firstName}`, `${ctx.wizard.state.contactData.lastname}`,`${ctx.wizard.state.contactData.birthday}`,`${ctx.wizard.state.contactData.sex}`,`${ctx.message.text}`)
        const cityCode = await codeGenerator.birthCityCode();
        const controlCode = await codeGenerator.controlCharacter();
        // if the birtCity isn't composed by letters than error reply
        if(!ctx.message.text.match(/[A-Za-z]+/i)) {
            ctx.reply('Please enter a right name of the city', Markup.removeKeyboard());
            return;
            // if the birtCity isn't found in the csv file than error
        } else if(cityCode === undefined) {
            ctx.reply('City not found, enter the name of your city again', Markup.removeKeyboard());
            return;
        }
        ctx.wizard.state.contactData.birthCity = ctx.message.text;
        // set again the birthCity property to be sure that is has passed the validation above
        codeGenerator.birthCity = ctx.wizard.state.contactData.birthCity;
        
        ctx.reply("Your fiscal code is: " + codeGenerator.surnameCode + codeGenerator.nameCode + codeGenerator.birthdayCode + codeGenerator.genderCode + cityCode + controlCode);
    },
    (ctx) => {
        bot.command('start', ctx => {
            ctx.scene.enter('super-wizard');
          });
    }

);

const stage = new Scenes.Stage();
stage.register(contactDataWizard);

bot.use(session());
bot.use(stage.middleware());
bot.command('start', ctx => {
    ctx.scene.enter('super-wizard');
  });
bot.launch();