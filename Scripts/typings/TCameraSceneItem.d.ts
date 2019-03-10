interface TCameraSceneItem extends TSceneItem{
    bindTargetAndRotation(isBind: Boolean): void;
    setTarget(targer: TVector3D): void;
}