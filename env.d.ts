interface ImportMetaEnv {
  readonly VITE_APP_TITLE: string;
  BASE_URL: string;
  DEV: boolean;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
