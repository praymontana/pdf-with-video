import {Callback, global_queue} from "./loading_queue";

export function load_player_api() {
    const tag = document.createElement('script');

    tag.src = "https://www.youtube.com/iframe_api";
    const firstScriptTag = document.getElementsByTagName('script')[0];
    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

    (<any>window).onYouTubeIframeAPIReady = global_queue.new_callback();
}

export class Player {

    player: any;

    constructor(video_id: string) {
        console.log('creating player', window.YT.Player, video_id);
        this.player = new window.YT.Player('youtube-player', {
            height: '360',
            width: '640',
            videoId: video_id,
            events: {
                // 'onReady': onPlayerReady,
                // 'onStateChange': onPlayerStateChange
            }
        });
    }

    goto(time: number) {
        this.player.seekTo(time, true);
    }
}
