'use strict';

import mongoose from 'mongoose';

var TerrainSchema = new mongoose.Schema({
    _id:Number,
  name: String,
  image: String,
  limit:Number
});


export default mongoose.model('Terrain', TerrainSchema);
