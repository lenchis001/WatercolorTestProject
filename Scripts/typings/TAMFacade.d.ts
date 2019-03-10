declare var TAMFacade:TAMFacade;

interface TAMFacade{
    addSound(name: String, pathToFile:String): void;
    removeSound(name:String): void;
    play(name:String): void;
    pause(name:String): void;
    stop(name:String): void;
}