'use strict';

import mongoose from 'mongoose';
import {Schema} from 'mongoose';

import Terrain from '../terrain/terrain.model';

var CelluleSchema = new mongoose.Schema({
  posX:Number,
  posY:Number,
  typeTerrain:{type:Schema.Types.Number,ref:'Terrain'},
  eau:Number,
  contenu:[Schema.Types.Mixed]
});

export default mongoose.model('Cellule', CelluleSchema);
