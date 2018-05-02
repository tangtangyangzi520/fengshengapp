/*
str:要绘制的字符串
canvas:canvas对象
initX:绘制字符串起始x坐标
initY:绘制字符串起始y坐标
lineHeight:字行高，自己定义个值即可
*/
function canvasTextAutoLine(str, canvas, initX, initY, lineHeight) {
    var ctx = canvas.getContext("2d");
    var lineWidth = 0;
    var canvasWidth = c.width;
    var lastSubStrIndex = 0;
    for (let i = 0; i < str.length; i++) {
        lineWidth += ctx.measureText(str[i]).width;
        if (lineWidth > canvasWidth - initX) { //减去initX,防止边界出现的问题
            ctx.fillText(str.substring(lastSubStrIndex, i), initX, initY);
            initY += lineHeight;
            lineWidth = 0;
            lastSubStrIndex = i;
        }
        if (i == str.length - 1) {
            ctx.fillText(str.substring(lastSubStrIndex, i + 1), initX, initY);
        }
    }
}

function drawImage(canvasId, imgUrl, x = 0, y = 0, w, h) {
    return new Promise(function(resolve, reject) {
        let canvas = document.getElementById(canvasId);
        let ctx = canvas.getContext("2d");
        let img = new Image();
        img.src = imgUrl;
        if (img.complete) {
            ctx.drawImage(img, x, y, w ? w : img.width, h ? h : img.height);
            resolve({ success: true, img, canvas, msg: '绘制成功' });
        } else {
            img.onload = () => {
                ctx.drawImage(img, x, y, w ? w : img.width, h ? h : img.height);
                resolve({ success: true, img, canvas, msg: '绘制成功' });
            }
            img.onerror = () => {
                resolve({ success: false, canvas, msg: '图片加载失败' });
            }
        }
    })
}
const Canvas = {
    canvasTextAutoLine,
    drawImage,
}

export default Canvas