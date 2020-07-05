import "../lecture-viewer.scss";

import {load_player_api, VideoPlayer} from "./video-player";
import {LectureNotes, load_lecture_notes} from "./lecture-notes";
import {LectureNotesViewer} from "./lecture-notes-viewer";

document.addEventListener("DOMContentLoaded", ready);

async function ready() {
    let url = new URLSearchParams(window.location.search);
    let pdf_file = url.get("pdf");

    let load_youtube_api_promise: Promise<void> = load_player_api();
    let load_pdf_document_promise: Promise<LectureNotes> = load_lecture_notes(pdf_file);

    let [_, lecture_notes] = await Promise.all([load_youtube_api_promise, load_pdf_document_promise]);

    let player = new VideoPlayer(lecture_notes.youtube_video_id, 'videoPlayer');
    let pdf_viewer = new LectureNotesViewer(lecture_notes.pdf_document, lecture_notes.youtube_video_id, 'viewerContainer');
}

