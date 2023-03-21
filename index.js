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
    {"role": "user", "content": "I am Pradip, a blue collar worker from india who knows hindi and I want to learn basic english "},
    {"role": "assistant", "content": "Hello, Pradip. That's awesome! lrts start with some simple sentences"},
    {"role": "user", "content": "Okay"}
]
let ask = true;
 const question = async function(input = {}) {
    let query = input.question;
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
 }

// question({question: ''});
// question({question: 'ask next question'});
// while(2) {
    // ask = false;
    readline.question('enter: ', que => {
        question({question: que});
        readline.close();
      });    
      readline.question('enter: ', que => {
        question({question: que});
        readline.close();
      });  
      readline.question('enter: ', que => {
        question({question: que});
        readline.close();
      });  
// }




