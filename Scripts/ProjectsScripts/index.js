dependsOn('FPSCameraAnimator.js');

TUIFacade.setWindowTitle("Это тестовое название на русском!");

TLMFacade.loadSubScene('The test scene', 'Forest.irr',
  (subSceneManager) => {
    subSceneManager.addCamera(camera => {
      TEventsManager.getInstance().subscribe('Camera', new FPSCameraAnimator(camera));
    });
  });
