export interface Edition {
  id: string;
  name: string;
  description: string;
}

interface Screenshot {
  status: string;
  mode: string;
  timeOfCapture: string | null;
  filekeyRaw: string | null;
  filekeyStyled: string | null;
  filesize: number | null;
}

export interface Feature {
  id: string;
  name: string;
  active: boolean;
  description: string;
  URL: string | null;
  selector: string | null;
  takeScreenshot: string | null;
  filename: string | null;
  screenshots: { items: Screenshot[] };
  FeatureEditions: {
    items: { edition: Edition }[];
  };
}

export interface FeatureItem {
  id: string;
  name: string;
  description: string;
  editions: [{ id: string; name: string }];
  timeOfCapture: string;
}

export interface Baremetrics {
  id: string;
  name: string;
  active: boolean;
  tagline: string;
  description: string;
  URL: string;
  modeDesktopLight: boolean | null;
  modeDesktopDark: boolean | null;
  modeLaptopLight: boolean | null;
  modeLaptopDark: boolean | null;
  modeMobileLight: boolean | null;
  modeMobileDark: boolean | null;
  editions: {
    items: Edition[];
  };
  features: {
    items: Feature[];
  };
}

export type Header = {
  id: number;
  key: string;
  name: string;
  sortable: boolean;
};
