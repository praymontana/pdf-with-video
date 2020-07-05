import VideoClicksEventSource from "./video-clicks-event-source";

declare module 'pdfjs-dist/web/pdf_viewer';

declare global {
    interface Window { video_clicks_event_source: VideoClicksEventSource; }
}
