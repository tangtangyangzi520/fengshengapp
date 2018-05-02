const fadeIn = [{
    start: { opacity: 0 },
    end: { opacity: 1 },
    duration: 600,
    type: 'easeIn'
}]
const fadeOut = [{
    start: { opacity: 1 },
    end: { opacity: 0 },
    duration: 300,
    type: 'easeIn'
}]
const fadeInBottom = [{
    start: { opacity: 0, translateY: 50 },
    end: { opacity: 1, translateY: 0 },
    friction: 300,
    duration: 2000,
}]
const fadeInTop = [{
    start: { opacity: 0, translateY: -50 },
    end: { opacity: 1, translateY: 0 },
    friction: 300,
    duration: 2500,
}]
const shakeDown = [{
    start: { translateY: -700 },
    end: { translateY: 0 },
    duration: 1500,
    friction: 600,
}]
const scaleIn = [{
    start: { opacity: 0, scale: 0 },
    end: { opacity: 1, translateY: -10, scale: 1 },
    duration: 2000,
    friction: 400,
}]
export default {
    'scale-in': scaleIn,
    'fade-out': fadeOut,
    'fade-in': fadeIn,
    'fade-in-bottom': fadeInBottom,
    'fade-in-top': fadeInTop,
    'shake-down': shakeDown,
}