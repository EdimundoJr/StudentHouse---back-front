import React from 'react';
import { useState, useEffect } from 'react';
import { Alert } from 'react-native';

import {  VStack,  Image, FlatList, Text, Row, IconButton,HStack, useTheme} from 'native-base';
import {   TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import {  SignOut, PlusCircle } from 'phosphor-react-native';
import auth from '@react-native-firebase/auth';
import { Loading } from '../components/Loading';


import { FooterBar } from '../components/FooterBar';
import {  getFeeds, getImagem } from '../api';
import Logo from '../assets/logo_feed.svg';



export function Feed() {
  const [feed, setFeed ] = useState([])
  const [page, setPage ] = useState(0)
  const [total, setTotal ] = useState(0)
  const [loading, setLoading] = useState(false)
  const [refreshing, setRefreshing] = useState(false)
  const { colors } = useTheme()
  const navigation = useNavigation();


  function handleGoAddPhotos() {
    navigation.navigate('addPhotos')
  }

  function handleLogout() {
    auth()
      .signOut()
      .catch(error => {
        console.log(error);
        return Alert.alert('Sair', 'Não foi possível sair.');
      });
  }
 
  
  async function loadPage(pageNumber = page, shouldRefresh= false) {
    if(total && pageNumber > total) return
    
    setLoading(true)

    const data = await getFeeds(pageNumber)
  
    
    const totalItens = pageNumber
    
    setTotal(Math.floor(totalItens / 5))
    setFeed(shouldRefresh ? data : [...feed,...data])
    setPage(pageNumber + 5)
    setLoading(false)

  }

  useEffect(()=>{
      
   loadPage()
  },[])

  async function refreshList(){
    setRefreshing(true)
    await loadPage(5, true)
    setRefreshing(false)
  }


    
  return (
    <VStack flex ={1} bg="gray.600">
      
      <HStack
        
        justifyContent="space-between"
        alignItems="center"
        bg="gray.600"
        pt={10}
        pb={5}
        px={6}
      >
        <IconButton
          icon={<PlusCircle
            weight="thin"
            size={26} 
            color={colors.gray[300]}
            
            />}
            onPress={handleGoAddPhotos}
        />
        <Logo 
        />

        <IconButton
          icon={<SignOut size={26} color={colors.gray[300]} />}
          onPress={handleLogout}
        />
      </HStack>
      
      <FlatList
      data={feed}
      keyExtractor={post => String(post.id)}
      onEndReached={()=> loadPage()}
      onEndReachedThreshold={0.1}
      ListFooterComponent={loading && <Loading />}
      onRefresh={refreshList}
      refreshing={refreshing}
      renderItem={({ item }) => (
      
        <VStack 
        bg="gray.100"
          marginTop={6}>
          
            
          <Row
          padding={2}
          alignItems="center" 
                    
          >
          <Image      
            style={{width: 50, height: 50, borderRadius:25, marginRight:10}}
            
            alt="avatar"
            source={getImagem(item.authors.avatar)}/>
            <Text
            style={{color:"#333", fontWeight:"bold", fontSize:20}}
            >{item.authors.name}</Text>
           
          </Row>
          <TouchableOpacity 
          onPress={()=>
            
            navigation.navigate('feedDetails',{feedId: item._id})}
          >
          <Image 
      
          style={{width: 400, height: 400, borderBottomRightRadius:50,borderTopRightRadius:50,borderBottomLeftRadius:50, margin:5}}
          
          alt="imagem"
          source={getImagem(item.blobs[0].file)} />
          </TouchableOpacity>
          
          <Text
          style={{padding: 10, lineHeight:18}}
          >
            
          {item.authors.name} {": "}
          {item.description}
                           
          </Text>
        

        </VStack>
        )}
     
      />
      
        
      <FooterBar/>
     
    </VStack>
  );
  
}



