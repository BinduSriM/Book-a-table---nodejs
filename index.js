// Lambda Function code for Alexa.
// Paste this into your index.js file. 

const Alexa = require("ask-sdk");
const https = require("https");

const invocationName = "bookatable";

const mysql = require('mysql');

function getMemoryAttributes() {   const memoryAttributes = {
       "history":[],


       "launchCount":0,
       "lastUseTimestamp":0,

       "lastSpeechOutput":{},
   };
   return memoryAttributes;
}

const maxHistorySize = 20; // remember only latest 20 intents 


// 1. Intent Handlers =============================================

const AMAZON_FallbackIntent_Handler =  {
    canHandle(handlerInput) {
        const request = handlerInput.requestEnvelope.request;
        return request.type === 'IntentRequest' && request.intent.name === 'AMAZON.FallbackIntent' ;
    },
    handle(handlerInput) {
        const request = handlerInput.requestEnvelope.request;
        const responseBuilder = handlerInput.responseBuilder;
        let sessionAttributes = handlerInput.attributesManager.getSessionAttributes();

        let previousSpeech = getPreviousSpeechOutput(sessionAttributes);

        return responseBuilder
            .speak('Sorry I didnt catch what you said, ' + stripSpeak(previousSpeech.outputSpeech))
            .reprompt(stripSpeak(previousSpeech.reprompt))
            .getResponse();
    },
};

const AMAZON_CancelIntent_Handler =  {
    canHandle(handlerInput) {
        const request = handlerInput.requestEnvelope.request;
        return request.type === 'IntentRequest' && request.intent.name === 'AMAZON.CancelIntent' ;
    },
    handle(handlerInput) {
        const request = handlerInput.requestEnvelope.request;
        const responseBuilder = handlerInput.responseBuilder;
        let say = 'Okay, talk to you later! ';
        return responseBuilder
            .speak(say)
            .withShouldEndSession(true)
            .getResponse();
    },
};

const AMAZON_HelpIntent_Handler =  {
    canHandle(handlerInput) {
        const request = handlerInput.requestEnvelope.request;
        return request.type === 'IntentRequest' && request.intent.name === 'AMAZON.HelpIntent' ;
    },
    handle(handlerInput) {
        const request = handlerInput.requestEnvelope.request;
        const responseBuilder = handlerInput.responseBuilder;
        let sessionAttributes = handlerInput.attributesManager.getSessionAttributes();

        let history = sessionAttributes['history'];
        let intents = getCustomIntents();
        let sampleIntent = randomElement(intents);

        let say = 'You asked for help. '; 

        let previousIntent = getPreviousIntent(sessionAttributes);
        if (previousIntent && !handlerInput.requestEnvelope.session.new) {
             say += 'Your last intent was ' + previousIntent + '. ';
         }
        // say +=  'I understand  ' + intents.length + ' intents, '

        say += ' Here something you can ask me, ' + getSampleUtterance(sampleIntent);

        return responseBuilder
            .speak(say)
            .reprompt('try again, ' + say)
            .getResponse();
    },
};

const AMAZON_StopIntent_Handler =  {
    canHandle(handlerInput) {
        const request = handlerInput.requestEnvelope.request;
        return request.type === 'IntentRequest' && request.intent.name === 'AMAZON.StopIntent' ;
    },
    handle(handlerInput) {
        const request = handlerInput.requestEnvelope.request;
        const responseBuilder = handlerInput.responseBuilder;
        let say = 'Okay, talk to you later! ';
        return responseBuilder
            .speak(say)
            .withShouldEndSession(true)
            .getResponse();
    },
};

const AMAZON_NavigateHomeIntent_Handler =  {
    canHandle(handlerInput) {
        const request = handlerInput.requestEnvelope.request;
        return request.type === 'IntentRequest' && request.intent.name === 'AMAZON.NavigateHomeIntent' ;
    },
    handle(handlerInput) {
        const request = handlerInput.requestEnvelope.request;
        const responseBuilder = handlerInput.responseBuilder;
        let say = 'Hello from AMAZON.NavigateHomeIntent. ';
        return responseBuilder
            .speak(say)
            .reprompt('try again, ' + say)
            .getResponse();
    },
};

const GetIndian_Handler =  {
    canHandle(handlerInput) {
        const request = handlerInput.requestEnvelope.request;
        return request.type === 'IntentRequest' && request.intent.name === 'GetIndian' ;
    },
    handle(handlerInput) {
        const request = handlerInput.requestEnvelope.request;
        const responseBuilder = handlerInput.responseBuilder;
        let say = 'The names of Indian restaurants in Milton Keynes are: ';
        var data = new Array();
        data=['Miraj Indian Restaurant',
              'Bombay Palace Restaurant',
              'The Crown Pub and Restaurant',
              'Maaya indian kitchen and bar',
              'tiger garden'
              ];
var mysql = require('mysql');

var con = mysql.createConnection({
  host: "project.ccetxd8ilftf.us-east-1.rds.amazonaws.com",
  user: "root",
  password: "bindusri1234",
  database: "restaurant",
  port: "3306"
});
var someVar = [];

con.query("select * from restaurant", function(err, rows){
  if(err) {
    throw err;
  } else {
   var a=rows[0].name;
    setValue(rows[0].name);
  }
  con.end();
});

const setValue=function(value) {
  someVar = value;
  console.log(someVar);
}
       for(let i=0;i<data.length;i++){
         say+=data[i]+', ';
}
        return responseBuilder
            .speak(say)
            .reprompt('try again, ' + say)
            .getResponse();

    },
};

const GetItalian_Handler =  {
    canHandle(handlerInput) {
        const request = handlerInput.requestEnvelope.request;
        return request.type === 'IntentRequest' && request.intent.name === 'GetItalian' ;
    },
    handle(handlerInput) {
        const request = handlerInput.requestEnvelope.request;
        const responseBuilder = handlerInput.responseBuilder;
        let sessionAttributes = handlerInput.attributesManager.getSessionAttributes();

       let say = 'The names of Italian restaurants in Milton Keynes are: ';
        var data = new Array();
        data=['ASK Italian Restaurant',
              "Andrea's Palace restaurant",
              'the plough amersham',
              'zizzi - milton keynes the hub',
              'carriages'
              ];
       for(let i=0;i<data.length;i++){
         say+=data[i]+', ';
       }
        return responseBuilder
            .speak(say)
            .reprompt('try again, ' + say)
            .getResponse();
    },
};

const GetBritish_Handler =  {
    canHandle(handlerInput) {
        const request = handlerInput.requestEnvelope.request;
        return request.type === 'IntentRequest' && request.intent.name === 'GetBritish' ;
    },
    handle(handlerInput) {
        const request = handlerInput.requestEnvelope.request;
        const responseBuilder = handlerInput.responseBuilder;
        let sessionAttributes = handlerInput.attributesManager.getSessionAttributes();

       let say = 'The names of British restaurants in Milton Keynes are: ';
        var data = new Array();
        data=['the ivy marlow garden',
              'the pointer',
              'the potters arms',
              'the three oaks',
              'No5 London End'
              ];
       for(let i=0;i<data.length;i++){
         say+=data[i]+', ';
       }
        return responseBuilder
            .speak(say)
            .reprompt('try again, ' + say)
            .getResponse();
    },
};

const Openhours_Handler = {
  canHandle(handlerInput){
     const request = handlerInput.requestEnvelope.request;
        return request.type === 'IntentRequest' && request.intent.name === 'openhours' ;
    },
    handle(handlerInput) {
        const request = handlerInput.requestEnvelope.request;
        const responseBuilder = handlerInput.responseBuilder;
        let sessionAttributes = handlerInput.attributesManager.getSessionAttributes();
        let restaurant=handlerInput.requestEnvelope.request.intent.slots.restaurants.value;
        let say='';
         switch (restaurant) {
           case "Andrea's restaurant":
               say+='opening hours of '+handlerInput.requestEnvelope.request.intent.slots.restaurants.value+ ' are 5 PM to 11 PM from tuesday to saturday';
               break;
           case "ask Italian restaurant":
               say+='opening hours of '+handlerInput.requestEnvelope.request.intent.slots.restaurants.value+' are 11 AM to 10 PM from monday and thursday, 11 AM to 11 PM on friday and saturday, 11 AM to 10 PM on sunday';
               break;
           case "miraj Indian restaurant":
               say+='opening hours of '+handlerInput.requestEnvelope.request.intent.slots.restaurants.value+' are 5 PM to 11 PM from monday to sunday';
               break;
           case "Bombay palace restaurant":
               say+='opening hours of '+handlerInput.requestEnvelope.request.intent.slots.restaurants.value+' are 5 PM to 11 PM from sunday to thursday, 5 PM to 11:30 PM onn firday and saturday';
               break;
           case "the ivy Marlow garden":
               say+='opening hours of '+handlerInput.requestEnvelope.request.intent.slots.restaurants.value+ ' are 8 AM to 10 30 PM from monday to saturday and from 9 AM to 9 30 PM on sunday';
               break;
           case "the pointer":
               say+='opening hours of '+handlerInput.requestEnvelope.request.intent.slots.restaurants.value+' are 12 PM to 14 30 PM from tuesday and saturday, 6 PM to 8 30 PM on tuesday and thursday, 6 30 PM to 9 30 PM on friday and saturday, from 12 pm to 5 pm on sunday';
               break;
           case "the potters arms":
               say+='opening hours of '+handlerInput.requestEnvelope.request.intent.slots.restaurants.value+' are 12 PM to 2 30 PM from monday to friday, from 12 pm to 5 pm on saturday, from 12 pm 4 pm on sunday';
               break;
           case "the 3 oaks":
               say+='opening hours of the three oaks are 12 PM to 11 PM from monday to saturday, 12 PM to 6 PM on sunday';
               break;
           case "no5 London end":
               say+='opening hours of '+handlerInput.requestEnvelope.request.intent.slots.restaurants.value+ ' are 12 AM to 2 30 PM from monday to saturday and from 6 AM to 9 30 PM on sunday';
               break;
           case "zizzi - Milton Keynes the hub":
               say+='opening hours of '+handlerInput.requestEnvelope.request.intent.slots.restaurants.value+' are 12 PM to 11 PM from monday and saturday, 12 PM to 10 30 PM on sunday';
               break;
           case "carriages":
               say+='opening hours of '+handlerInput.requestEnvelope.request.intent.slots.restaurants.value+' are 6 PM to 9 30 PM from monday to saturday, from 12 pm to 4 pm on sunday';
               break;
           case "the plow Amersham":
               say+='opening hours of the plough amersham are 9 AM to 11 PM from monday to sunday';
               break;
           case "tiger garden":
               say+='opening hours of '+handlerInput.requestEnvelope.request.intent.slots.restaurants.value+' are 12 PM to 2 PM and 6 pm to 11 pm from monday and saturday, 12 PM to 10 30 PM on sunday';
               break;
           case "maaya Indian kitchen and bar":
               say+='opening hours of '+handlerInput.requestEnvelope.request.intent.slots.restaurants.value+' are 12 PM to 2 30 PM and 5 30 pm to 11 pm from monday to friday, from 12 pm to 11 pm on saturday and from 12 pm to 9 pm on sunday';
               break;
           case "the crown pub and restaurant":
               say+='opening hours of '+handlerInput.requestEnvelope.request.intent.slots.restaurants.value+' are 12 AM to 11 PM from monday to sunday';
               break;
           default:
               say+='OOPS! I never thought about it...';
               break;
        }
        return responseBuilder
            .speak(say)
            .reprompt('try again, ' + say)
            .getResponse();
  }
};

let available=0;

const table_Handler = {
  canHandle(handlerInput){
     const request = handlerInput.requestEnvelope.request;
        return request.type === 'IntentRequest' && request.intent.name === 'tables' ;
    },
    handle(handlerInput) {
        const request = handlerInput.requestEnvelope.request;
        const responseBuilder = handlerInput.responseBuilder;
        let sessionAttributes = handlerInput.attributesManager.getSessionAttributes();
        let restaurant=handlerInput.requestEnvelope.request.intent.slots.restaurants.value;
        let say='';
         switch (restaurant) {
           case "Andrea's restaurant":
               say+='Number of available tables in '+handlerInput.requestEnvelope.request.intent.slots.restaurants.value+ ' are 10';
               break;
           case "ask Italian restaurant":
               say+='Number of available tables in '+handlerInput.requestEnvelope.request.intent.slots.restaurants.value+' are 11';
               break;
           case "miraj Indian restaurant":
               say+='Number of available tables in '+handlerInput.requestEnvelope.request.intent.slots.restaurants.value+' are 5';
               break;
           case "Bombay palace restaurant":
               say+='Number of available tables in '+handlerInput.requestEnvelope.request.intent.slots.restaurants.value+' are 3';
               break;
           case "the ivy Marlow garden":
               say+='Number of available tables in '+handlerInput.requestEnvelope.request.intent.slots.restaurants.value+ ' are 8';
               break;
           case "the pointer":
               say+='Number of available tables in '+handlerInput.requestEnvelope.request.intent.slots.restaurants.value+' are 6';
               break;
           case "the potters arms":
               say+='Number of available tables in '+handlerInput.requestEnvelope.request.intent.slots.restaurants.value+' are 2';
               break;
           case "the 3 oaks":
               say+='Number of available tables in the three oaks is 1';
               break;
           case "no5 London end":
               say+='Number of available tables in '+handlerInput.requestEnvelope.request.intent.slots.restaurants.value+ ' are 7';
               break;
           case "zizzi - Milton Keynes the hub":
               say+='Number of available tables in '+handlerInput.requestEnvelope.request.intent.slots.restaurants.value+' are 9';
               break;
           case "carriages":
               say+='Number of available tables in '+handlerInput.requestEnvelope.request.intent.slots.restaurants.value+' are 6';
               break;
           case "the plow Amersham":
               say+='Number of available tables in the plough amersham are 11';
               break;
           case "tiger garden":
               say+='Number of available tables in '+handlerInput.requestEnvelope.request.intent.slots.restaurants.value+' are 7';
               break;
           case "maaya Indian kitchen and bar":
               say+='Number of available tables in '+handlerInput.requestEnvelope.request.intent.slots.restaurants.value+' are 5';
               break;
           case "the crown pub and restaurant":
               say+='Number of available tables in '+handlerInput.requestEnvelope.request.intent.slots.restaurants.value+' are 3';
               break;
           default:
               say+='OOPS! I never thought about it...';
               break;
        }
        return responseBuilder
            .speak(say)
            .reprompt('try again, ' + say)
            .getResponse();
  }
};

const book_Handler =  {
    canHandle(handlerInput) {
        const request = handlerInput.requestEnvelope.request;
        return request.type === 'IntentRequest' && request.intent.name === 'Booking' ;
    },
    handle(handlerInput) {
        const request = handlerInput.requestEnvelope.request;
        const responseBuilder = handlerInput.responseBuilder;
        let sessionAttributes = handlerInput.attributesManager.getSessionAttributes();
        let restaurant=handlerInput.requestEnvelope.request.intent.slots.restaurants.value;

       let say = 'Okay! Let me check for available Tables.';
       switch (restaurant) {
           case "Andrea's restaurant":
               available=10;
               break;
           case "ask Italian restaurant":
               available=11;
               break;
           case "miraj Indian restaurant":
               available=5;
               break;
           case "Bombay palace restaurant":
               available=3;
               break;
           case "the ivy Marlow garden":
               available=8;
               break;
           case "the pointer":
               available=6;
               break;
           case "the potters arms":
               available=2;
               break;
           case "the 3 oaks":
               available=1;
               break;
           case "no5 London end":
               available=7;
               break;
           case "zizzi - Milton Keynes the hub":
               available=9;
               break;
           case "carriages":
               available=6;
               break;
           case "the plow Amersham":
               available=11;
               break;
           case "tiger garden":
               available=7;
               break;
           case "maaya Indian kitchen and bar":
               available=5;
               break;
           case "the crown pub and restaurant":
               available=3;
               break;
           default:
               say+='OOPS! I never thought about it...';
               break;
        }
       if(available==0){
           say+=" Sorry! Couldn't make it";
       }
       else{
           say+=" Hurray! There are available tables. I am booking a table for you.";
       }
        return responseBuilder
            .speak(say)
            .reprompt('try again, ' + say)
            .getResponse();
    },
};


const LaunchRequest_Handler =  {
    canHandle(handlerInput) {
        const request = handlerInput.requestEnvelope.request;
        return request.type === 'LaunchRequest';
    },
    handle(handlerInput) {
        const responseBuilder = handlerInput.responseBuilder;

        let say = 'hello' + ' and welcome to ' + invocationName + ' Here, you can ask the names of restaurants available in milton keyens and open hours of any restaurant of your choice';

        let skillTitle = capitalize(invocationName);


        return responseBuilder
            .speak(say)
            .reprompt('try again, ' + say)
            .withStandardCard('Welcome!', 
              'Hello!\nThis is a card for your skill, ' + skillTitle,
               welcomeCardImg.smallImageUrl, welcomeCardImg.largeImageUrl)
            .getResponse();
    },
};

const SessionEndedHandler =  {
    canHandle(handlerInput) {
        const request = handlerInput.requestEnvelope.request;
        return request.type === 'SessionEndedRequest';
    },
    handle(handlerInput) {
        console.log(`Session ended with reason: ${handlerInput.requestEnvelope.request.reason}`);
        return handlerInput.responseBuilder.getResponse();
    }
};

const ErrorHandler =  {
    canHandle() {
        return true;
    },
    handle(handlerInput, error) {
        const request = handlerInput.requestEnvelope.request;

        console.log(`Error handled: ${error.message}`);
        // console.log(`Original Request was: ${JSON.stringify(request, null, 2)}`);

        return handlerInput.responseBuilder
            .speak(`Sorry, your skill got this error.  ${error.message} `)
            .reprompt(`Sorry, your skill got this error.  ${error.message} `)
            .getResponse();
    }
};


// 2. Constants ===========================================================================

    // Here you can define static data, to be used elsewhere in your code.  For example: 
    //    const myString = "Hello World";
    //    const myArray  = [ "orange", "grape", "strawberry" ];
    //    const myObject = { "city": "Boston",  "state":"Massachusetts" };

const APP_ID = undefined;  // TODO replace with your Skill ID (OPTIONAL).

// 3.  Helper Functions ===================================================================

function capitalize(myString) {

     return myString.replace(/(?:^|\s)\S/g, function(a) { return a.toUpperCase(); }) ;
}

 
function randomElement(myArray) { 
    return(myArray[Math.floor(Math.random() * myArray.length)]); 
} 
 
function stripSpeak(str) { 
    return(str.replace('<speak>', '').replace('</speak>', '')); 
} 
 
 
const welcomeCardImg = { 
    smallImageUrl: "https://s3.amazonaws.com/skill-images-789/cards/card_plane720_480.png", 
    largeImageUrl: "https://s3.amazonaws.com/skill-images-789/cards/card_plane1200_800.png" 
 
 
}; 
 
 
function getCustomIntents() { 
    const modelIntents = model.interactionModel.languageModel.intents; 
 
    let customIntents = []; 
 
 
    for (let i = 0; i < modelIntents.length; i++) { 
 
        if(modelIntents[i].name.substring(0,7) != "AMAZON." && modelIntents[i].name !== "LaunchRequest" ) { 
            customIntents.push(modelIntents[i]); 
        } 
    } 
    return customIntents; 
} 
 
function getSampleUtterance(intent) { 
 
    return randomElement(intent.samples); 
 
} 
 
function getPreviousIntent(attrs) { 
 
    if (attrs.history && attrs.history.length > 1) { 
        return attrs.history[attrs.history.length - 2].IntentRequest; 
 
    } else { 
        return false; 
    } 
 
} 
 
function getPreviousSpeechOutput(attrs) { 
 
    if (attrs.lastSpeechOutput && attrs.history.length > 1) { 
        return attrs.lastSpeechOutput; 
 
    } else { 
        return false; 
    } 
 
} 

const InitMemoryAttributesInterceptor = { 
    process(handlerInput) { 
        let sessionAttributes = {}; 
        if(handlerInput.requestEnvelope.session['new']) { 
 
            sessionAttributes = handlerInput.attributesManager.getSessionAttributes(); 
 
            let memoryAttributes = getMemoryAttributes(); 
 
            if(Object.keys(sessionAttributes).length === 0) { 
 
                Object.keys(memoryAttributes).forEach(function(key) {  // initialize all attributes from global list 
 
                    sessionAttributes[key] = memoryAttributes[key]; 
 
                }); 
 
            } 
            handlerInput.attributesManager.setSessionAttributes(sessionAttributes); 
 
 
        } 
    } 
}; 
 
const RequestHistoryInterceptor = { 
    process(handlerInput) { 
 
        const thisRequest = handlerInput.requestEnvelope.request; 
        let sessionAttributes = handlerInput.attributesManager.getSessionAttributes(); 
 
        let history = sessionAttributes['history'] || []; 
 
        let IntentRequest = {}; 
        if (thisRequest.type === 'IntentRequest' ) { 
 
            let slots = []; 
 
            IntentRequest = { 
                'IntentRequest' : thisRequest.intent.name 
            }; 
 
            if (thisRequest.intent.slots) { 
 
                for (let slot in thisRequest.intent.slots) { 
                    let slotObj = {}; 
                    slotObj[slot] = thisRequest.intent.slots[slot].value; 
                    slots.push(slotObj); 
                } 
 
                IntentRequest = { 
                    'IntentRequest' : thisRequest.intent.name, 
                    'slots' : slots 
                }; 
 
            } 
 
        } else { 
            IntentRequest = {'IntentRequest' : thisRequest.type}; 
        } 
        if(history.length > maxHistorySize - 1) { 
            history.shift(); 
        } 
        history.push(IntentRequest); 
 
        handlerInput.attributesManager.setSessionAttributes(sessionAttributes); 
 
    } 
 
}; 

// 4. Exports handler function and setup ===================================================
const skillBuilder = Alexa.SkillBuilders.standard();
exports.handler = skillBuilder
    .addRequestHandlers(
        AMAZON_FallbackIntent_Handler, 
        AMAZON_CancelIntent_Handler, 
        AMAZON_HelpIntent_Handler, 
        AMAZON_StopIntent_Handler, 
        AMAZON_NavigateHomeIntent_Handler, 
        GetIndian_Handler, 
        GetItalian_Handler, 
        GetBritish_Handler,
        Openhours_Handler,
        table_Handler,
        book_Handler,
        LaunchRequest_Handler, 
        SessionEndedHandler
    )
    .addErrorHandlers(ErrorHandler)
    .addRequestInterceptors(InitMemoryAttributesInterceptor)
    .addRequestInterceptors(RequestHistoryInterceptor)
    .lambda();

// End of Skill code -------------------------------------------------------------
// Static Language Model for reference

const model = {
  "interactionModel": {
    "languageModel": {
      "invocationName": "bookatable",
      "intents": [
        {
          "name": "AMAZON.FallbackIntent",
          "samples": []
        },
        {
          "name": "AMAZON.CancelIntent",
          "samples": []
        },
        {
          "name": "AMAZON.HelpIntent",
          "samples": []
        },
        {
          "name": "AMAZON.StopIntent",
          "samples": []
        },
        {
          "name": "AMAZON.NavigateHomeIntent",
          "samples": []
        },
        {
          "name": "GetIndian",
          "slots": [],
          "samples": [
            "indian restaurants",
            "tell me the names of some indian restaurants"
          ]
        },
        {
          "name": "GetItalian",
          "slots": [],
          "samples": [
            "tell me tha names of italian restaurants",
            "italian restaurants"
          ]
        },
        {
          "name": "LaunchRequest"
        }
      ],
      "types": []
    }
  }
};