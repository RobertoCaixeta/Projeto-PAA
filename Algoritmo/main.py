import pandas as pd
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity
import numpy as np
import nltk
#from random import randrange
import json
import threading
ultimo = 0
atual = 0
def rank_alg():
    nltk.download("stopwords")
    dataset = json.loads(open("ranked.json","r").read())
    
    newsaux = dataset["news"]
    likedaux = dataset["liked"]
    
    news = pd.DataFrame(columns=["id","tag", "title", "text","link"])
    likes = pd.DataFrame(columns=["id","tag", "title", "text","link"])
    
    for new in newsaux:
      aux = pd.DataFrame({"id":[new["id"]],"tag":[new["tag"]], "title":[new["title"]], "text":[new["text"]],"link":[new["link"]]})
      news = pd.concat([news, aux],ignore_index = True , axis = 0)
      
      
    for new in likedaux:
      aux = pd.DataFrame({"id":[new["id"]],"tag":[new["tag"]], "title":[new["title"]], "text":[new["text"]],"link":[new["link"]]})
      likes = pd.concat([likes, aux],ignore_index = True , axis = 0)
    print(likes)
    
    #le o json
    #likes = pd.read_json("liked.json", orient="table")
    liked_tags = {}
    
    #conta pra ver qual tag foi mais curtida
    soma = 0
    for idx, row in likes.iterrows():
        soma = soma + 1
        if row["tag"] in liked_tags:
            liked_tags[row["tag"]] = liked_tags[row["tag"]] + 1
        else:
            liked_tags[row["tag"]] = 1
    
    #print(liked_tags)
    #gera um float de peso pra tag
    for key in liked_tags:
        liked_tags[key] = liked_tags[key] / soma
    
    
    def semelhanca(titulo, tag, vectorizer,df):
        #df = pd.read_json("liked.json", orient="table")
        df = df.loc[df["tag"] == tag]
        if df.empty:
            return 0.1
        else:
            avg = []
            for _, row in df.iterrows():
                vect = vectorizer.fit_transform([titulo, row["title"]])
                avg.append(cosine_similarity(vect[0:1], vect)[0][1])
            return sum(avg) / len(avg)
    
    
    #calcula a pontuacao da noticia
    rmd = news
    rmd = rmd.loc[:, ~rmd.columns.str.contains('^Unnamed')]
    stopwords = nltk.corpus.stopwords.words("portuguese")
    vectorizer = TfidfVectorizer(stop_words=stopwords)
    score = np.zeros(len(rmd.index))
    for idx, row in rmd.iterrows():
        if liked_tags.get(row["tag"]) != None:
            score[idx] = liked_tags[row["tag"]]
        else:
            score[idx] = 1 / soma
        score[idx] = 20 * score[idx] + semelhanca(row["title"], row["tag"], vectorizer,likes)
    
    #print (score)
    
    rmd = rmd.assign(score=score)
    rmd = rmd.sort_values(by="score", ascending=False)
    #print(rmd)
    #rmd.to_json("ranked.json", orient="table")
    
    news = []
    liked = []
    for idx, row in rmd.iterrows():
        noticia = {}
        noticia["tag"] = row["tag"]
        noticia["id"] = idx
        noticia["title"] = row["title"]
        noticia["text"] = row["text"] 
        noticia["link"] = row["link"]
        news.append(noticia)
    
    for idx, row in likes.iterrows():
        noticia = {}
        noticia["tag"] = row["tag"]
        noticia["id"] = idx
        noticia["title"] = row["title"]
        noticia["text"] = row["text"] 
        noticia["link"] = row["link"]
        liked.append(noticia)
    
    aux = {"news":news, "liked":liked}
    with open("ranked.json", "w") as f:
    	  json.dump (aux, f)

def foo():
    global ultimo
    global atual
    liked = json.loads(open("ranked.json","r").read())
    atual = len(liked['liked'])
    if(atual != ultimo):
        rank_alg()
        ultimo = atual
    threading.Timer(10, foo).start()

def main():
    foo()

if __name__ == '__main__':
    main()
