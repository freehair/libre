'use strict';

import mongoose from 'mongoose';

var GrilleSchema = new mongoose.Schema({
  name: String,
  tailleX:Number,
  tailleY:Number
});

export default mongoose.model('Grille', GrilleSchema);
