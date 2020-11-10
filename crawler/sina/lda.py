from gensim.models import doc2vec, ldamodel
from gensim import corpora
from gensim.models.coherencemodel import CoherenceModel
import io
import sys
sys.stdout = io.TextIOWrapper(sys.stdout.buffer,encoding='utf8')
target = sys.argv[1]
path = "crawler/sina/analysisData/{}/lda.txt".format(target)
f = open(path, 'r', encoding='utf-8')
list = []
line = f.readline()
while line:
    list.append(line.replace("\n", "").split(","))
    line = f.readline()
# print(list)
dictionary = corpora.Dictionary(list)
corpus = [ dictionary.doc2bow(text) for text in list ]
lda = ldamodel.LdaModel(corpus=corpus, id2word=dictionary, num_topics=5)
print(lda.print_topics(num_topics=5, num_words=5))  # 把所有的主题打印出来看看
# max = 0
# maxIdx = 0
# for e, values in enumerate(lda.inference(corpus)[0]):
#     for ee, value in enumerate(values):
#         if value > max:
#           maxIdx = ee
#           max = value
#         print('\t主题%d推断值%.2f' % (ee, value))
        
# print(lda.print_topic(maxIdx, topn=5))  # 第10个主题最关键的五个词

