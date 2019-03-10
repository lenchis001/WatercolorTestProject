declare var TUIFacade:TUIFacade;

interface TUIFacade{
    getScreenSize(): TVector2D;
    loadLayout(name:String, fileName:String): void;
    getUIItem(subViewName:String, itemName:String): TBaseUIItem;
    getCursor(): TCursor;
    relativePositionToAbsolute(relativePosition:TVector2D): relativePositionToAbsolute;
    setWindowTitle(title: String): void;
}