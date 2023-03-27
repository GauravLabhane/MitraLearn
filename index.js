const express = require('express');
const cors = require('cors');

// const { GPT } = require('@openai/api');
const authorization = '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';
const { Configuration, OpenAIApi } = require("openai");
const configuration = new Configuration({
    apiKey: authorization,
});
const _ = require('underscore');
const openai = new OpenAIApi(configuration);

const Sequelize = require('sequelize');
// const sequelize = new Sequelize('chatgptbot', 'adityakale', '', {
//     host: 'localhost',
//     port: 5432,
//     dialect: 'postgres',
//     logging: false
// });

const sequelize = new Sequelize('chatgptbot', 'admin', 'stxZme2l', {
    host: 'mysql-118019-0.cloudclusters.net',
    port: 10049,
    dialect: 'mysql',
    logging: false
});




const User = require(`${__dirname}/models/User.js`)(sequelize)
const Message = require(`${__dirname}/models/Message.js`)(sequelize)

// const User = sequelize.import('./models/User.js');
// const Message = sequelize.import('./models/Message.js');

const options = 
    {
        '100': 'Press 1 for Basic Vocabulary',
        '101': 'Press 2 for Advanced Vocabulary',
        '102': 'Press 3 to Play Vocabulary Games',
        '103': 'Press 4 for Grammar Lessons',
        '104': 'Press 5 for Pronunciation Exercises'
    }

const resArr = 
    {
        100: 'I want to learn Basic Vocabulary suggest me some words meanings in hindi',
        101: 'I want to learn Advanced Vocabulary suggest me some words meanings in hindi',
        102: 'I want to learn Play Vocabulary Games with you in hindi',
        103: 'I want to learn Grammar Lessons with you in hindi',
        104: 'I want to learn Pronunciation Exercises with you in hindi'
    }

let chatHiatory = [
    {"role": "system", "content": "You are a Female english teacher. You understand hindi and hinglish inputs. you have to teach english to a blue worker. you have to accept both hindi and hinglish input and respond in hindi."},
    {"role": "system", "content": "Always respond in hindi or hinglish as user does not know to read english"},
    {"role": "user", "content": "I am a blue collar worker from india and i  know hindi and I want to learn basic english.tell me some common sentences that i can use daily work and give their hindi explaination. "},
    {"role": "assistant", "content": "Hello"}
]

const chatHiatoryCreate = [{role: "system", content: "You are a english teacher."},
   {role: "user", content: "I am a blue collar worker from india and i  know hindi and I want to learn basic english.tell me some common sentences that i can use daily work and give their hindi explaination."},
   {role: "assistant", content: "Hello"}
]
const app = express();
const port = 3001;

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*"); // update to match 
    // the domain you will make the request from
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
    });
// const gpt = new GPT({
//   apiKey: 'YOUR_API_KEY_HERE',
//   engine: 'davinci',
// });

app.use(express.json());


// app.use(cors({
//     origin: ['http://localhost:3000/', 'http://192.168.1.5:3000', 'http://localhost:19006', 'https://200d-2409-40f2-100f-69e3-807a-5fb1-91f9-714c.in.ngrok.io']
// }));

app.use(cors({
    origin: '*'
}));

app.get('/getAllMessageForUser', async (req, res) => {
    try {
        let name = req.query.name;
        console.log(name, 'name');
        let user  = await User.findOne({
            where: {
                name: name
            }
        })
        if(!user) {
            return res.json({messages: []})

        }

        let messages = await Message.findAll({
            where: {
                userid: user.id
            },
            order: [
                ['id', 'ASC']
            ],
        })
    
        // return messages;
        return res.json({messages})

    } catch (error) {
        console.error(error);
        return [];
    }
})

app.post('/postMessage', async (req, res) => {
    try{
        console.log(req.body, 'req.bodypostMessage')
  let { message, name } = req.body;
  let newUser = false;
// const user = await sequelize.query(`select count(1) as count from users where name = '${name}'`,  { raw: true });
let user  = await User.findOne({
    where: {
        name: name
    }
    
})
// console.log(JSON.stringify(user, null, 2));
if(!user) {
    newUser = true;
    user =await User.create({name});
    // console.log(JSON.stringify(user, null, 2));
    // const toBeCreatedMessages = [];
    for(let key in chatHiatoryCreate) {
        // let message = {};
        // message.message = key;
        // toBeCreatedMessages
        // console.log(key);
        chatHiatoryCreate[key].userid = user.id;
        // chatHiatoryCreate[key].role =
    }
    // console.log(chatHiatoryCreate);
    await Message.bulkCreate(chatHiatoryCreate);
} else {
    let messages = await Message.findAll({
        where: {
            userid: user.id
        },
        order: [
            ['id', 'ASC']
        ],
    })


    // chatHiatory = _.pluck(messages, 'message')
    chatHiatory = _.map(messages, (message) => {
        // console.log(message)
        // return JSON.parse(message.message)
        return {role: message.role, content:message.content}
    })
    console.log(chatHiatory)
    
}
console.log(resArr[message], 'QQQQQQQQQ', message);
if(resArr[message]) {
    message = resArr[message];
}

chatHiatory.push({"role": "user", "content": message + '. and give your response in hindi or hinglish'})
await Message.create({
    content: message.toString(),
    userid: user.id,
    role: "user",
})

console.log(JSON.stringify(chatHiatory, null, 2));

const completion = await openai.createChatCompletion({
    model: "gpt-3.5-turbo",
    //chat history
    messages: chatHiatory,
    // max_tokens: 100
  });

  await Message.create({
    content: completion.data.choices[0].message.content.toString(),
    // content: message.toString(),
    userid: user.id,
    role: "assistant",
})
// await Message.create({
//     content: 'How Are you',
//     // content: message.toString(),
//     userid: user.id,
//     role: "assistant",
// })
//   chatHiatory.push({"role": "assistant", content: completion.data.choices[0].message.content});



// if(!newUser) {
//     const messages = await sequelize.query('select * from messages', null,
//     {raw: true})

//     console.log(messages)
// } else {

// }
// console.log(await User.findAll())
//   await 
//   if (!message) {
//     return res.status(400).send({ error: 'Missing message' });
//   }
//   console.log(chatHiatory);
//   chatHiatory.push({"role": "user", "content": message})
//   const completion = await openai.createChatCompletion({
//     model: "gpt-3.5-turbo",
//     //chat history
//     messages: chatHiatory,
//   });

//   chatHiatory.push({"role": "assistant", content: completion.data.choices[0].message.content});

//   const text = completion.data.choices[0].message.content;

  return res.send({ message: completion.data.choices[0].message.content, options: Object.values(options) });
} catch (err) {
    console.error(err);
}
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
