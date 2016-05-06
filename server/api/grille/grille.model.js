'use strict';

import mongoose from 'mongoose';

var GrilleSchema = new mongoose.Schema({
  id: Number,
  name: String,
  tailleX:Number,
  tailleY:Number
});

export default mongoose.model('Grille', GrilleSchema);
