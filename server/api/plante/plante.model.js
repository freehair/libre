'use strict';

import mongoose from 'mongoose';
import {Schema} from 'mongoose';
import EtreVivant from '../etreVivant/etreVivant.model';

var PlanteSchema = new mongoose.Schema({
  vie: EtreVivant.schema,
  posX:Number,
  posY:Number,
  type:String,
});

export default mongoose.model('Plante', PlanteSchema);
