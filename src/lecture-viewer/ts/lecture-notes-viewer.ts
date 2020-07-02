import * as pdfjsLib from "pdfjs-dist";
import {PDFDocumentProxy} from "pdfjs-dist";
import * as pdfjsViewer from "pdfjs-dist/web/pdf_viewer";

pdfjsLib.GlobalWorkerOptions.workerSrc = "pdf-worker.js";

export class LectureNotesViewer {
    constructor(pdf_document: PDFDocumentProxy, element_id: string) {
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
