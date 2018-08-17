/*jslint node: true, browser: true */
"use strict";
/*global ConvertorView*/
/*global ConvertorModel*/
/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

var convertorView = new ConvertorView(),
    convertorModel = new ConvertorModel(),
    convertorController = null;

function ConvertorController() {

    this.updateDisplay = function () {
        convertorView.setCurrentValue(convertorModel.getCurrentValue().toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,") + " " + convertorView.getFromCurrency());
    };
    //will be called when page is loaded
    this.init = function () {
        
        //setting the 'actions' when buttons are pressed
        convertorView.setZeroClickCb(function () {
            convertorModel.addToDisplay(0);
            convertorController.updateDisplay();
        });
        convertorView.setOneClickCb(function () {
            convertorModel.addToDisplay(1);
            convertorController.updateDisplay();
        });
        convertorView.setTwoClickCb(function () {
            convertorModel.addToDisplay(2);
            convertorController.updateDisplay();
        });
        convertorView.setThreeClickCb(function () {
            convertorModel.addToDisplay(3);
            convertorController.updateDisplay();
        });
        convertorView.setFourClickCb(function () {
            convertorModel.addToDisplay(4);
            convertorController.updateDisplay();
        });
        convertorView.setFiveClickCb(function () {
            convertorModel.addToDisplay(5);
            convertorController.updateDisplay();
        });
        convertorView.setSixClickCb(function () {
            convertorModel.addToDisplay(6);
            convertorController.updateDisplay();
        });
        convertorView.setSevenClickCb(function () {
            convertorModel.addToDisplay(7);
            convertorController.updateDisplay();
        });
        convertorView.setEightClickCb(function () {
            convertorModel.addToDisplay(8);
            convertorController.updateDisplay();
        });
        convertorView.setNineClickCb(function () {
            convertorModel.addToDisplay(9);
            convertorController.updateDisplay();
        });
        convertorView.setClearClickCb(function () {
            convertorModel.clearValue();
            convertorController.updateDisplay();
        });
        convertorView.setConvertClickCb(function () {
            convertorModel.setCommissionRate(convertorView.getCommissionRate());
            convertorModel.setRateFrom(convertorView.getFromRate());
            convertorModel.setRateTo(convertorView.getToRate());
            convertorView.setCurrentValue(convertorModel.calculateExchange() + " " + convertorView.getToCurrency());
            convertorModel.clearValue();
        });
    };
}
//on load try to update the rates
window.addEventListener("load", convertorModel.updateRates());
convertorView.getLastUpdateDate();
convertorController = new ConvertorController();
window.addEventListener("load", convertorController.init);

