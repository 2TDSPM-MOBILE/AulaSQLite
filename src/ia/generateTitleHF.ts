//Importa o Axios para realização de requisões HTTP:
import axios from "axios"

//Token HF
const HF_API_KEY = process.env.EXPO_PUBLIC_HF_API_KEY

export async function generateTitleFromContentHF(content:string){
    //Se o conteúido estiver vazio, retorna string vazia
    if(!content.trim()) return "";

    try{
        //Requisição POST para a API
        const response = await 
        axios.post("https://api-inference.huggingface.co/models/facebook/bart-large-cnn",//URL do modelo
            {
                inputs:content,
                parameters:{
                    max_length:20,   //Tamanho máximo da título gerado.
                    min_length:3,    //Tamanho mínimo do título gerado.
                    do_sample:false, //Se true, gera variações aleatórias.
                    early_stopping:true //encerra a geração assim que o modelo achar adequado
                }
            },
            {
                headers:{
                    Authorization:`Bearer ${HF_API_KEY}`,//Autenticação
                    "Content-Type":"application/json" //Tipo de conteúdo
                }
            }
        )

        const generatedText = response.data?.[0]?.summary_text || response.data?.[0]?.generated_text|| ""

        //Retornar o título sem epaço inicial e espaço final
        return generatedText.trim()

       
    }catch(error){
        console.log("Erro HF para geração do título: ", error)
        return ""
    }

}

