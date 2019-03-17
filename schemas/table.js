const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const objectID = Schema.Types.ObjectId;
const Hotel = require('./hotel');

var TableSchema = new Schema({
  hotel:        {type: objectID , ref : 'Hotel', required: true},
  number:       {type:Number, required: true, min: [1, 'room number illegal']},
  sits:         {type: Number, required: true, min: [1, 'at least 1 sit']},
  isAvailable:  {type: Boolean, required: true, default: true}
},{collection: 'tables'});

TableSchema.index({ hotel: 1, number: 1}, { unique: true }); //(hotel, number) = unique key

TableSchema.pre('save', function(next){
  var table = this;

  Hotel.findById(table.hotel).exec((err, hotel) => {
    if(err) next(err);
    if(!hotel) next(new Error("hotel id not exists"));
    next();
  })
});

TableSchema.statics.toggle = function(table_id){
  var Table = this;
  return new Promise((resolve, reject) => {
    Table.findById(table_id).then((table) => {
      if(!table) reject(new Error(`table_id: ${table_id} not exists`));

      table.isAvailable = !(table.isAvailable);
      table.save((e, table) => {
        if(e) reject(new Error(e.message));

        resolve(table);
      })
    }).catch(e => reject(new Error(e.message)));
  });
}


var Table = (mongoose.models.Table) ? mongoose.model('Table') : mongoose.model('Table', TableSchema);

module.exports = Table;
