const db = require('../util/database');

module.exports = class Visit {
  constructor(nom, prenom, date_arrivee,raison) {
    this.nom = nom;
    this.prenom = prenom;
    this.date_arrivee = date_arrivee;
    this.raison = raison;
  }

  static fetchAll() {
    return db.execute('SELECT * FROM visite');
  }

  static save(visit) {
    return db.execute(
      'INSERT INTO visite (nom, prenom, date_arrivee,raison) VALUES (?, ?, ?,?)',
      [visit.nom, visit.prenom, visit.date_arrivee,visit.raison]
    );
  }

  static delete(id) {
    return db.execute('DELETE FROM visite WHERE id = ?', [id]);
  }
};