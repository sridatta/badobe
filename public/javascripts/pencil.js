(function(window){

  function createPencil(state){
      this.state = state;
      return {
        tick: function() {
          if (state.isMouseDown) {
              var pt = new createjs.Point(state.stage.mouseX, state.stage.mouseY);
              var midPoint = new createjs.Point(state.oldX + pt.x>>1, state.oldY+pt.y>>1);
              state.currentShape.graphics.moveTo(midPoint.x, midPoint.y);
              state.currentShape.graphics.curveTo(state.oldX, state.oldY, state.oldMidX, state.oldMidY);

              state.oldX = pt.x;
              state.oldY = pt.y;

              state.oldMidX = midPoint.x;
              state.oldMidY = midPoint.y;

              state.stage.update();
          }
        },

        handleMouseDown : function() {
            state.isMouseDown = true;

            var s = new createjs.Shape();
            state.oldX = state.stage.mouseX;
            state.oldY = state.stage.mouseY;
            state.oldMidX = state.stage.mouseX;
            state.oldMidY = state.stage.mouseY;
            var g = s.graphics;

            var thickness = state.currentThickness;
            g.setStrokeStyle(thickness + 1, 'round', 'round');

            var color = createjs.Graphics.getRGB(state.currentColor.r, state.currentColor.g, state.currentColor.b);
            g.beginStroke(color);
            state.currentLayer.addChild(s);
            state.currentShape = s;
        },

       handleMouseUp : function() {
          state.isMouseDown = false;
       }
      }
  }

  window.createPencil = createPencil;
})(window);

