from app import db

class Book(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(100), nullable=False)
    author = db.Column(db.String(50), nullable=False)
    description = db.Column(db.Text, nullable=False)
    owner = db.Column(db.String(50), nullable=False)
    img = db.Column(db.String(400), nullable=False)
    name_borrow = db.Column(db.String(50), nullable=False)
    surname_borrow = db.Column(db.String(50), nullable=False)
    email_borrow = db.Column(db.String(100), nullable=False)
    isBorrow = db.Column(db.Boolean, nullable=False)


    def to_json(self):
        return {
            "id" : self.id,
            "title": self.title,
            "author" : self.author,
            "description" : self.description,
            "owner": self.owner,
            "img" : self.img,
            "name_borrow" : self.name_borrow,
            "surname_borrow" : self.surname_borrow,
            "email_borrow" : self.email_borrow,
            "isBorrow" : self.isBorrow,
        }



