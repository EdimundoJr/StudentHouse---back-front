from flask import Flask, jsonify
import mysql.connector as mysql
import urllib.request

servico = Flask(__name__)



MYSQL_SERVER = "localhost"
MYSQL_USER = "root"
MYSQL_PASS = "admin"
MYSQL_DB = "studenthouse"


def get_conexao_bd():
    conexao = mysql.connect(
        host=MYSQL_SERVER, user=MYSQL_USER, password=MYSQL_PASS, database=MYSQL_DB
    )

    return conexao

def acessar(url):
    resposta = urllib.request.urlopen(url)
    dados = resposta.read()

    return dados.decode("utf-8")



def gerar_feed(registro):
    feed = {
        "_id": registro["feed_id"],
        "authors": {
            "authors_id": registro["authors_id"],
            "avatar": registro["avatar"],
            "name": registro["nome_authors"]
            
        },
        "product": {
            "blobs": [
                {
                    "type": "image",
                    "file": registro["imagem"]
                }
            ]
        }
    }

    return feed


@servico.route("/feeds/<int:pagina>")
def get_feeds(pagina):
    feeds = []

    conexao = get_conexao_bd()
    cursor = conexao.cursor(dictionary=True)
    cursor.execute(
        "SELECT feeds.id as feed_id , "+
        "authors.name as nome_authors , authors.avatar, feeds.comentario, feeds.imagem "+
        "FROM feeds "+
        "join authors   on   feeds.authors_id = authors.id "+
		"ORDER BY feeds.id desc "+
        "LIMIT  = " + str(5)
    )
    registros = cursor.fetchall()
    conexao.close()

    for registro in registros:
        feeds.append(gerar_feed(registro))
 
    return jsonify(feeds)


@servico.route("/feed/<int:feed_id>")
def get_feed(feed_id):
    feed = []

    conexao = get_conexao_bd()
    cursor = conexao.cursor(dictionary=True)
    cursor.execute(
        "SELECT feeds.id as feed_id , "+
        "authors.name as nome_authors , authors.avatar, feeds.comentario, feeds.imagem "+
        "FROM feeds "+
        "join authors   on   feeds.authors_id = authors.id "+
		"ORDER BY feeds.id desc "+
        "AND feeds.id = " + str(feed_id) +
        " LIMIT  = " + str(5)
       
    )
    registro = cursor.fetchone()
    conexao.close()

    if registro:
     feed = gerar_feed(registro)
 
    return jsonify(feed)


if __name__ == "__main__":
    servico.run(
        host="0.0.0.0",
        debug=True
    )
