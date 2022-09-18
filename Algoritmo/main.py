import pandas as pd
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity
import numpy as np
import nltk
from random import randrange
import json
nltk.download("stopwords")

news = pd.read_xml("filtrado.xml")

tags = []
for idx, new in news.iterrows():
    if new["Tag"] not in tags:
        tags.append(new["Tag"])

#lista com todas as tag
taglist = tags

#separando entre noticias com like aleatoriamente
likes = pd.DataFrame(columns=news.columns)
no_likes = pd.DataFrame(columns=news.columns)

for idx, new in news.iterrows():
    chance = randrange(2)
    if chance == 0:
        aux = pd.DataFrame([new])
        likes = pd.concat([likes, aux], axis=0, ignore_index=True)
    else:
        aux = pd.DataFrame([new])
        no_likes = pd.concat([no_likes, aux], axis=0, ignore_index=True)

#print(likes)
#joga tudo num json separado por tab
likes.to_json("liked.json", orient="table")
no_likes.to_json("not_liked.json", orient="table")


#le o json
likes = pd.read_json("liked.json", orient="table")
liked_tags = {}

#conta pra ver qual tag foi mais curtida
soma = 0
for idx, row in likes.iterrows():
    soma = soma + 1
    if row["Tag"] in liked_tags:
        liked_tags[row["Tag"]] = liked_tags[row["Tag"]] + 1
    else:
        liked_tags[row["Tag"]] = 1

#print(liked_tags)
#gera um float de peso pra tag
for key in liked_tags:
    liked_tags[key] = liked_tags[key] / soma


def semelhanca(titulo, tag, vectorizer):
    df = pd.read_json("liked.json", orient="table")
    df = df.loc[df["Tag"] == tag]
    if df.empty:
        return 0.1
    else:
        avg = []
        for _, row in df.iterrows():
            vect = vectorizer.fit_transform([titulo, row["Titulo"]])
            avg.append(cosine_similarity(vect[0:1], vect)[0][1])
        return sum(avg) / len(avg)


#calcula a pontuacao da noticia
rmd = pd.read_json("not_liked.json", orient="table")
rmd = rmd.loc[:, ~rmd.columns.str.contains('^Unnamed')]
stopwords = nltk.corpus.stopwords.words("portuguese")
vectorizer = TfidfVectorizer(stop_words=stopwords)
score = np.zeros(len(rmd.index))
for idx, row in rmd.iterrows():
    if liked_tags.get(row["Tag"]) != None:
        score[idx] = liked_tags[row["Tag"]]
    else:
        score[idx] = 1 / soma
    score[idx] = 20 * score[idx] + semelhanca(row["Titulo"], row["Tag"], vectorizer)

#print (score)

rmd = rmd.assign(score=score)
rmd = rmd.sort_values(by="score", ascending=False)
#print(rmd)
#rmd.to_json("ranked.json", orient="table")

news = []
liked = []
for idx, row in rmd.iterrows():
    noticia = {}
    noticia["tag"] = row["Tag"]
    noticia["id"] = idx
    noticia["title"] = row["Titulo"]
    noticia["text"] = row["Subtitulo"] 
    noticia["link"] = row["Link"]
    news.append(noticia)

for idx, row in likes.iterrows():
    noticia = {}
    noticia["tag"] = row["Tag"]
    noticia["id"] = idx
    noticia["title"] = row["Titulo"]
    noticia["text"] = row["Subtitulo"] 
    noticia["link"] = row["Link"]
    liked.append(noticia)

aux = {"news":news, "liked":liked}
with open("/../Front-end/json-mock-api/src/db.json", "w") as f:
	  json.dump (aux, f)