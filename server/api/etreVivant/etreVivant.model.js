'use strict';

import mongoose from 'mongoose';
import {Schema} from 'mongoose';
import Grille from '../grille/grille.model';
import Deplacement from '../deplacement/deplacement.model';

var sexEnum=[1,2];
var vitesseDep=[1,2];

var EtreVivantSchema = new mongoose.Schema({
  ageMax:Number,
  age:{type:Number, default:0},
  ageReproduction:Number,
  chanceReproduction:Number,
  sexe:{ type: Number, enum: sexEnum },
  vitesse:{ type: String, enum: vitesseDep},
  deplacement:[Deplacement.schema]
});

export default mongoose.model('EtreVivant', EtreVivantSchema);
