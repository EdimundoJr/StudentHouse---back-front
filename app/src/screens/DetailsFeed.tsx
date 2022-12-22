import React from 'react';
import { useState, useEffect } from 'react';
import { HStack, Image, VStack, FlatList, Text, Row } from 'native-base';


import {   useRoute } from '@react-navigation/native';


import { FooterBar } from '../components/FooterBar';
import { Header } from '../components/Header';
import { getFeed, getImagem } from '../api';


export function DetailsFeed() {
  const [feed, setFeed ] = useState([])
  const [refreshing, setRefreshing] = useState(false)
  const [loading, setLoading] = useState(false)
  
 
  const route = useRoute()
  const { feedId } = route.params
  
   
    
 async function carregarfeed(feedId, shouldRefresh= false)  {
  setLoading(true)
  const data = await getFeed(feedId)

  setFeed([data])
  
  setLoading(false)
  
}

useEffect(()=>{
      
  refreshList()
 },[])

 async function refreshList(){
  setRefreshing(true)
  await carregarfeed(feedId, true)
  setRefreshing(false)
  
}

    
      return (
      <VStack flex={1} bg="gray.100">
      <Header
      title="Detalhe do Feed"/>

      <HStack
      flex={1}
      >
       
        <FlatList
      data={feed}
      keyExtractor={post => String(post.id)}
      onRefresh={refreshList}
      refreshing={refreshing}
      renderItem={({ item }) => (
        
        <VStack >
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
          
          <Image 
          style={{width: 500, height: 400}}
          
          alt="imagem"
          source={getImagem(item.blobs[0].file)}/>
          
          
          <Text
          style={{padding: 10, lineHeight:18}}
          >
            
            {item.authors.name} {": "}
          {item.description}
                           
          </Text>

        </VStack>
        )}
     
      />
      </HStack>
      
      <FooterBar/>
        
     
      
    </VStack>
  );
    
}