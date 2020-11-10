import pyLDAvis.gensim
from gensim.models import doc2vec, ldamodel
from gensim import corpora
from gensim.models.coherencemodel import CoherenceModel
import io
import sys
sys.stdout = io.TextIOWrapper(sys.stdout.buffer,encoding='utf8')
target = sys.argv[1]
path = "./analysisData/{}/lda.txt".format(target)
f = open(path, 'r', encoding='utf-8')
list = []
line = f.readline()
while line:
    list.append(line)
    line = f.readline()
# lines = lines.split(",")
# list = []
# list.append(lines)
dictionary = corpora.Dictionary(list)
corpus = [ dictionary.doc2bow(text) for text in list ]
lda = ldamodel.LdaModel(corpus=corpus, id2word=dictionary, iterations=50, num_topics=5)
bad = ldamodel.LdaModel(corpus=corpus, id2word=dictionary, iterations=50, num_topics=2)
goodcm = CoherenceModel(model=lda, corpus=corpus, dictionary=dictionary, coherence='u_mass')
badcm = CoherenceModel(model=bad, corpus=corpus, dictionary=dictionary, coherence='u_mass')
print(goodcm)
print(badcm)
visualisation = pyLDAvis.gensim.prepare(lda, corpus, dictionary)
pyLDAvis.save_html(visualisation, 'LDA_Visualization.html')
print(goodcm.get_coherence())
print(badcm.get_coherence())
