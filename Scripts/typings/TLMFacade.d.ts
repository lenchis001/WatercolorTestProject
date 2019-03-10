declare var TLMFacade:TLMFacade;

type NumberCallback = (n: number) => any;

interface TLMFacade{
    loadSubScene(sceneName: String, levelName:String, callback: (subSceneManager: TSubSceneManager) => void): void;
    unloadSubScene(sceneName:String, callback:Function): void;
    isSceneExist(sceneName:String): void;
    getSubScene(sceneName:String): TSubSceneManager;
}