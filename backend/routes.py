import base64

from app import app, db
from flask import request, jsonify
from models import Book

# Get all books
@app.route("/api/books",methods=["GET"])
def get_books():
    books = Book.query.all() #"SELECT * FROM "
    result = [book.to_json() for book in books]
    # [ {...}, {...],
    return jsonify(result) #200 by deafult

# Create a book
@app.route("/api/books",methods=["POST"])
def create_books():
    try:
        data = request.json #zmienia request na json

        required_fields = ["title", "author", "description", "owner", "img"]

        for field in required_fields:
            if field not in data or not data.get(field):
                return jsonify({"error":f'Missing required field: {field}'}),

        title = data.get("title")
        author = data.get("author")
        description = data.get("description")
        owner = data.get("owner")
        img = data.get("img")
        name_borrow = data.get("name_borrow")
        surname_borrow = data.get("surname_borrow")
        email_borrow = data.get("email_borrow")
        isBorrow = data.get("isBorrow")

        new_book= Book(title=title, author=author, description=description, owner=owner, img=img, name_borrow=name_borrow, surname_borrow=surname_borrow, email_borrow=email_borrow, isBorrow=isBorrow)

        db.session.add(new_book)

        db.session.commit()

        return jsonify(new_book.to_json()),201

    except Exception as e:
        db.session.rollback()
        return jsonify({"error":str(e)}), 500

# Delete a book
@app.route("/api/books/<int:id>",methods=["DELETE"])
def delete_book(id):
    try:
        book = Book.query.get(id)
        if book is None:
            return jsonify({"error":"Book not found"}), 404

        db.session.delete(book)
        db.session.commit() #zatwierdzenie opercaje i zapisanie w bazie
        return jsonify({"msg":"book deleted succes"}), 200
    except Exception as e:
        db.session.rollback()
        return jsonify({"error":str(e)}), 500

#Update a book profile
@app.route("/api/books/<int:id>",methods=["PATCH"])
def update_book(id):
    try:
        book = Book.query.get(id)
        if book is None:
            return jsonify({"error": "Book not found"}), 404

        data = request.json

        book.title = data.get("title", book.title)
        book.author = data.get("author", book.author)
        book.description = data.get("description", book.description)
        book.owner = data.get("owner", book.owner)
        book.img = data.get("img", book.img)
        book.name_borrow = data.get("name_borrow", book.name_borrow)
        book.surname_borrow = data.get("surname_borrow", book.surname_borrow)
        book.email_borrow = data.get("email_borrow", book.email_borrow)
        book.isBorrow = data.get("isBorrow", book.isBorrow)

        db.session.commit()
        return jsonify(book.to_json()), 200
    except Exception as e:
        db.session.rollback()
        return jsonify({"error": str(e)}), 500







