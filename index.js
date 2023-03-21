const authorization = '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';
const s = require("readline");
const readline = s.createInterface({
    input: process.stdin,
    output: process.stdout
  });
  



const { Configuration, OpenAIApi } = require("openai");

const configuration = new Configuration({
  apiKey: authorization,
});

const openai = new OpenAIApi(configuration);
const chatHiatory = [
    {"role": "system", "content": "You are a english teacher."},
    {"role": "user", "content": "I am Pradip, a blue collar worker from india who knows hindi and I want to learn basic english.tell me some common sentences that i can use daily work and give their hindi explaination. "},
    {"role": "assistant", "content": "Hello, Pradip. That's awesome! say start to start"}
]
let ask = true;
 const question = async function(input = {}) {
    let query = input.question;
    try {
    chatHiatory.push({"role": "user", "content": query})
    const completion = await openai.createChatCompletion({
        model: "gpt-3.5-turbo",
        //chat history
        messages: chatHiatory,
      });
    
      chatHiatory.push({"role": "assistant", content: completion.data.choices[0].message.content});
      ask = true;
      console.log(query, '\n', completion.data.choices[0].message.content);
      return true;
    } catch (err) {
        console.log(err);
    }
 }

// question({question: ''});
// question({question: 'ask next question'});
// while(2) {
    // ask = false;
    readline.question('enter: ', que => {
        question({question: que});
        readline.close();
      });    

// }




