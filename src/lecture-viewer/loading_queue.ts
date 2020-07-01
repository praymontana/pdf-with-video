export type Callback = () => void;

export class LoadingQueue {

    callbacks_waiting: Callback[];
    callbacks_ready: Callback[];

    _finished_loading_callback: Callback;

    constructor(finished_loading_callback: Callback = null) {
        this.callbacks_waiting = [];
        this.callbacks_ready = [];

        this._finished_loading_callback = finished_loading_callback;
    }

    new_callback() {
        let callback = () => {
            this.callbacks_ready.push(callback);

            let ind = this.callbacks_waiting.indexOf(callback);
            if (ind >= 0)
                this.callbacks_waiting.splice(ind, 1);

            if (this.callbacks_waiting.length === 0)
                this._finished_loading_callback();
        };

        this.callbacks_waiting.push(callback);
        return callback;
    }

    get finished_loading_callback() {
        return this._finished_loading_callback;
    }

    set finished_loading_callback(value) {
        this._finished_loading_callback = value;
    }
}

export let global_queue = new LoadingQueue();
