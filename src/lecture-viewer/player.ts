export async function load_player_api() {
    return new Promise((resolve, reject) => {
        const tag = document.createElement('script');

        tag.src = "https://www.youtube.com/iframe_api";
        const firstScriptTag = document.getElementsByTagName('script')[0];
        firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

        (<any>window).onYouTubeIframeAPIReady = () => resolve();
    });
}

export class Player {

    player: YT.Player;

    constructor(video_id: string) {
        this.player = new YT.Player('youtube-player', {
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
