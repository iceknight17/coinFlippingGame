# https://medium.com/nishkoder/using-sqlite-database-in-python-projects-73b4d827f1c4
from flask import Flask, jsonify
from flask_cors import CORS
import sqlite3
import random

app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "*"}})

@app.route('/api/get_bet_result', methods=['POST'])
def get_bet_result():
    data = {'result': random.random() > 0.5}
    return jsonify(data)

if __name__ == '__main__':
    app.run(port=5000)

# conn = sqlite3.connect('coin_flips.db')
# cursor = conn.cursor()

# cursor.execute('''
#     CREATE TABLE `histories` (
#     `id` INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
#     `username` VARCHAR(255) NOT NULL,
#     `phone` VARCHAR(15) NOT NULL UNIQUE,
#     `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
#     `updated_at` TIMESTAMP NULL
#     )
# ''')
# conn.commit()

# # cursor.execute("INSERT INTO employees (name, position, salary) VALUES (?, ?, ?)", ('John Doe', 'Software Engineer', 80000))
# # conn.commit()

# conn.close()