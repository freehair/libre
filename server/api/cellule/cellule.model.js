'use strict';

import mongoose from 'mongoose';
import {Schema} from 'mongoose';

import Terrain from '../terrain/terrain.model';
import Grille from '../grille/grille.model';

var CelluleSchema = new mongoose.Schema({
  posX:Number,
  posY:Number,
  typeTerrain:{type:Schema.Types.Number,ref:'Terrain'},
  //typeTerrain:{type:Schema.Types.ObjectId,ref:'Terrain'}
  grille:{type:Schema.Types.ObjectId,ref:'Grille'}
});

export default mongoose.model('Cellule', CelluleSchema);
