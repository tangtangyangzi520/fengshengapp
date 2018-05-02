function isEmptyObject(e) {
    var t;
    for (t in e)
        return !1;
    return !0
}
const transformProperties = 'translate,translateX,translateY,translateZ,scale,scaleX,scaleY,scaleZ,rotate,rotateX,rotateY,rotateZ,rotateC,rotateCX,rotateCY,skew,skewX,skewY,skewZ,perspective'.split(',');
const timingFunction = ['forceWithGravity', 'spring', 'easeInOut', 'easeIn', 'easeOut', 'bezier', 'linear'];

export default {
    isEmptyObject,
    transformProperties
}