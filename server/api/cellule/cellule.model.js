'use strict';

import mongoose from 'mongoose';
import {Schema} from 'mongoose';

import Terrain from '../terrain/terrain.model';
import Grille from '../grille/grille.model';

var CelluleSchema = new mongoose.Schema({
  posX:Number,
  posY:Number,
  typeTerrain:{type:Schema.Types.Number,ref:'Terrain'},
  eau:Number
});

export default mongoose.model('Cellule', CelluleSchema);
