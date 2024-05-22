import axios from "axios";


export const sendMessage=async(message,history) => {

try {
    
    const data = await axios.post("http://localhost:3030/message",{
        message: message,
        history: history,
    });
    const text = data.data;
    console.log(data);
    console.log(text);

    return text;
} catch (error) {
    console.log(error);
}


    
};


