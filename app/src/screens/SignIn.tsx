import { useState } from 'react'
import  auth  from '@react-native-firebase/auth'
import { Alert } from 'react-native'
import { VStack, Heading , Icon , useTheme} from 'native-base'
import { Envelope , Key } from 'phosphor-react-native'

import Logo from '../assets/logo_primary.svg'

import { Input } from '../components/Input'
import { Button } from '../components/Button'

export function SignIn(){
  const [isLoading, setIsLoading] = useState(false)
  const [ email, setEmail ] = useState('');
  const [ password, setPassword ] = useState('');

  const { colors } = useTheme();

  function handleSignIn(){

    if(!email || !password){
      return Alert.alert("Falha ao Entrar", "Informe e-mail e senha.")
    }

    setIsLoading(true)

    auth()
    .signInWithEmailAndPassword(email, password)
    .catch((error) =>{
      console.log(error)
      setIsLoading(false)

      if(error.code === 'auth/invalid-email'){
        return Alert.alert("", "E-mail inválido")
      }
      if(error.code === 'auth/wrong-password'){
        return Alert.alert("", "E-mail e/ou senha inválido(s)")
      }
      if(error.code === 'auth/user-not-found'){
        return Alert.alert("", "E-mail e/ou senha inválido(s)")
      }

      return Alert.alert('', 'Não foi possível acessar');

      
    })


  }

  return(
    <VStack flex={1} alignItems="center" bg="gray.600" px={8} pt={24} >
      <Logo />

     <Heading color="gray.100" fontSize="xl" mt={20} mb={6}>
    Acesse sua Conta 
     </Heading>

     <Input placeholder="E-mail"
      mb={4} 
      InputLeftElement={<Icon as = {<Envelope color={colors.gray[300]}/>} ml={4} />}
      onChangeText = {setEmail}
     />
     <Input placeholder="Senha"
      mb={5}
      InputLeftElement={<Icon as = {<Key color={colors.gray[300]}/>} ml={4} />}
      secureTextEntry
      onChangeText={setPassword}
      />
   <Button 
   title='Entrar' 
   w="full" 
   onPress={handleSignIn}
   isLoading ={isLoading}
    />
    </VStack>
  )
}