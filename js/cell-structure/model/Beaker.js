define( function( require ) {
  'use strict';

  var inherit = require( 'PHET_CORE/inherit' );
  var PropertySet = require( 'AXON/PropertySet' );
  var Apparatus = require( 'CELL_STRUCTURE/cell-structure/model/Apparatus');
  var beakerImage = require( 'image!CELL_STRUCTURE/beaker.svg' );
  var Dimension2 = require( 'DOT/Dimension2' );
  var Vector2 = require( 'DOT/Vector2' );

  function Beaker( location, size ) {
    Apparatus.call( this, { location: new Vector2(300, 300), size: new Dimension2( 80, 80 ), visibility: true, liquid: null, cell: null} );
    this.image = this.kitImage = beakerImage;
    this.onDragEnd = function() {
      CS.model.apparatusKit.removeChild(this);
      CS.addDroppable(this);
      CS.onDrop(this);
    };

    var handleLiquid = function(model) {
      if(model.type !== "liquid") return;
      this.liquidProperty.set(model);
      if(this.cell && (typeof this.cell.onDippedInLiquid == "function")) {
        this.cell.onDippedInLiquid(this.liquid);
      }
      return true;
    }.bind(this);

    var handleCell = function(model) {
      if(model.type !== "cell") return;
      this.cellProperty.set(model);
      model.locationProperty.set(new Vector2(85, 630));
      model.size = new Dimension2(50, 50);

      if(this.liquid && (typeof this.cell.onDippedInLiquid == "function")) {
        model.onDippedInLiquid(this.liquid);
      }
      return true;
    }.bind(this);

    this.onReceiveDrop = function(model) {
      handleLiquid(model) || handleCell(model);
    };
    this.onRemove = function() {
      this.liquidProperty.set(null);
    };
  }

  return inherit( Apparatus, Beaker );
} );
