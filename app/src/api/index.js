const IP = 'http://192.168.0.105'
const FEEDS_URL = `${IP}:5000/feeds/`
const FEED_URL = `${IP}:5000/feed/`
const AUTHOR_URL = `${IP}:5000/feed_author/`
const CONTA_URL = `${IP}:5000/conta/`
const ADD_FEED_URL = `${IP}:5000/addfeed/`

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
export const getConta = async () => {
  return acessarUrl(CONTA_URL + pagina)
}

export const getFeed = async feedId => {
  return acessarUrl(FEED_URL + feedId)
}
export const getFeed_author = async author_id => {
  return acessarUrl(AUTHOR_URL + author_id)
}

export const getImagem = imagem => {
  return { uri: ARQUIVOS_URL + imagem }
}

export const addFeed = async(image, comentario, author_id = 1) => {
  return acessarUrl(ADD_FEED_URL + image.uri + "/" + comentario + "/" + author_id , "POST");
}
