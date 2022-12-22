import React, { useState, useEffect } from 'react';
import { IconButton, useTheme, VStack, Image, HStack,Text } from 'native-base';
import {  Image as Teste, ArrowLeft } from 'phosphor-react-native';
import{ TouchableOpacity, StyleSheet} from 'react-native'

 


import * as ImagePicker from 'expo-image-picker';
import { Button } from '../components/Button';
import { Input } from '../components/Input';
import { CardDetails } from '../components/CardDetails';
import { useNavigation } from '@react-navigation/native';

import Logo from '../assets/logo_feed.svg';
import { addFeed } from '../api';


export function AddPhotos() {
  const { colors } = useTheme()
  const [imagem, setImagem] = useState(null);
  const [comentario, setComentario] = useState(null);
  const navigation = useNavigation();

  const pickImage = async () => {
  

    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      //allowsEditing: true,
      quality: 1,
    });

    console.log(result);

    if (!result.cancelled) {
      setImagem(result);
    }
   

  };
  async function uploadImage() {
    addFeeds()
    navigation.goBack()
  }
  
  async function addFeeds(){
     
    await addFeed(imagem,comentario)

  }
  function handleBack() {
    navigation.goBack()
  }

  const styles = StyleSheet.create({
    
    Center: {
      alignItems: "center",
      padding: 10
    }
  });

  return (
    <VStack flex={1} bg="gray.700">

    <HStack
        
        justifyContent="space-between"
        alignItems="center"
        bg="gray.600"
        pt={12}
        pb={5}
        px={6}
      >
        <IconButton
          icon={<ArrowLeft
            weight="thin"
            size={26} 
            color={colors.gray[300]}
            
            />}
            onPress={handleBack}
        />
        <Logo 
        />

       <IconButton></IconButton>
      </HStack>
      

      
      <CardDetails
     
      title="Adicionar Imagem"
      icon={Teste}
      description={null}
      footer={null}
      
      >
      <TouchableOpacity
      style={styles.Center}
      onPress={pickImage}
      >
     <Image
      color="gray.300"
      alt='teste'
      width="400"
      height="300"
       
     source={{uri : imagem 
                  ? imagem.uri 
                  : 'https://cdn.icon-icons.com/icons2/510/PNG/512/images_icon-icons.com_50365.png' }}
                  
     />
      <Text
      color="gray.300"
      >Selecione uma imagem clicando aqui!</Text>
      </TouchableOpacity>
      <Input
      placeholder='Adicionar um Comentário'
      height="50"
      onChangeText={setComentario}
      />
      <Button title="Postar no Feed" onPress={uploadImage} mt={4} />
      
     
      </CardDetails>
     
     
    </VStack>
    
  );
  
}

