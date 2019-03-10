// -------------------------------------
// |  |          Top                 | |
// | ----------------------------------|
// | L|                              |R|
// | e|                              |i|
// | f|                              |g|
// | t|                              |h|
// |  |                              |t|
// |-----------------------------------|
// |  |          Bottom              | |
// -------------------------------------





class StrategyCameraAnimator {
    /**
     *
     * @param {TCamera} camera
     */
    constructor(camera) {
        this._camera = camera;
        this._camera.bindTargetAndRotation(false);
        this._targetPosition = new TVector3D(2, 0, 0);
        this._height = 5;

        // Directions ----------
        this._NOTHING = 0;
        this._LEFT = 2;
        this._TOP = 4;
        this._RIGHT = 8;
        this._BOTTOM = 16;
        // ---------------------
        this._direction = this._NOTHING;

        this._screenSize = TUIFacade.getScreenSize();

        // this._updateCamera();
        this._cursor = TUIFacade.getCursor();
        this._cursor.setVisible(true);

        this._updateIntervalId = null;
    }

    /**
     * @param {Object} event
     * // For example: KEYBOARD_EVENT
     * @param {Object} event.eventType
     * // For example: KEY_B
     * @param {Object} event.eventData
     */
    onEvent(event) {
        if (event.eventType === TEventTypes.EET_MOUSE_INPUT_EVENT) {
            this._onMouseEvent(event.eventData);
        }
    }

    _getShift(cursorPosition) {
        let result = new TVector3D(0, 0, 0);
        const shift = 5;

        if (parseInt(cursorPosition.x) < this._screenSize.x * 0.05) {
            result.x = shift;
        }

        if (parseInt(cursorPosition.y) < this._screenSize.y * 0.05) {
            result.z = -shift;
        }

        if (parseInt(cursorPosition.x) > this._screenSize.x * 0.95) {
            result.x = -shift;
        }

        if (parseInt(cursorPosition.y) > this._screenSize.y * 0.95) {
            result.z = shift;
        }

        return result;
    }

    /**
     *
     * @param {Object} eventData
     * @param {String} eventData.Control
     * @param {String} eventData.Event
     * @param {String} eventData.isLeftPressed
     * @param {String} eventData.isMiddlePressed
     * @param {String} eventData.isRightPressed
     * @param {String} eventData.Shift
     * @param {String} eventData.Wheel
     * @param {Number} eventData.x
     * @param {Number} eventData.y
     */
    _onMouseEvent(eventData) {
        const cursorPosition = new TVector2D(eventData.x, eventData.y);
        this._updateCamera(cursorPosition);
    }

    /**
     * 
     * @param {TVector2D} cursorPosition 
     */
    _updateCamera(cursorPosition) {
        const shift = this._getShift(cursorPosition);

        alert("Value: '" + this._updateIntervalId + "'");
        if (this._updateIntervalId)
            clearInterval(this._updateIntervalId);
        if (shift.x == !0 || shift.z == !0) {
            this._updateIntervalId = setInterval(() => {
                this._targetPosition.add(shift);

                this._camera.setTarget(this._targetPosition);
                const newCameraPosition = this._targetPosition.getCopy();

                newCameraPosition.add(new TVector3D(0, this._height, this._height / 2));
                this._camera.setPosition(newCameraPosition);
            }, 2);
        }
    }
}