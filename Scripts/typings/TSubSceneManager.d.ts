interface TSubSceneManager{
    removeItem(nodeName:String, callback:(success: Boolean) => void): void;
    getItem(name:String): TSceneItem;
    isItemExist(): Boolean;
    addMesh(path:String, callback:(sceneItem:TSceneItem) => void): void;
    addOstreeMesh(path:String, callback:(sceneItem:TSceneItem) => void): void;
    addWaterSurface(callback:(sceneItem:TSceneItem) => void): void;
    addTerrainFromHeightmap(path:String, callback:(sceneItem:TSceneItem) => void): void;
    addSkySphere(path:String, callback:(sceneItem:TSceneItem) => void): void;
    addSkyCube(callback:(sceneItem:TSceneItem) => void): void;
    addLightSource(callback:(sceneItem:TSceneItem) => void): void;
    addCamera(callback:(sceneItem:TCameraSceneItem) => void): void;
}