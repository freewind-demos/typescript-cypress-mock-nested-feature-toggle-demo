type FeaturesToggle = {
  on?: string[],
  off?: string[]
}

function buildFeatures(toggles: string[], on: boolean): Window['demo']['features'] {
  const init: Window['demo']['features'] = {}
  return (toggles || []).reduce((map, toggle) => {
    map[toggle] = on;
    return map;
  }, init);
}

function applyToggles(
  existingFeatures: Window['demo']['features'],
  toggles: FeaturesToggle
): Window['demo']['features'] {
  console.log("### applyToggles", JSON.stringify(existingFeatures), toggles);
  return {
    ...existingFeatures,
    ...buildFeatures(toggles.on || [], true),
    ...buildFeatures(toggles.off || [], false),
  };
}

function defineProperty(obj: any, propertyName: string, getter: (propertyValue: any) => any): void {
  let value: any = obj[propertyName] || {};
  Object.defineProperty(obj, propertyName, {
    get() {
      console.log("### get:", propertyName)
      return getter(value);
    },
    set(newValue) {
      console.log("### set:", propertyName, JSON.stringify(newValue))
      value = newValue || {};
      console.log('### value: ', JSON.stringify(value))
    },
    configurable: true
  })
}

export default function stubDemoFeatures(win: Window, toggles: FeaturesToggle) {
  defineProperty(win, 'demo', (uc) => {
    defineProperty(uc, 'features', (experiments) => applyToggles(experiments, toggles))
    return uc;
  })
};
