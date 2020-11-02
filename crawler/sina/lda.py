from gensim.models import doc2vec, ldamodel
from gensim import corpora
import io
import sys
sys.stdout = io.TextIOWrapper(sys.stdout.buffer,encoding='utf8')
f = open("lda.txt", 'r', encoding='utf-8')
lines = f.read()
lines = lines.split(",")
list = []
list.append(lines)
dictionary = corpora.Dictionary(list)
corpus = [ dictionary.doc2bow(text) for text in list ]
lda = ldamodel.LdaModel(corpus=corpus, id2word=dictionary, num_topics=10)
print(lda.print_topics(num_topics=10, num_words=6))  # 把所有的主题打印出来看看
max = 0
maxIdx = 0
for e, values in enumerate(lda.inference(corpus)[0]):
    for ee, value in enumerate(values):
        if value > max:
          maxIdx = ee
          max = value
        print('\t主题%d推断值%.2f' % (ee, value))
        
print(lda.print_topic(maxIdx, topn=6))  # 第10个主题最关键的五个词