import * as d3 from "d3";
import css from "./style/main.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import {dropHandler,dragOverHandler,dragLeaveHandler} from "./events";

// Add Events
d3.select("#drop_zone").on("drop",()=>dropHandler(event));
d3.select("#drop_zone").on("dragover",()=>dragOverHandler(event));
d3.select("#drop_zone").on("dragleave",()=>dragLeaveHandler(event));
