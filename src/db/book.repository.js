class BookRepository {
  constructor(model) {
    this.model = model;
  }

  findAll() {
    return this.model.findAll({});
  }

  create(obj) {
    return this.model.create(obj);
  }
}

module.exports = BookRepository;
