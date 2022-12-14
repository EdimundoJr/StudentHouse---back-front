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

        "blobs": [
            {
                "type": "image",
                "file": registro["imagem"]
            }
        ],

        "description": registro["comentario"],

        "authors": {
            "authors_id": registro["authors_id"],
            "name": registro["nome_authors"],
            "avatar": registro["avatar"]


        }

    }

    return feed


@servico.route("/feeds/<int:pagina>")
def get_feeds(pagina):
    feeds = []

    conexao = get_conexao_bd()
    cursor = conexao.cursor(dictionary=True)
    cursor.execute(
        "SELECT feeds.id as feed_id , " +
        "authors.name as nome_authors , authors.avatar, feeds.comentario, feeds.imagem, authors.id as authors_id, comentario " +
        "FROM feeds " +
        "join authors on feeds.authors_id = authors.id " +
        "ORDER BY feeds.id desc " +
        " LIMIT " + str(pagina) +
        ", " + str(5)


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
        "SELECT feeds.id as feed_id , " +
        "authors.name as nome_authors , authors.avatar, feeds.comentario, feeds.imagem, authors.id as authors_id, comentario " +
        "FROM feeds " +
        "join authors on feeds.authors_id = authors.id " +
        "WHERE feeds.id = " + str(feed_id)

    )
    registro = cursor.fetchone()
    conexao.close()

    if registro:
        feed = gerar_feed(registro)

    return jsonify(feed)


@servico.route("/feed_author/<int:authors_id>")
def get_feed_author(authors_id):
    feed = []

    conexao = get_conexao_bd()
    cursor = conexao.cursor(dictionary=True)
    cursor.execute(
        "SELECT feeds.id as feed_id , " +
        "authors.name as nome_authors , authors.avatar, feeds.comentario, feeds.imagem , authors.id as authors_id " +
        "FROM feeds " +
        "join authors on feeds.authors_id = authors.id " +
        "WHERE authors.id = " + str(authors_id)

    )
    registro = cursor.fetchone()
    conexao.close()

    if registro:
        feed = gerar_feed(registro)

    return jsonify(feed)


@servico.route("/feed/<string:imagem>/<string:comentario>/<string:authors_id>", methods=["POST"])
def add_feed(imagem,  comentario, authors_id):
    resultado = {
        "situacao": "ok",
        "erro": ""
    }

    conexao = get_conexao_bd()
    cursor = conexao.cursor()
    try:
        cursor.execute(
            f"INSERT INTO feeds(imagem, comentario, authors_id) VALUES('{imagem}', '{comentario}', '{authors_id}')")
        conexao.commit()
    except Exception as e:
        conexao.rollback()

        resultado["situacao"] = "erro"
        resultado["erro"] = f"ocorreu um erro adicionando o post"

    conexao.close()

    return jsonify(resultado)


def gerar_contas(registro):
    conta = {
        "_id": registro["id"],
        "datetime": registro["closed_at"],
        "datetime2": registro["created_at"],
        "description": registro["description"],
        "patrimony": registro["patrimony"],
        "solution": registro["solution"],
        "status": registro["status"],

        "authors": {
            "authors_id": registro["user_id"],


        }

    }

    return conta


@servico.route("/conta/<int:pagina>")
def get_contas(pagina):
    contas = []

    conexao = get_conexao_bd()
    cursor = conexao.cursor(dictionary=True)
    cursor.execute(
        "SELECT * " +

        "FROM financeiro "


    )
    registros = cursor.fetchall()
    conexao.close()

    for registro in registros:
        contas.append(gerar_contas(registro))

    return jsonify(contas)


if __name__ == "__main__":
    servico.run(
        host="0.0.0.0",
        debug=True
    )
