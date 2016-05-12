'use strict';

import mongoose from 'mongoose';
import {Schema} from 'mongoose';

var sexEnum=[1,2];
var vitesseDep=[1,2];

var EtreVivantSchema = new mongoose.Schema({
  ageMax:Number,
  age:{type:Number, default:0},
  ageReproduction:Number,
  chanceReproduction:Number,
  sexe:{ type: Number, enum: sexEnum },
  vitesse:{ type: String, enum: vitesseDep},
  deplacement: Number
});

export default mongoose.model('EtreVivant', EtreVivantSchema);
