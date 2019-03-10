interface TBaseUIItem{
    getText(): String;
    setText(text:String): void;
    addEventListener(eventName:String, callback: Function): void;
    removeEventListener(eventName:String): void;
    getType(): String;

    getPosition(): TComplexPoint2D;
    setPosition(position: TComplexPoint2D): void;
    getSize(): TComplexPoint2D;
    setSize(size: TComplexPoint2D): void;
}