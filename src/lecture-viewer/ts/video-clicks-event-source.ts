type GotoTimeCallback = (time: number) => void;

export default class VideoClicksEventSource {
    callbacks: Map<string, GotoTimeCallback> = new Map<string, GotoTimeCallback>();

    subscribe(video_id: string, goto_time_callback: GotoTimeCallback) {
        this.callbacks.set(video_id, goto_time_callback);
    }

    fire(video_id: string, time: number) {
        this.callbacks.forEach((goto_time_callback, in_video_id) => {
            if (in_video_id === video_id)
                goto_time_callback(time);
        });
    }
}

window.video_clicks_event_source = new VideoClicksEventSource();
