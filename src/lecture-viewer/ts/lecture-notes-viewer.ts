import * as pdfjsLib from "pdfjs-dist";
import {PDFDocumentProxy} from "pdfjs-dist";
import * as pdfjsViewer from "pdfjs-dist/web/pdf_viewer";
import {VideoPlayer} from "./video-player";

pdfjsLib.GlobalWorkerOptions.workerSrc = "pdf-worker.js";

interface YoutubeLink {
    time: number;
    video_id: string;
}

function parse_video_link(url: string): YoutubeLink | null {
    if (!url)
        return null;

    let m: RegExpMatchArray = url.match('^https://youtube.com/watch\\?v=(.*)&t=((\\d+)h)?(\\d+)m(\\d+)s$');

    if (!m)
        return null;

    let hours: number = m[3] ? +m[3] : 0;
    let minutes: number = m[4] ? +m[4] : 0;
    let seconds: number = m[5] ? +m[5] : 0;

    return {
        video_id: m[1],
        time: hours * 60 * 60 + minutes * 60 + seconds
    };
}

let AnnotationLayer = (<any>pdfjsLib).AnnotationLayer;
let old_annotations_renderer = AnnotationLayer.render;
AnnotationLayer.render = (parameters: any) => {
    for (let annotation of parameters.annotations) {
        let video_link = parse_video_link(annotation.url);
        if (video_link)
            annotation.url = `javascript:window.video_clicks_event_source.fire('${video_link.video_id}', ${video_link.time})`;
    }
    old_annotations_renderer(parameters);
};

export class LectureNotesViewer {
    constructor(pdf_document: PDFDocumentProxy, youtube_video_id: string, video_player: VideoPlayer, element_id: string) {
        window.video_clicks_event_source.subscribe(
            youtube_video_id,
            time => video_player.goto(time)
        );

        let container = document.getElementById(element_id);

        let eventBus = new pdfjsViewer.EventBus();

        // (Optionally) enable hyperlinks within PDF files.
        let pdfLinkService = new pdfjsViewer.PDFLinkService({
            eventBus: eventBus,
        });

        // (Optionally) enable find controller.
        let pdfFindController = new pdfjsViewer.PDFFindController({
            eventBus: eventBus,
            linkService: pdfLinkService,
        });

        let pdfViewer = new pdfjsViewer.PDFViewer({
            container: container,
            eventBus: eventBus,
            linkService: pdfLinkService,
            findController: pdfFindController,
        });

        pdfLinkService.setViewer(pdfViewer);

        /*eventBus.on("pagesinit", function () {
            // We can use pdfViewer now, e.g. let's change default scale.
            // pdfViewer.currentScaleValue = "page-width";
            //
            // We can try searching for things.
            let SEARCH_FOR = "42";
            if (SEARCH_FOR) {
                pdfFindController.executeCommand("find", {query: SEARCH_FOR});
            }
        });*/


        // Document loaded, specifying document for the viewer and
        // the (optional) linkService.
        pdfViewer.setDocument(pdf_document);

        pdfLinkService.setDocument(pdf_document, null);
    }
}
