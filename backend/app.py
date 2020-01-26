from flask import Flask, render_template, request, redirect
from flask_bootstrap import Bootstrap
#from flask_cors import CORS
import wikipedia
import requests
from operator import itemgetter
import syllables
from nltk.tokenize import sent_tokenize, word_tokenize
import string
from test import rap, fetch_page_content, clean_article
import time
from flask import jsonify
import re
from maps import findClosestLandmark

regex = re.compile('[@_!#$%^&*()<>?/\|}{~:]') 

"""
views = []
for i in results:
    URL = "https://wikimedia.org/api/rest_v1/metrics/pageviews/per-article/en.wikipedia/all-access/all-agents/{}/monthly/2019120100/2019123100".format(i)
    r = requests.get(url = URL)
    data = r.json()
    # could be empty
    views.append((data['items'][0]['article'], data['items'][0]['views']))
m = max(views, key=itemgetter(1))[0]
#print(m)
#print(wikipedia.page(m).summary)
a = sent_tokenize(wikipedia.page(m).summary)
print(rap(a))
"""

"""
wiki_page = "https://en.wikipedia.org/wiki/Brown_University"
title, page = fetch_page_content(wiki_page)
title = clean_article(title)
sentences = [clean_article(sent).strip() for sent in sent_tokenize(page)]
couplets = rap(sentences)
print(couplets)
"""

#a = [''.join(c for c in s if c not in string.punctuation) for s in a]
#a = [s for s in a if s]
#a = [s for s in a if len(s) > 1]
#print(a)
"""
syl = 0
words = ""
for i in a:
    if words != "":
        words = words + " "
        words += i
    else:
        words += i
    currentSyl = syllables.estimate(words)
    if currentSyl > 7:
        print(words)
        print("\n")
        syl = 0
        words = """""

app = Flask(__name__)
#CORS(app)
Bootstrap(app)

# This is for the form submission, don't worry about it being secure.
#app.config['SECRET_KEY'] = 'penguinsrulelots'

@app.route('/', methods=['GET', 'POST'])
def index():
    #if request.args.get('source') == 'word':
    #else if request.args.get('source') == 'location':
    return "<p1>hello</p1>"

@app.route('/ArticleTitles', methods=['GET', 'POST'])
def article():
    if request.args.get('source') == 'text':
        text = request.args.get('data')
        #text = "Python"
        #start = time.time()
        mispelled = wikipedia.suggest(text)
        if mispelled:
            results = wikipedia.search(mispelled)
            #print(results)
        else:
            results = wikipedia.search(text)
            #print(results)
        #print(results)
        results = (list(set(results)))
        return jsonify(listOfTitles=results)
    #else if request.args.get('source') == 'location':

@app.route('/GenerateHaiku', methods=['GET', 'POST'])
def generateHaiku():
    title = request.args.get('articletitle')
    #print(results)
    wiki_page = wikipedia.page(title).url
    title, page = fetch_page_content(wiki_page)
    title = clean_article(title)
    sentences = [clean_article(sent).strip() for sent in sent_tokenize(page)]
    couplets = rap(sentences)
    couplets = [a for a in couplets if regex.search(a[0]) == None and regex.search(a[1]) == None]
    return jsonify(couplets=couplets)
    #end = time.time()
    #print(end - start)
    

@app.route('/MapArticleTitles', methods=['GET', 'POST'])
def mapArticle():
    CoordX = request.args.get('CoordX')
    CoordY = request.args.get('CoordY')
    results = findClosestLandmark(CoordX, CoordY)
    return jsonify(results=results)

@app.route('/GenerateMapHaiku', methods=['GET', 'POST'])
def generateMapHaiku():
    title = request.args.get('articletitle')
    types = request.args.get('types')
    types = types.split(',')
    print(types)
    try:
        wiki_page = wikipedia.page(title).url
        print("worked?")
        title, page = fetch_page_content(wiki_page)
        title = clean_article(title)
        sentences = [clean_article(sent).strip() for sent in sent_tokenize(page)]
        couplets = rap(sentences)
        if couplets == []:
            try:
                for j in types:
                    print(j)
                    wiki_page = wikipedia.page(j).url
                    print("Worked?")
                    #print(wiki_page)
                    title, page = fetch_page_content(wiki_page)
                    title = clean_article(title)
                    sentences = [clean_article(sent).strip() for sent in sent_tokenize(page)]
                    couplets = rap(sentences)
                    couplets = [a for a in couplets if regex.search(a[0]) == None and regex.search(a[1]) == None]
                    return jsonify(couplets=couplets)
            except:
                return jsonify(couplets=[])
        else:
            couplets = [a for a in couplets if regex.search(a[0]) == None and regex.search(a[1]) == None]
            return jsonify(couplets=couplets)
    except:
        try:
            for j in types:
                print(j)
                wiki_page = wikipedia.page(j).url
                print("Worked?")
                title, page = fetch_page_content(wiki_page)
                title = clean_article(title)
                sentences = [clean_article(sent).strip() for sent in sent_tokenize(page)]
                couplets = rap(sentences)
                couplets = [a for a in couplets if regex.search(a[0]) == None and regex.search(a[1]) == None]
                return jsonify(couplets=couplets)
        except:
            return jsonify(couplets=[])

app.run(debug=True)