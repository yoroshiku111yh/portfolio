/**
 * Created by Can on 3/18/2015.
 */

function DEBUG(){
    isDebug = true;
    traceText = new PIXI.Text("SEKE1412 DEBUG MODE",
        { font: "20px Arial", fill: "#ff0000", align: "left",  dropShadow:"true", dropShadowDistance:1, dropShadowAngl:Math.PI});

    traceText.position.x = (stageW - traceText.width)/2;
    traceText.position.y = stageH/2;
    stage.addChild(traceText);

    doDebugDraggingMode()
    addPositionIndicator()
}


function trace(s){
    console.log(s);
    if(isDebug){
        traceText.text = s
    }
}



function doDebugDraggingMode(){
    $(window).on("keydown", keyboardRelease)
    console.log(stage.children);
    for(var i in stage.children){
        var item = stage.children[i];
        if(item.children.length > 0){
            for(var j in item.children){
                var sItem = item.children[j]
                if(sItem.children.length > 0){
                    for(var k in sItem.children)
                        var tItem = sItem.children[k];
                        if(tItem.children.length > 0){
                            for(var l in tItem.children){
                                var fItem = tItem.children[l];
                                if(fItem.children.length>0){
                                    //fourth recursion
                                }else{
                                    if(fItem.renderable){
                                        setInteractItem(fItem)
                                    }
                                }
                            }
                        }else{
                            if(tItem.renderable){
                                setInteractItem(tItem)
                            }
                        }
                }else{
                    if(sItem.renderable){
                        setInteractItem(sItem)
                    }
                }
            }
        }else{
            if(item.renderable){
                setInteractItem(item)
            }
        }
    }
}

function setInteractItem(item){
    item.interactive = true;
    item.isSelected = false;
    item.click = debugSelected
}



function debugSelected(e){
    debugSelectedTarget = null;
    var item = e.target;
    item.isSelected = !item.isSelected;
    if(item.isSelected){
        console.log(item);
        item.alpha = 0.7;
        debugSelectedTarget = item
    }else{
        item.alpha = 1;
    }

}

function keyboardRelease(e){
    if(debugSelectedTarget != null){
        switch (e.keyCode){
            case 37://LEFT
                if(e.shiftKey){
                    debugSelectedTarget.x -= 10;
                }else{
                    debugSelectedTarget.x -= 1;
                }
                break;
            case 39://RIGHT
                if(e.shiftKey){
                    debugSelectedTarget.x += 10;
                }else{
                    debugSelectedTarget.x += 1;
                }
                break;
            case 38://UP
                if(e.shiftKey){
                    debugSelectedTarget.y -= 10;
                }else {
                    debugSelectedTarget.y -= 1;
                }
                break;
            case 40://DOWN
                if(e.shiftKey) {
                    debugSelectedTarget.y += 10;
                }else{
                    debugSelectedTarget.y += 1;
                }
                break;
        }
        debugPositionIndicator.text = "Poisition: x= " +debugSelectedTarget.x+", y= "+debugSelectedTarget.y;
        debugPositionIndicator.tint = 0xffffff;
    }else{
        debugPositionIndicator.text = "No Target Selected";
        debugPositionIndicator.tint = 0xff0000;
    }

    updatePositionIndicator()
}

function addPositionIndicator(){
    debugPositionIndicator = new PIXI.Text("Poisition indicator",{ font: "20px Arial", fill: "#ffffff", align: "left",
        dropShadow:"true", dropShadowDistance:1, dropShadowAngl:Math.PI});
    debugPositionIndicator.x = 0;
    debugPositionIndicator.y = stageH - debugPositionIndicator.height;
    stage.addChild(debugPositionIndicator);
    stage.setChildIndex(debugPositionIndicator, stage.children.length -1);
}

function updatePositionIndicator(){
    debugPositionIndicator.x = 0;
    debugPositionIndicator.y = stageH - debugPositionIndicator.height;
    stage.setChildIndex(debugPositionIndicator, stage.children.length -1);
}
