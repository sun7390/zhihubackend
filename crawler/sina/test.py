# import pyLDAvis.gensim
# from gensim.models import doc2vec, ldamodel
# from gensim import corpora
# from gensim.models.coherencemodel import CoherenceModel
# import io
# import sys
# sys.stdout = io.TextIOWrapper(sys.stdout.buffer,encoding='utf8')
# target = sys.argv[1]
# path = "./analysisData/{}/lda.txt".format(target)
# f = open(path, 'r', encoding='utf-8')
# list = []
# line = f.readline()
# while line:
#     list.append(line)
#     line = f.readline()
# # lines = lines.split(",")
# # list = []
# # list.append(lines)
# dictionary = corpora.Dictionary(list)
# corpus = [ dictionary.doc2bow(text) for text in list ]
# lda = ldamodel.LdaModel(corpus=corpus, id2word=dictionary, iterations=50, num_topics=5)
# bad = ldamodel.LdaModel(corpus=corpus, id2word=dictionary, iterations=50, num_topics=2)
# goodcm = CoherenceModel(model=lda, corpus=corpus, dictionary=dictionary, coherence='u_mass')
# badcm = CoherenceModel(model=bad, corpus=corpus, dictionary=dictionary, coherence='u_mass')
# print(goodcm)
# print(badcm)
# visualisation = pyLDAvis.gensim.prepare(lda, corpus, dictionary)
# pyLDAvis.save_html(visualisation, 'LDA_Visualization.html')
# print(goodcm.get_coherence())
# print(badcm.get_coherence())

# -*- coding: utf-8 -*-
# tf-dif 关键词
# import jieba.posseg as pseg
# from jieba import analyse
# import io
# import sys
# sys.stdout = io.TextIOWrapper(sys.stdout.buffer,encoding='utf8')
# target = '李荣浩'
# path = "./analysisData/{}/original.txt".format(target)
# def keyword_extract(data, file_name):
#    tfidf = analyse.extract_tags
#    keywords = tfidf(data)
#    return keywords

# def getKeywords(docpath, savepath):

#    with open(docpath, 'r', encoding='UTF-8') as docf, open(savepath, 'w', encoding='UTF-8') as outf:
#       for data in docf:
#          data = data[:len(data)-1]
#          keywords = keyword_extract(data, savepath)
#          for word in keywords:
#             outf.write(word + ' ')
#          outf.write('\n')
# getKeywords(path, '1.txt')

# doc2vec
import gensim
import jieba
import pandas as pd
import os
from gensim.models.doc2vec import Doc2Vec

target = '李荣浩'
path = "./analysisData/{}/lda.txt".format(target)
f = open(path, 'r', encoding='utf-8')
list = []
line = f.readline()
while line:
    list.append(line.replace("\n", "").split(","))
    line = f.readline()

taggle = gensim.models.doc2vec.TaggedDocument

def X_train(sentence):
   x_train = []
   for i, text in enumerate(sentence):
      word_list = text
      l = len(word_list)
      word_list[l - 1] = word_list[l - 1].strip()
      document = taggle(word_list, tags = [i])
      x_train.append(document)
   return x_train

c = X_train(list)

def train(x_train, size = 300):
   model = Doc2Vec(x_train, min_count = 1, window = 3,size = size, sample = 1e-3, negative=5, workers= 4)
   model.train(x_train, total_examples = model.corpus_count, epochs = 10)
   return model

model_dm = train(c)

print(model_dm)