import axios from "axios";

//Interface TypeScript para tipar a resposta da API de tradução
interface TranslationResponse{
    responseData:{
        translatedText:string
    }
}

//Configurações constantes da API
const API_CONFIG = {
    url: "https://api.mymemory.translated.net/get",
    retries:3, // Número máximo de tentativas em caso de erro
    delay: 1000, // Atraso entre as tentativas (ms)
    timeout:10000 //Tempo máximo de espera por resposta 
}

async function makeTranslationRequest(text:string):Promise<string>{
    //Configuração de requisição do get
    const requestConfig = {
        params:{
            q:text,
            langpair:'pt|en'
        },
        headers:{
            'Accept':'*/*', //Aceita qualquer tipo de resposta
            'Accept-Encoding':'gzip,deflate,br', //Compactação
            'Connection':'keep-alive' //Mantém a conexão aberta
        },
        timeout: API_CONFIG.timeout
    };

    //Chama a API usando o Axios e tipa a resposta
    const response = await axios.get<TranslationResponse>(API_CONFIG.url,requestConfig)

    //Retonar o texto traduzido
    return response.data.responseData.translatedText
}

export async function translateToEnglish(text:string):Promise<string>{
    //Se o texto estiver vazio, retorna imediamente uma sring vazia
    if(!text.trim()) return "";

    //Loop de retry
    for(let attemp = 1 ; attemp<=API_CONFIG.retries;attemp++){
        try{
            return await makeTranslationRequest(text)
        }catch(error){
            console.log(`Tentativa N°${attemp} - Erro: `,error)
            
            //Se ainda tiver tentativas disponívels, incluimos um delay
            if(attemp<API_CONFIG.retries){
                await new Promise(resolve=>setTimeout(resolve,API_CONFIG.delay * attemp))
            }
        }
    }
    return "" //Retorna uma string vazia
}
