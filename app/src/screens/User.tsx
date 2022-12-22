import { useState, useEffect } from 'react';
import { Alert, FlatList, TouchableOpacity} from 'react-native';
import {  VStack, useTheme,  Image, Text,  Row, Center, HStack, Flex } from 'native-base';
import { BlurView } from 'expo-blur';

import { HeaderFeed } from '../components/headerFeed';
import { FooterBar } from '../components/FooterBar';
import { Header } from '../components/Header';
import { useNavigation, useRoute } from '@react-navigation/native';
import LinearGradient from 'react-native-linear-gradient';

import { getFeed, getFeed_author, getImagem } from '../api';


export function User() {
  const [feed, setFeed ] = useState([])
  const [refreshing, setRefreshing] = useState(false)
  const [loading, setLoading] = useState(false)
  const navigation = useNavigation();
  
  
  const [user, setUser] = useState({})

  async function carregarfeed(author_id = 1, shouldRefresh= false)  {
    setLoading(true)
    const data = await getFeed_author(author_id)
    
    setFeed([data])
  
    setLoading(false)
  }
  
  useEffect(()=>{
        
    refreshList()
   },[])
  
   async function refreshList(){
    setRefreshing(true)
    await carregarfeed(1, true)
    setRefreshing(false)
  }
  
 
  return (
     <VStack flex={1} p={6} pb={0}  bg="gray.600">
     <Header
     bg="gray.600"
     title="Perfil do Usuário"/>
     
     <Center
     bg="gray.600"
     paddingBottom={5}
     >
      
      
      
           
      </Center>
      <BlurView
      
            tint="light"
            intensity={80}
            style={{
              
              flex:1,
              borderTopRightRadius:20,
              borderTopLeftRadius:20,
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            
          
            
      <FlatList
      
      data={feed}
      keyExtractor={post => String(post.id)}
      onRefresh={refreshList}
      refreshing={refreshing}
      numColumns={2}
      renderItem={({ item }) => (
        
        <VStack marginTop={6}>
         <TouchableOpacity 
          onPress={()=>
            
            navigation.navigate('feedDetails',{feedId: item.id})}
          ><LinearGradient
          colors={['#fff', '#fff']}
          style={{
          marginRight:10,
          marginLeft:10,
          borderColor: 'rgba(255,255,255,0.3)',
          borderRadius: 20,
          borderWidth: 2}}
        >
          <Image 
          style={{width: 150, height: 150,borderRadius:10}}
          
          alt="imagem"
          source={getImagem(item.blobs[0].file)} />
          </LinearGradient>
          </TouchableOpacity>
          
          
          
          

        </VStack>
        )}
     
      />
      
      </BlurView>
    </VStack>
  
  );
}