/*jslint node: true, browser: true */
"use strict";
/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
var convertorController = null;

function openCloseSidebar() {
    if (document.getElementById("sidebar").style.width == "15vw") {
        document.getElementById("sidebar").style.width = "100vw";
        document.getElementById("fromItem").style.display = "inline-block";
        document.getElementById("toItem").style.display = "inline-block";
        document.getElementById("rateItem").style.display = "inline-block";
    } else {
        document.getElementById("sidebar").style.width = "15vw";
        document.getElementById("fromItem").style.display = "none";
        document.getElementById("toItem").style.display = "none";
        document.getElementById("rateItem").style.display = "none";
        convertorController.updateDisplay();
    }
}


