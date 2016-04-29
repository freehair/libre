'use strict';

import mongoose from 'mongoose';

var GrilleSchema = new mongoose.Schema({
  name: String,
  contenu: [[String]]
});

export default mongoose.model('Grille', GrilleSchema);
