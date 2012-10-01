(function(window){
  var state = {
    currentThickness: undefined,
    currentColor: undefined,
    oldMidX: undefined,
    oldMidY: undefined,
    oldX: undefined,
    oldY: undefined,
    layers: []
  }

    var pencilTool = createPencil(state);
    var moveTool = createMove(state);
  $(function(){


    $("#slider").slider({
      create: function(event, ui) {
      },
        state.currentThickness = 5;
      change: function(event, ui){
        state.currentThickness = ui.value;
      }
    });

    $("#color-picker").spectrum({
      color: "#f00",
      change: function(color){
        state.currentColor = color.toRgb();
      }
    });

    $("#layer-list").click(function(e){
      var clickedLayer = $(e.target);
      var layerNumber = parseInt(clickedLayer.attr("data-link-no"));
      setCurrentLayer(state, layerNumber);
      return false;
    });

    $("#new-layer").click(function(e){
      createNewLayer(state);
    });

    $("#move-tool").click(function(e){
      setTool(state, moveTool);
    });

    $("#pencil-tool").click(function(e){
      setTool(state, pencilTool);
    });

    $("#play").click(function(e){
     var layers = state.stage.children;
     for(var i = 0, l = layers.length; i < l; i++){
       var layer = layers[i];
       console.log(layer);
       layer.currentAnimation.setPaused(false);
     }
    });

    state.currentColor = $("#color-picker").spectrum("get");

    initCanvas(state);
    createNewLayer(state);
    setTool(state, pencilTool);
  });

  function createNewLayer(state) {
    state.currentLayer = new createjs.Container();
    state.stage.addChild(state.currentLayer);
    state.currentLayer.currentAnimation = new createjs.Tween(state.currentLayer);
    state.currentLayer.currentAnimation.setPaused(true);
    setTool(state, pencilTool);
    refreshLayerList(state);
  }

  function setCurrentLayer(state, layerNumber) {
    state.currentLayer = state.stage.children[layerNumber];
    setTool(state, pencilTool);
  }

  function refreshLayerList(state){
    $("#layer-list").empty();
    var layers = state.stage.children;
    for(var i = 0, l = layers.length; i < l; i++){
      var layerLink = $("<a>").attr("data-link-no", i).attr("href", "");
      layerLink.text("Layer " + (i+1));
      $("#layer-list").append(layerLink);
    }
  }

  function setTool(state, tool){
      var oldTool = state.currentTool;

      state.currentTool = tool;
      state.stage.onMouseDown = state.currentTool.handleMouseDown;
      state.stage.onMouseUp = state.currentTool.handleMouseUp;

      createjs.Ticker.removeListener(oldTool);
      createjs.Ticker.addListener(state.currentTool);

      stage.update();
  }

  function initCanvas(state) {
      stage = new createjs.Stage("myCanvas");
      stage.autoClear = true;
      state.stage = stage;
      createjs.Touch.enable(stage);
      stage.update();
  }

  function stop() {
    createjs.Ticker.removeListener(window);
  }
})(window);
