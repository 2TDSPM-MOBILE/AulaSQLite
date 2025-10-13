import { getNotes } from "@/src/db/notes";
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

  return (
    <View>
      <Button title="Adicionar nota" onPress={() => router.push("/add")} />
      <FlatList
        data={notes}
        renderItem={({ item }) => (
          <View style={{borderBottomWidth:1, padding:10,marginBottom:5}}>
            <Text style={{fontSize:16}}>{item.title}</Text>
            <Text>{item.content}</Text>
          </View>
        )}
      />
    </View>
  );
}
