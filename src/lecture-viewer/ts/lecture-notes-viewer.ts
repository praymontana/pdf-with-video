import * as pdfjsLib from "pdfjs-dist";
import pdfjsViewer from "pdfjs-dist/web/pdf_viewer";

pdfjsLib.GlobalWorkerOptions.workerSrc = "pdf-worker.js";

export class LectureNotesViewer {
    constructor() {
        // The workerSrc property shall be specified.
//
        pdfjsLib.GlobalWorkerOptions.workerSrc = "pdf-worker.js";

        let container = document.getElementById("viewerContainer");
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

// eventBus.on("pagesinit", function () {
        // We can use pdfViewer now, e.g. let's change default scale.
        // pdfViewer.currentScaleValue = "page-width";
        //
        // We can try searching for things.
        // if (SEARCH_FOR) {
        //   pdfFindController.executeCommand("find", { query: SEARCH_FOR });
        // }
// });

// Loading document.
        let loadingTask = pdfjsLib.getDocument({
            url: "../lectures/lecture2.pdf",
            cMapUrl: "pdfsjs/cmaps",
            cMapPacked: true
        });
        loadingTask.promise.then(function (pdfDocument) {
            // Document loaded, specifying document for the viewer and
            // the (optional) linkService.
            pdfViewer.setDocument(pdfDocument);

            pdfLinkService.setDocument(pdfDocument, null);
        });

    }
}
