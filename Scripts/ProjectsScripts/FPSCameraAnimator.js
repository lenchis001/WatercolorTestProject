const ROTATION_DELTA = 0.005;
const TETA_OFFSET_BORDER = 0.4;

class FPSCameraAnimator {
    /**
     *
     * @param {TCamera} camera
     */
    constructor(camera) {
        this._camera = camera;
        this._cursor = TUIFacade.getCursor();

        this._camera.bindTargetAndRotation(false);

        this._targetPosition = new TVector3D(1, 0, 0);
        this._cameraPosition = new TVector3D(0, 0, 0);

        this._fi = 0;
        this._teta = Math.PI / 2;
        this._radius = 5;

        this._screenCenterPosition = TUIFacade.relativePositionToAbsolute(0.5, 0.5);

        this._updateTargetPosition();
        this._updateCursor();

        this._cursor.setVisible(false);
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
        } else if (event.eventType === TEventTypes.EET_KEY_INPUT_EVENT) {
            this._onKeyBoardEvent(event.eventData);
        }
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
        
        if(!cursorPosition.isEqual(this._screenCenterPosition)){
            this._setFi((this._screenCenterPosition.x - cursorPosition.x) * ROTATION_DELTA);
            this._setTeta((this._screenCenterPosition.y - cursorPosition.y) * ROTATION_DELTA);

            this._updateTargetPosition();

            this._updateCamera();

            this._updateCursor();
        }
    }

    _setFi(offset) {
        this._fi += offset;
    }

    _setTeta(offset) {
        const offsetTeta = this._teta - offset;
        if (offsetTeta < (Math.PI - TETA_OFFSET_BORDER) &&
            offsetTeta > (0 + TETA_OFFSET_BORDER)) {
            this._teta = offsetTeta;
        }
    }

    _updateTargetPosition() {
        this._targetPosition.x =
            this._radius * Math.sin(this._teta) * Math.cos(this._fi);
        this._targetPosition.y = this._radius * Math.cos(this._teta);
        this._targetPosition.z =
            this._radius * Math.sin(this._teta) * Math.sin(this._fi);
       
        this._targetPosition.add(this._cameraPosition);
    }

    _updateCamera() {
        this._camera.setPosition(this._cameraPosition);
        this._camera.setTarget(this._targetPosition);
    }

    _updateCursor() {
        this._cursor.setPosition(this._screenCenterPosition);
    }

    _onKeyBoardEvent(eventData) {
        if (eventData.Key === TKeyCode.KEY_KEY_W) {
            this._goForward();
            this._updateCamera();
        } else if (eventData.Key === TKeyCode.KEY_KEY_S) {
            this._goBack();
            this._updateCamera();
        }
    }

    _goForward() {
        const vector = this._targetPosition.getCopy();
        vector.sub(this._cameraPosition);

        this._cameraPosition = this._targetPosition.getCopy();
        this._targetPosition.add(vector);
    }

    _goBack() {
        const vector = this._targetPosition.getCopy();
        vector.sub(this._cameraPosition);

        this._targetPosition = this._cameraPosition.getCopy();
        this._cameraPosition.sub(vector);
    }
}