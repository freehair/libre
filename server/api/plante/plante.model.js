'use strict';

import mongoose from 'mongoose';
import {Schema} from 'mongoose';
import EtreVivant from '../etreVivant/etreVivant.model';

var PlanteSchema = new mongoose.Schema({
  vie: EtreVivant,
  posX:Number,
  posY:Number
});

export default mongoose.model('Plante', PlanteSchema);
