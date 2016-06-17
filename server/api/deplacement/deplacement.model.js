'use strict';

import mongoose from 'mongoose';
import {Schema} from 'mongoose';
import Terrain from '../terrain/terrain.model';

var DeplacementSchema = new mongoose.Schema({
    type: {type:Schema.Types.Number,ref:'Terrain'},
    percent:Number
});

export default mongoose.model('Deplacement', DeplacementSchema);
