(function(window){

  function createMove(state){
      this.state = state;
      return {
        tick: function(e) {
          if (state.isMouseDown) {
            state.currentLayer.setTransform(state.stage.mouseX - state.moveHandle.x,
                                            state.stage.mouseY - state.moveHandle.y);
            state.stage.update();
          }
        },

        handleMouseDown : function(e) {
            state.moveHandle = {
                                  x: e.rawX,
                                  y: e.rawY
                               };
            state.isMouseDown = true;
        },

       handleMouseUp : function() {
          state.isMouseDown = false;
          var x = state.stage.mouseX;
          var y = state.stage.mouseY;
          var layer = state.currentLayer;
          state.currentLayer.currentAnimation.wait(500).call(function(){
            layer.setTransform(x, y);
            state.stage.update();
          });
       }
      }
  }

  window.createMove = createMove;
})(window);

