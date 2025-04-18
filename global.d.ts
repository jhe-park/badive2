type NextPageProps = {
  params: Promise<{ [key: string]: string | undefined }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

interface RouteParams {
  id: string;
}

interface Document {
  // 표준 Fullscreen API
  exitFullscreen(): Promise<void>;
  fullscreenElement: Element | null;
  fullscreenEnabled: boolean;

  // Webkit (Safari) API
  webkitExitFullscreen?: () => Promise<void>;
  webkitFullscreenElement?: Element | null;
  webkitFullscreenEnabled?: boolean;

  // Microsoft (IE/Edge) API
  msExitFullscreen?: () => Promise<void>;
  msFullscreenElement?: Element | null;
  msFullscreenEnabled?: boolean;

  // Mozilla (Firefox) API
  mozExitFullscreen?: () => Promise<void>;
  mozFullscreenElement?: Element | null;
  mozFullscreenEnabled?: boolean;
}

interface HTMLElement {
  // 표준 Fullscreen API
  requestFullscreen(): Promise<void>;

  // Webkit (Safari) API
  webkitRequestFullscreen?: () => Promise<void>;

  // Microsoft (IE/Edge) API
  msRequestFullscreen?: () => Promise<void>;

  // Mozilla (Firefox) API
  mozRequestFullscreen?: () => Promise<void>;
}
