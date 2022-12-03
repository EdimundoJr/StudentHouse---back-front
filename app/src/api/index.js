const IP = 'http://192.168.0.105'
const FEEDS_URL = `${IP}:5000/`
const FEED_URL = `${IP}:5000/`

const ARQUIVOS_URL = `${IP}:5004/`

const acessarUrl = async (url, metodo = 'GET') => {
  let promise = null

  console.log('acessando a url:', url)

  try {
    resposta = await fetch(url, { method: metodo })
    if (resposta.ok) {
      promise = Promise.resolve(resposta.json())
    } else {
      promise = Promise.reject(resposta)
    }
  } catch (erro) {
    promise = Promise.reject(erro)
  }

  return promise
}

export const getFeeds = async pagina => {
  return acessarUrl(FEEDS_URL + pagina)
}

export const getFeed = async feedId => {
  return acessarUrl(FEED_URL + feedId)
}

export const getImagem = imagem => {
  return { uri: ARQUIVOS_URL + imagem }
}
