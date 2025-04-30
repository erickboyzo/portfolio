interface DeviconConfig {
  deviconMap: Record<string, string>;
  ommitColorFrom: string[];
  useOriginal: string[];
  waterMarkType: string[];
}

const config: DeviconConfig = {
  deviconMap: {
    html: "html5",
    angular: "angularjs",
    scss: "sass",
    "node.js": "nodejs",
    vue: "vuejs",
    vite: "vitejs",
  },
  ommitColorFrom: ["github"],
  useOriginal: ["express"],
  waterMarkType: ["less"],
};

export function getDeviconClass(value: string): string {
  if (!value) return value;

  const formattedValue = value.replace(/\s/g, "").toLowerCase();
  const mapped = config.deviconMap[formattedValue] ?? formattedValue;

  let type = "plain";
  if (config.useOriginal.includes(mapped)) {
    type = "original";
  } else if (config.waterMarkType.includes(mapped)) {
    type = "plain-wordmark";
  }

  return `devicon-${mapped}-${type} ${config.ommitColorFrom.includes(mapped) ? "" : "colored"}`;
}

export function formatName(value: string): string {
  if (!value) return value;
  return value.replace(/-/g, " ");
}

export function replacePlaceholder(value: string, inputValue: string): string {
  if (!value || !inputValue) return value;
  return value.replace(/{}/g, inputValue);
}
