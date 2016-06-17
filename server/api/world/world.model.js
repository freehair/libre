'use strict';

import mongoose from 'mongoose';
import {Schema} from 'mongoose';
import Cellule from '../cellule/cellule.model';

var WorldSchema = new mongoose.Schema({
  name: String,
  tailleX:Number,
  tailleY:Number,
  cellules:[Cellule.schema],
  timer:Number
});

export default mongoose.model('World', WorldSchema);
