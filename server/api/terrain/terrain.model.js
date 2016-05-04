'use strict';

import mongoose from 'mongoose';

var TerrainSchema = new mongoose.Schema({
  name: String,
  image: String,
  limit:Number
});

export default mongoose.model('Terrain', TerrainSchema);
