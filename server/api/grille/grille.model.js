'use strict';

import mongoose from 'mongoose';
import {Schema} from 'mongoose';
import Cellule from '../cellule/cellule.model';

var GrilleSchema = new mongoose.Schema({
  name: String,
  tailleX:Number,
  tailleY:Number,
  cellules:[Cellule.schema]
});

export default mongoose.model('Grille', GrilleSchema);
