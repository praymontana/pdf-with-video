import * as pdfjsLib from "pdfjs-dist";
import * as pdfjsViewer from "pdfjs-dist/web/pdf_viewer";

import "./lecture-viewer.scss";

import {load_player_api, Player} from "./player";

document.addEventListener("DOMContentLoaded", ready);

function ready() {

// setup url for iframe

  let pdf_viewer = document.getElementById('pdf-viewer');
  let url = new URL(window.location.toString());
  let pdfName = url.searchParams.get("pdf");

  let youtube_video_id: string = null;
  let player: Player = null;

  window.addEventListener('message', e => {
    let message = e.data;
    if (message.type === 'video_id') {
      youtube_video_id = message.id;
      youtube_video_specified();
      console.log('video id specified:', youtube_video_id);
    } else if (message.type === 'goto_time') {
      let url = message.url;
      let m = url.match(/(\d+)m(\d+)s/);
      if (!m)
        return;
      let min = +m[1];
      let sec = +m[2];
      player.goto(min * 60 + sec);
    }
  });

  load_player_api();

  global_queue.finished_loading_callback = () => {
    player = new Player(youtube_video_id);
  };
}

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
