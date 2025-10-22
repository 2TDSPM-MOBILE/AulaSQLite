import { useRouter } from "expo-router";
import { useState } from "react";
import { Button, TextInput, View,Alert } from "react-native";
import { addNote } from "@/src/db/notes";
import { MotiView,MotiText } from "moti";

export default function AddNoteScreen(){
    const[title,setTitle]=useState('')
    const[content,setContent]=useState('')
    const router = useRouter()//Hook de navegação

    //Função chamada quando pressionado o botão salvar
    function handleSave(){
        if(!title.trim()){
            Alert.alert("Atenção","Digite um título para a nota.")
            return
        }

        addNote(title,content)//Adiciona no banco de dados
        
        router.back()//Retorna para a tela inicial

    }
    return(
        <View style={{flex:1,padding:20}}>
            <MotiView
                from={{opacity:0,translateX:-30}}
                animate={{opacity:1,translateX:0}}
                transition={{delay:300}}
            >
                <TextInput
                 placeholder="Título"
                 value={title}
                 onChangeText={(value)=>setTitle(value)}
                 style={{
                    borderWidth:1,
                    padding:10,marginBottom:10,
                    borderRadius:6
                }}
                />
            </MotiView>
             
             
            <MotiView
                from={{opacity:0,translateX:30}}
                animate={{opacity:1,translateX:0}}
                transition={{delay:300}}
            >
                <TextInput
                placeholder="Conteúdo"
                value={content}
                onChangeText={(value)=>setContent(value)}
                multiline
                style={{
                    borderWidth:1,height:120,
                    padding:10,marginBottom:10,
                    borderRadius:6
                }}
            />
            </MotiView>
           
            <MotiView
                from={{scale:1}}
                animate={{scale:1.1}}
                transition={{
                    loop:true,
                    type:"timing",
                    duration:2000
                }}
            >
                <Button title="Salvar" onPress={handleSave} />
            </MotiView>
            
        </View>
    )
}