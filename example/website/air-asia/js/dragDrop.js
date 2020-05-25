/**
 * Created by minhvu on 1/25/2016.
 */
function dragDrop()
{
    dragElem = $(wrapPreview).draggabilly({
        handle : idImg
    });
    var dataDrag = dragElem.data('draggabilly');
    dragElem.on('dragEnd' , function(){
        cv.setPosition(dataDrag.position.x  , dataDrag.position.y);
        pos_x = dataDrag.position.x;
        pos_y = dataDrag.position.y;
    });
}