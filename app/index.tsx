import { deleteNote, getNotes } from "@/src/db/notes";
import { useFocusEffect, useRouter } from "expo-router";
import { useCallback, useState } from "react";
import { Button, FlatList, Text, View } from "react-native";

export default function HomeScreen() {
  const [notes, setNotes] = useState<any[]>([])//Estado para armazenar as notas
  const router = useRouter()//hook de navegação

  //Sempre executa quando a tela volta a ser foco
  useFocusEffect(
    useCallback(() => {
      setNotes(getNotes())//Carregar todas as notas salvas no banco
    }, [])
  )

  //Função para deletar a note
  function handleDelete(id:number){
    deleteNote(id)//Deleta do banco
    setNotes(getNotes())//Atualiza a lista
  }

  return (
    <View>
      <Button title="Adicionar nota" onPress={() => router.push("/add")} />
      <FlatList
        data={notes}
        renderItem={({ item }) => (
          <View style={{borderBottomWidth:1, padding:10,marginBottom:5}}>
            <Text style={{fontSize:16,fontWeight:'bold'}}>{item.title}</Text>
            <Text>{item.content} - ID:{item.id}</Text>
            <View style={{flexDirection:'row',gap:5}}>
              {/* Botão de editar a nota*/}              
                <Button 
                  title="Editar" 
                  onPress={()=>router.push(`./edit/${item.id}`)}
                />              

              {/* Botão para deletar a nota */}              
                <Button 
                  title="Deletar" 
                  color='red' 
                  onPress={()=>handleDelete(item.id)}/>              
            </View>
          </View>
        )}
      />
    </View>
  );
}
