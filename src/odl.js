Function.prototype.bind = function(obj) {   
    var _method = this;
    return function() {
        return _method.apply(obj, arguments);
    };    
} 

window.odl = (function () {
    var oldX = 0, oldY = 0;
    var speedCount = 0;

    var odl = {
        callback: null,

        tracker(event) {
            event = event || window.event;
            var eventDoc, doc, body;
            var directionX = 0, directionY = 0, diffX = 0, diffY = 0;

            if (event.pageX < oldX) {
                directionX = "left"
                diffX = oldX - event.pageX;
            } else if (event.pageX > oldX) {
                directionX = "right"
                diffX = event.pageX - oldX;
            }

            if (event.pageY < oldY) {
                directionY = "top"
                diffY = oldY - event.pageY;
            } else if (event.pageY > oldY) {
                directionY = "bottom";
                diffY = event.pageY - oldY;
            }
            
            oldX = event.pageX;
            oldY = event.pageY;
            if (directionY === 'top') {
                speedCount += 1;
                if (this.callback) {
                    if(event.pageY < 50 && event.pageY > 30) {
                        window.removeEventListener('mousemove', arguments.callee, false)
                        this.triggerCallBack()
                    }
                }
            }else if(directionY === 'bottom'){
                speedCount = 0;
            }

            document.getElementById("coordsOutput").innerHTML = [event.pageX, event.pageY];
            document.getElementById("directionX").innerHTML = directionX;
            document.getElementById("directionY").innerHTML = directionY;
        },
        registerListeners() {
            window.addEventListener('mousemove', this.tracker.bind(this), false);
        },
        trigger: function (callback) {
            this.callback = callback;
            if (!localStorage.getItem('odlCallbackRan')) {
                this.registerListeners()
            }
        },
        triggerCallBack() {
            if (!localStorage.getItem('odlCallbackRan')) {
                this.callback()
                localStorage.setItem('odlCallbackRan', true)
            }
        }
    };
     
    return odl;
}());