
/**
 * Sample prompt of a progressive pizza app
 * 
 * menu = """
pepperoni pizza  12.95, 10.00, 7.00 \
cheese pizza   10.95, 9.25, 6.50 \
eggplant pizza   11.95, 9.75, 6.75 \
fries 4.50, 3.50 \
greek salad 7.25 \
Toppings: \
extra cheese 2.00, \
mushrooms 1.50 \
sausage 3.00 \
canadian bacon 3.50 \
AI sauce 1.50 \
peppers 1.00 \
Drinks: \
coke 1.00, 2.00, 3.00 \
sprite 3.00, 4.00, 5.00 \
bottled water 5.00 \
"""

instruction =  """
You are OrderBot, an automated service to collect orders for a pizza restaurant. \
You first greet the customer, then collects the order, \
and then asks if it's a pickup or delivery. \
You wait to collect the entire order, then summarize it and check for a final \
time if the customer wants to add anything else. \
Finally you collect the payment.\
If it's a delivery, you ask for an address. \
Make sure to clarify all options, extras and sizes to uniquely \
identify the item from the menu.\
You respond in a short, very conversational friendly style. \
The menu includes \
"""
*
 */
/**
 * 
 * # remember install openai using: pip install openai
import os
import openai
openai.api_key = "sk-***"  # your openai api key you registered on the openai.

conversation = [
    {"role": "system", "content": f"""{instruction}{menu}""" },
    {"role": "user", "content": "hi"}  # This make the API complete for one turn.
]

while(True):
    response = openai.ChatCompletion.create(
        model="gpt-3.5-turbo",
        messages = conversation,
        temperature=0  # Try to as deterministic as possible.
    )
    reply = response.choices[0].message["content"]
    print("\nBot:" + reply + "\nUser:")
    conversation.append({"role": "assistant", "content": reply})
    user_input = input()
 */

    export interface PromptConfig{
        aiAssistantRole: string;
        userRole: string;
        serviceName: string;
        userInput: PromptUserInput[];
        instructions: string[];
    }
    export interface stringDataSet {[string:string]:string}
    export interface PromptUserInput extends stringDataSet{
        inputDescription: string;
        inputData: string;
    }
    export interface PromptResponse {
        responseText:string;
        promptText:string;
        isProgressive: boolean;
        previousIndexedResponse: PromptResponse[];
        responseTime:string;
    }

export class PromptManager {
    // a prompt that has 4 part. 
    //part 1 is role of chatgpt, 
    //part 2 is role of user, 
    //part 3 is user input data 
    //and part 4 is set of instructions to perform. 
    //all parts should be easily identifiable. 
    //part 4 should be list of instructions
    
    // Sample
    //Imagine you are a prompt writer for a virtual assistant. 
    //The user is a student seeking help with a research paper on [topic of choice].
    //The user has gathered various sources including articles, books, and websites. 
    //Your task is to guide the user on how to best organize and synthesize this information for their paper. 
    //Provide a step-by-step list of instructions on how to effectively incorporate the gathered data into the research paper.

    private basePromptTemplate:string = `
    Imagine you are a {aiAssistantRole} for a {serviceName} service. 
    
    {instructions}
    {userInput}
    `;
    private promptUserInputTemplate:string = `
        {inputDescription}
        {inputData}

    `;
    private primaryInstructions:string[] = [
        "provide result in json format",
        "result json should have 2 parameters, responseText and responseTime",
        "responseText parameter should contain the result",
        "responseTime parameter should show the time taken for generating the result"
    ];
    constructor(private _prompt?:PromptConfig){
        if(_prompt != null){
            this.promptConfig = _prompt;
        }
    }

    get isValidInput():boolean {
        return false;
    }

    get generatedPrompt():string | null{
        if (this._prompt == null) {
            return null;
        }
        const userInput = this._prompt.userInput.map(un => this.multiStringReplace(un, this.promptUserInputTemplate)).join('\n');
        const instructions = this._prompt.instructions.join('\n');
        const replacingDataset:stringDataSet = {
            "aiAssistantRole": this._prompt.aiAssistantRole,
            "serviceName": this._prompt.serviceName,
            instructions,
            userInput
        } 
        return this.multiStringReplace(replacingDataset, this.basePromptTemplate);
    }

    set promptConfig(prompt:PromptConfig){
        if(this._prompt == null){
            this._prompt = {
                aiAssistantRole: "Anonimas",
                instructions: [],
                serviceName: "",
                userInput: [],
                userRole: ""
            }
        }
        this._prompt.userInput = [{
            inputDescription: "user details is as below",
            inputData: `
            
            `
        },
        ...prompt.userInput
    ]
        this._prompt.instructions.push(...this.primaryInstructions, ...prompt.instructions);
        this._prompt.aiAssistantRole = prompt.aiAssistantRole;
        this._prompt.serviceName = prompt.serviceName;
    }

    getResponse():PromptResponse | null{
        return null;
    }
    private multiStringReplace(object:stringDataSet, stringInput:string):string {
        let val = stringInput;
        var entries = Object.entries(object);
        entries.forEach((para)=> {
            var find = '{' + para[0] + '}'
            var regExp = new RegExp(find,'g')
         val = val.replace(regExp, para[1])
      })
    return val;
  }
    
}