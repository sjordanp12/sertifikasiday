from flask import Flask, render_template, request, jsonify
from pymongo import MongoClient

app = Flask(__name__)

client = MongoClient('mongodb+srv://test:sparta@cluster0.e3nuv.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0')
db = client.CertificationDay2

@app.route('/')
def home():
   return render_template('index.html')


@app.route('/save_word', methods=['POST'])
def save_word():
    name = request.form['name_give']
    word = request.form['word_give']
    jurusan = request.form['jurusan_give']
    count = 0
    num = count + 1
    doc = {
        'num': num,
        'name': name,
        'word': word,
        'jurusan':jurusan
    }
    db.words.insert_one(doc)
    return jsonify({
        'result': 'success',
    })
@app.route("/word", methods=["GET"])
def word_get():
    word_list = list(db.words.find({}, {'_id': False}))
    return jsonify({'word': word_list})

@app.route("/word/delete", methods=["POST"])
def word_delete():
   num_recieve = request.form['num_give']
   db.words.delete_one(
       {'num': int(num_recieve)},
   )
   return jsonify()
if __name__ == '__main__':
   app.run('0.0.0.0', port=5000, debug=True)