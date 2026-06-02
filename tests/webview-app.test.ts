import { describe, it, expect } from "vitest";

describe("Coumong WebView App Configuration", () => {
  it("should have the correct target URL", async () => {
    const fs = await import("fs");
    const path = await import("path");
    const indexPath = path.resolve(__dirname, "../app/(tabs)/index.tsx");
    const content = fs.readFileSync(indexPath, "utf-8");
    expect(content).toContain('https://coumong.com');
  });

  it("should have intro image asset", async () => {
    const fs = await import("fs");
    const path = await import("path");
    const introPath = path.resolve(__dirname, "../assets/images/intro.png");
    expect(fs.existsSync(introPath)).toBe(true);
  });

  it("should have app icon asset", async () => {
    const fs = await import("fs");
    const path = await import("path");
    const iconPath = path.resolve(__dirname, "../assets/images/icon.png");
    expect(fs.existsSync(iconPath)).toBe(true);
  });

  it("should have correct app name in config", async () => {
    const fs = await import("fs");
    const path = await import("path");
    const configPath = path.resolve(__dirname, "../app.config.ts");
    const content = fs.readFileSync(configPath, "utf-8");
    expect(content).toContain('appName: "Coumong"');
  });

  it("should have splash screen configured with brand color", async () => {
    const fs = await import("fs");
    const path = await import("path");
    const configPath = path.resolve(__dirname, "../app.config.ts");
    const content = fs.readFileSync(configPath, "utf-8");
    expect(content).toContain("#E8456B");
  });

  it("should have WebView component imported", async () => {
    const fs = await import("fs");
    const path = await import("path");
    const indexPath = path.resolve(__dirname, "../app/(tabs)/index.tsx");
    const content = fs.readFileSync(indexPath, "utf-8");
    expect(content).toContain("react-native-webview");
    expect(content).toContain("WebView");
  });

  it("should have intro overlay with fade animation", async () => {
    const fs = await import("fs");
    const path = await import("path");
    const indexPath = path.resolve(__dirname, "../app/(tabs)/index.tsx");
    const content = fs.readFileSync(indexPath, "utf-8");
    expect(content).toContain("showIntro");
    expect(content).toContain("introOpacity");
    expect(content).toContain("withTiming");
  });

  it("should hide tab bar for fullscreen webview", async () => {
    const fs = await import("fs");
    const path = await import("path");
    const layoutPath = path.resolve(__dirname, "../app/(tabs)/_layout.tsx");
    const content = fs.readFileSync(layoutPath, "utf-8");
    expect(content).toContain('display: "none"');
  });

  it("should have error handling with retry button", async () => {
    const fs = await import("fs");
    const path = await import("path");
    const indexPath = path.resolve(__dirname, "../app/(tabs)/index.tsx");
    const content = fs.readFileSync(indexPath, "utf-8");
    expect(content).toContain("hasError");
    expect(content).toContain("handleRetry");
    expect(content).toContain("다시 시도");
  });

  it("should support Android back button navigation", async () => {
    const fs = await import("fs");
    const path = await import("path");
    const indexPath = path.resolve(__dirname, "../app/(tabs)/index.tsx");
    const content = fs.readFileSync(indexPath, "utf-8");
    expect(content).toContain("BackHandler");
    expect(content).toContain("canGoBack");
    expect(content).toContain("goBack");
  });
});
