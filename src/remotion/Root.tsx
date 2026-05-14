import { Composition } from "remotion";
import { TPCWebsiteLaunch } from "./TPCWebsiteLaunch";

export function RemotionRoot() {
  return (
    <Composition
      id="TPCWebsiteLaunch"
      component={TPCWebsiteLaunch}
      durationInFrames={1080}
      fps={30}
      width={1080}
      height={1920}
    />
  );
}
